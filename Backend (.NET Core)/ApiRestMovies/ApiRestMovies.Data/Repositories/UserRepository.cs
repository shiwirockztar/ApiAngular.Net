using ApiRestMovies.Model;
using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace ApiRestMovies.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MySQLConfiguration _connectionString;

        public UserRepository(MySQLConfiguration connectionString)
        {
            _connectionString = connectionString;
        }

        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }
        public async Task<bool> Login(User user)
        {
            var db = dbConnection();

            var sql = @" INSERT INTO user( Name, Email, Password) 
                        VALUES(@Name, @Email, @Password)"
            ;
            var result = await db.ExecuteAsync(sql, new { user.Name, user.Email, user.Password });
            // solo se devuelve si el resultado da true
            return result > 0;
        }
        public Task<bool> SignIn(User user)
        {
            throw new NotImplementedException();
        }


    }
}
