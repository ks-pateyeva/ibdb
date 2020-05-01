using System;
using InternetBookDatabase.Domain.Models.Request;
using InternetBookDatabase.Domain.Models.Response;
using InternetBookDatabase.Domain.Services.Interfaces;
using WebCoreApplication.Helpers;
using System.Threading.Tasks;
using InternetBookDatabase.DBAL.Models;
using UserPhoto = InternetBookDatabase.Domain.Models.Response.UserPhoto;

namespace InternetBookDatabase.Domain.Services
{
    public class AccountService : IAccountService
    {
        private DBAL.IDBRepository _repository;
        IUserPhotoService _userPhotoService;
        private int tokenValidTimeMs = 30000000;

        public AccountService(DBAL.IDBRepository repository, IUserPhotoService userPhotoService)
        {
            _repository = repository;
            _userPhotoService = userPhotoService;
        }

        public UserToken AuthorizeService(LoginUser loginUser)
        {
            throw new System.NotImplementedException();
        }

        public async Task<UserToken> AuthorizeUser(LoginUser loginUser)
        {
            UserToken token = null;
            var user = await _repository.GetUserByName(loginUser.Name);
            if (user != null)
            {
                string enteredPassword = AesEncoder.Encrypt(loginUser.Password);
                if (user.Password == enteredPassword)
                {
                    var validTo = DateTime.Now.AddMilliseconds(tokenValidTimeMs).ToUniversalTime();
                    token = new UserToken()
                    {
                        UserId = user.UserId,
                        ValidTo = validTo,
                        Token = ProductSecurity.GenerateToken(user.UserId, validTo)
                    };
                }
            }
            return token;
        }

        public Task<User> GetInfo(int userId)
        {
            throw new System.NotImplementedException();
        }

        public Task<UserPhoto> GetUserPhoto(int personId)
        {
            throw new System.NotImplementedException();
        }
    }
}