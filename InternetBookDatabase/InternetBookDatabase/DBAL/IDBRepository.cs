using System.Collections.Generic;
using System.Threading.Tasks;
using InternetBookDatabase.DBAL.Models;

namespace InternetBookDatabase.DBAL
{
    public interface IDBRepository
    {
        List<UserPhoto> GetPhotos();
        Task<User> GetUserByName(string username);
    }
}
