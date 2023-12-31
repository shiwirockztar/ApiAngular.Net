﻿using ApiRestMovies.Model;
using Dapper;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Security.Claims;
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

        public async Task<User> SignIn(User user)
        {
            var db = dbConnection();
            var sql = @" SELECT name, email, password
                        FROM user";
            var usuarios = await db.QueryAsync<User>(sql, new { });
            var usuario= usuarios.Where(item => item.Name == user.Name && item.Password == user.Password).FirstOrDefault();
            if (usuario != null)
            {
                Console.WriteLine("usuario encontrado");
                return usuario;
            }
            else 
            {
                throw new NotImplementedException();
            }
            
            
        }

        public async Task<IEnumerable<User>> getUsers()
        {
            var db = dbConnection();
            var sql = @" SELECT name, email, password
                        FROM user";
            var usuarios = await db.QueryAsync<User>(sql, new { });
            return usuarios;
        }

        public async Task<User> getUser(String Name, String Password)
        {
            var db = dbConnection();
            var sql = @" SELECT name, email, password
                        FROM user";
            var usuarios = await db.QueryAsync<User>(sql, new { });
            var usuario = usuarios.Where(item => item.Name == Name && item.Password == Password).FirstOrDefault();
            if (usuario != null) { return usuario; }
            else { 
                return usuario = new User { }; 
            }
            
        }
       
        public async Task<User> GetUserById(int id)
        {
            var db = dbConnection();
            var sql = @" SELECT name, email, password 
                        FROM user 
                        WHERE IdUser = @IdUser";
            
            return await db.QueryFirstOrDefaultAsync<User>(sql, new { IdUser = id });
        }


        public async Task<dynamic> validationToken(ClaimsIdentity identity)
        {
            try
            {
                if (identity.Claims.Count() == 0)
                {
                    return new
                    {
                        success = false,
                        message = "Verificar si esta enviando un token valido",
                        result = ""
                    };
                }

                var id = identity.Claims.FirstOrDefault(x => x.Type == "id").Value;
                Console.WriteLine("id ", id);

                //var db = MySqlConnection(_connectionString.ConnectionString);
                var db = dbConnection();
                var sql = @" SELECT name, email, password 
                        FROM user 
                        WHERE IdUser = @IdUser";
                User usuario = await db.QueryFirstOrDefaultAsync<User>(sql, new { IdUser = id });
                Console.WriteLine("usuario ", usuario);
                //User usuario = _userRepository.GetUserById(int.Parse(id)); 

                return new
                {
                    success = true,
                    message = "Exito",
                    result = usuario
                };
            }
            catch (Exception ex)
            {
                return (dynamic)new
                {
                    success = false,
                    message = "Catch: " + ex.Message,
                    result = ""
                };
            }
        }
    }
}
