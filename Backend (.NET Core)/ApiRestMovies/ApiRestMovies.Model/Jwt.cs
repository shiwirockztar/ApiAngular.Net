using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace ApiRestMovies.Model
{
    public class Jwt
    {
        /*
        public readonly MySqlConfiguration _connectionString;

        private readonly IUserRepository _userRepository;

        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }

        public Jwt(IUserRepository userRepository, MySQLConfiguration connectionString)
        {
            _userRepository = userRepository;
            _connectionString = connectionString;
        }
        */

        public string key { get; set; }
        public string Issuer { get; set; }
        public string Audiencie { get; set; }
        public string Subject { get; set; }
    }
}
