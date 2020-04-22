using Microsoft.Extensions.Configuration;

namespace InternetBookDatabase.DBAL
{
    public class DBRepository : IDBRepository
    {
        DBProvider _dbProvider = null;
        public DBRepository(IConfiguration configuration)
        {
            _dbProvider = new DBProvider(configuration.GetConnectionString("DefaultConnectionString"));
        }
    }
}