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
    public class MovieRepository : IMovieRepository
    {
        private readonly MySQLConfiguration _connectionString;

        public MovieRepository(MySQLConfiguration connectionString)
        {
            _connectionString = connectionString;
        }

        protected MySqlConnection dbConnection()
        {
            return new MySqlConnection(_connectionString.ConnectionString);
        }

        public Task<bool> DeleteMovie(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Movie> GetMovieById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Movie> GetMovieByTitle(string title)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Movie>> GetMovies(int id)
        {
            var db = dbConnection();
            var query = "SELECT * FROM movie WHERE IdUser = @IdUser";
            var sql = @" SELECT IdUser, IdApi, Title, Description 
                        FROM movie 
                        WHERE IdUser = @IdUser";
            return (IEnumerable<Movie>)await db.QueryFirstOrDefaultAsync<Movie>(query, new { IdUser = id });

        }

        public Task<IEnumerable<Movie>> GetPopularMovies()
        {
            throw new NotImplementedException();
        }

        public async Task<bool> InsertMovie(Movie movie)
        {
            var db = dbConnection();

            var sql = @" INSERT INTO movie(IdApi, Title, Description, IdUser) 
                        VALUES(@IdApi, @Title, @Description, @IdUser)"
            ;
            var result = await db.ExecuteAsync(sql, new { movie.IdApi, movie.Title, movie.Description, movie.IdUser });
            // solo se devuelve si el resultado da true
            return result > 0;
        }
    }
}
