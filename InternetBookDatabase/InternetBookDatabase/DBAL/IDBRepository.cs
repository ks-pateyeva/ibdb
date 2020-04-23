using System.Collections.Generic;
using System.Threading.Tasks;
using InternetBookDatabase.DBAL.Models;

namespace InternetBookDatabase.DBAL
{
    public interface IDBRepository
    {
        Task<List<UserPhoto>> GetPhotos();
    }
}
