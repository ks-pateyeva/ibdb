using InternetBookDatabase.DBAL.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InternetBookDatabase.DBAL
{
    public class DBRepository : IDBRepository
    {
        DBProvider _dbProvider = null;
        public DBRepository(IConfiguration configuration)
        {
            _dbProvider = new DBProvider(configuration.GetConnectionString("DefaultConnectionString"));
        }

        public async Task<List<UserPhoto>> GetPhotos()
        {
            string query = "SELECT Person_ID as PersonId, Photo_Image as PhotoImage FROM Person_Photo";
            var photos = await _dbProvider.SelectQueryAsync<UserPhoto>(query, null);
            return photos.ToList();
        }
    }
}