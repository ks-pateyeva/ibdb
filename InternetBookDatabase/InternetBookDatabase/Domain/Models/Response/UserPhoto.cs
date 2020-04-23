namespace InternetBookDatabase.Domain.Models.Response
{
    public class UserPhoto
    {
        public int UserId { get; set; }
        public byte[] Photo { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
    }

    public class PersonPhotoStream
    {
        public string Header { get; set; }
        public byte[] PhotoArray { get; set; }
    }
}