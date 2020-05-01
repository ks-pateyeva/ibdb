using System;
using System.Collections.Generic;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Threading.Tasks;
using InternetBookDatabase.DBAL;
using InternetBookDatabase.Domain.Models.Response;
using InternetBookDatabase.Domain.Services.Interfaces;
using Bitmap = System.Drawing.Bitmap;
using PixelFormat = System.Drawing.Imaging.PixelFormat;

namespace InternetBookDatabase.Domain.Services
{
    public class UserPhotoService : IUserPhotoService
    {
        private string folder = $"{Environment.CurrentDirectory}\\wwwroot\\photos\\";
        private IDBRepository _repository;

        public static List<UserPhotoSize> PhotoSizeList = new List<UserPhotoSize>()
        {
            new UserPhotoSize
            {
                Name = "small",
                X = 100,
                Y = 100
            },
            new UserPhotoSize
            {
                Name = "medium",
                X = 200,
                Y = 200
            },
        };

        public UserPhotoService(IDBRepository repository)
        {
            _repository = repository;
            SaveAllUserPhoto();
        }

        private void SaveAllUserPhoto()
        {
            Task.Factory.StartNew(() =>
            {
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                List<DBAL.Models.UserPhoto> photos = _repository.GetPhotos();
                foreach (DBAL.Models.UserPhoto photo in photos)
                {
                    SaveUserPhoto(photo);
                }
            });
        }

        public async Task<UserPhoto> GetUserPhotoAsync(int userId, string type)
        {
            string file = $"{folder}{userId}_{type}.png";
            if (!System.IO.File.Exists(file))
            {
                return null;
            }
            try
            {
                var memory = new MemoryStream();
                using (var stream = new FileStream(file, FileMode.Open))
                {
                    await stream.CopyToAsync(memory);
                }
                memory.Position = 0;
                Models.Response.UserPhoto personPhoto = new Models.Response.UserPhoto
                {
                    UserId = userId,
                    Photo = memory.ToArray(),
                    FileName = $"{userId}.png",
                    FileType = "image/png"
                };
                return personPhoto;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private void SaveUserPhoto(DBAL.Models.UserPhoto photo)
        {
            if (photo == null)
                return;
            if (File.Exists($"{folder}{photo.UserId}_original.png"))
                File.Delete($"{folder}{photo.UserId}_original.png");
            foreach (UserPhotoSize p in PhotoSizeList)
            {
                if (File.Exists($"{folder}{photo.UserId}_{p.Name}.png"))
                    File.Delete($"{folder}{photo.UserId}_{p.Name}.png");
            }
            if (photo.PhotoImage == null)
                return;
            using (MemoryStream ms = new MemoryStream(photo.PhotoImage))
            {
                Image origImage = Image.FromStream(ms);
                origImage.Save(folder + photo.UserId + "_original.png", ImageFormat.Png);
                int size = origImage.Width > origImage.Height ? origImage.Height : origImage.Width;
                int left = origImage.Width > origImage.Height ? (origImage.Width - origImage.Height) / 2 : 0;
                int top = origImage.Height > origImage.Width ? (origImage.Height - origImage.Width) / 2 : 0;
                try
                {
                    Bitmap bmp = new Bitmap(size, size, PixelFormat.Format24bppRgb);
                    using (Graphics graphics = Graphics.FromImage(bmp))
                    {
                        graphics.CompositingMode = CompositingMode.SourceCopy;
                        graphics.CompositingQuality = CompositingQuality.HighQuality;
                        graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
                        graphics.SmoothingMode = SmoothingMode.AntiAlias;
                        graphics.DrawImage(origImage, new Rectangle(0, 0, size, size), left, top, size, size, GraphicsUnit.Pixel);
                        origImage.Dispose();
                    }
                    foreach (UserPhotoSize p in PhotoSizeList)
                    {
                        _savePhoto(bmp, (int)p.X, $"{folder}{photo.UserId}_{p.Name}.png");
                    }
                    bmp.Dispose();
                }
                catch (Exception ex)
                {

                }
            }
        }

        private void _savePhoto(Bitmap bmp, int size, string fileName)
        {
            try
            {
                Bitmap newBmp = new Bitmap(size, size, PixelFormat.Format24bppRgb);
                using (Graphics graphics = Graphics.FromImage(newBmp))
                {
                    graphics.CompositingMode = CompositingMode.SourceCopy;
                    graphics.CompositingQuality = CompositingQuality.HighQuality;
                    graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    graphics.SmoothingMode = SmoothingMode.AntiAlias;
                    graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    graphics.DrawImage(bmp, 0, 0, size, size);
                    newBmp.Save(fileName, ImageFormat.Png);
                    newBmp.Dispose();
                }
            }
            catch (Exception ex)
            {

            }
        }
    }
}