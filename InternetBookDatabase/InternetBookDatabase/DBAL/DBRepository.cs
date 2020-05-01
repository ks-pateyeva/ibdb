using InternetBookDatabase.DBAL.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace InternetBookDatabase.DBAL
{
    public class DBRepository : IDBRepository
    {
        readonly DBProvider _dbProvider = null;
        public DBRepository(IConfiguration configuration)
        {
            _dbProvider = new DBProvider(configuration.GetConnectionString("DefaultConnectionString"));
        }

        public List<UserPhoto> GetPhotos()
        {
            string query = "SELECT User_ID as UserId, Photo_Image as PhotoImage FROM User_Photo";
            return _dbProvider.SelectQuery<UserPhoto>(query, null).ToList();
        }

        public async Task<User> GetUserByName(string username)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Name", username);
            var result = await _dbProvider.ExecuteProcedureAsync<User>("FindUserByName", parameters);
            return result.FirstOrDefault();
        }
    }
}