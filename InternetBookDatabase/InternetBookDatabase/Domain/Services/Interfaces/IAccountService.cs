using System.Threading.Tasks;
using InternetBookDatabase.DBAL.Models;
using InternetBookDatabase.Domain.Models.Request;
using InternetBookDatabase.Domain.Models.Response;
using UserPhoto = InternetBookDatabase.Domain.Models.Response.UserPhoto;

namespace InternetBookDatabase.Domain.Services.Interfaces
{
    public interface IAccountService
    {
        Task<UserToken> AuthorizeUser(LoginUser loginUser);
        Task<User> GetInfo(int userId);
        Task<UserPhoto> GetUserPhoto(int personId);

        UserToken AuthorizeService(LoginUser loginUser);
    }
}