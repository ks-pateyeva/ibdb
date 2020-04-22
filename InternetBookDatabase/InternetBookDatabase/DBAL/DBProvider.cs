using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using System.Transactions;
using InternetBookDatabase.DBAL.Helpers;

namespace InternetBookDatabase.DBAL
{
    public class DBProvider
    {
		private string _connectionStr;
		private const int _commandTimeout = 30;
		public DBProvider(string connectionStr)
		{
			_connectionStr = connectionStr;
		}

        public IEnumerable<T> ExecuteProcedure<T, returnParamT>(string procedureName, DynamicParameters parameters, out returnParamT outParam1)
        {
            outParam1 = default(returnParamT);
            try
            {
                DbType outParamDBType = DapperExtensions.ConvertType(typeof(returnParamT));
                parameters.Add("@outp", dbType: outParamDBType, direction: ParameterDirection.Output);
                using (IDbConnection connection = new SqlConnection(_connectionStr))
                {
                    IEnumerable<T> entities = connection.Query<T>(procedureName, parameters, commandTimeout: _commandTimeout, commandType: CommandType.StoredProcedure);
                    outParam1 = parameters.Get<returnParamT>("@outp");
                    return entities;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

		public IEnumerable<T> ExecuteProcedure<T>(string procedureName, DynamicParameters parameters = null)
		{
			try
			{
				using (IDbConnection connection = new SqlConnection(_connectionStr))
				{
					return connection.Query<T>(procedureName, parameters, commandTimeout: _commandTimeout, commandType: CommandType.StoredProcedure);
				}
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}

		public async Task<IEnumerable<T>> ExecuteProcedureAsync<T>(string procedureName, DynamicParameters parameters = null)
		{
			try
			{
				using (IDbConnection connection = new SqlConnection(_connectionStr))
				{
					return await connection.QueryAsync<T>(procedureName, parameters, commandTimeout: _commandTimeout, commandType: CommandType.StoredProcedure);
				}
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}

		public void ExecuteProcedure(string procedureName, DynamicParameters parameters = null)
		{
			try
			{
				using (IDbConnection connection = new SqlConnection(_connectionStr))
				{
					connection.Query(procedureName, parameters, commandTimeout: _commandTimeout, commandType: CommandType.StoredProcedure);
				}
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}

		public async Task ExecuteProcedureAsync(string procedureName, DynamicParameters parameters = null)
		{
			using (var transactionScope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
			{
				using (IDbConnection connection = new SqlConnection(_connectionStr))
				{
					try
					{
						await connection.QueryAsync(procedureName, parameters, commandTimeout: _commandTimeout, commandType: CommandType.StoredProcedure);
						transactionScope.Complete();
					}
					catch (Exception)
					{
						throw;
					}
				}
			}
			//			using(IDbConnection connection = new SqlConnection(_connectionStr))
			//			{
			//				using(var transaction = connection.BeginTransaction())
			//				{
			//					try
			//					{
			//						await connection.QueryAsync(procedureName, parameters, commandTimeout: _commandTimeout, commandType: CommandType.StoredProcedure, transaction: transaction);
			//						transaction.Commit();
			//					}
			//					catch(Exception)
			//					{
			//						transaction.Rollback();
			//						throw;
			//					}
			//				}
			//			}
		}

		public void ExecuteQuery(string query, DynamicParameters parameters = null)
		{
			using (IDbConnection connection = new SqlConnection(_connectionStr))
			{
				connection.Open();
				using (var transaction = connection.BeginTransaction())
				{
					try
					{
						connection.Execute(query, parameters, transaction, _commandTimeout);
						transaction.Commit();
					}
					catch (Exception ex)
					{
						transaction.Rollback();
						throw ex;
					}
				}
			}
		}

		public async Task ExecuteQueryAsync(string query, DynamicParameters parameters = null)
		{
			using (IDbConnection connection = new SqlConnection(_connectionStr))
			{
				connection.Open();
				using (var transaction = connection.BeginTransaction())
				{
					try
					{
						await connection.ExecuteAsync(query, parameters, transaction, _commandTimeout);
						transaction.Commit();
					}
					catch (Exception ex)
					{
						transaction.Rollback();
						throw ex;
					}
				}
			}
		}

		public IEnumerable<T> SelectQuery<T>(string query, DynamicParameters parameters = null)
		{
			List<T> records = new List<T>();
			try
			{
				using (IDbConnection connection = new SqlConnection(_connectionStr))
				{
					records = connection.Query<T>(query, parameters).AsList();
				}
				return records;
			}
			catch (Exception ex)
			{
				return records;
			}
		}

		public async Task<IEnumerable<T>> SelectQueryAsync<T>(string query, DynamicParameters parameters = null)
		{
			List<T> records = new List<T>();
			try
			{
				using (IDbConnection connection = new SqlConnection(_connectionStr))
				{
					records.AddRange(await connection.QueryAsync<T>(query, parameters));
				}
				return records;
			}
			catch (Exception ex)
			{
				return records;
			}
		}
	}
}