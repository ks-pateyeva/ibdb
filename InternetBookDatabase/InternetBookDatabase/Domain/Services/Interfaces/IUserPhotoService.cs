using System.Threading.Tasks;
using InternetBookDatabase.Domain.Models.Response;

namespace InternetBookDatabase.Domain.Services.Interfaces
{
    public interface IUserPhotoService
    {
        Task<UserPhoto> GetUserPhotoAsync(int userId, string type);
    }
}