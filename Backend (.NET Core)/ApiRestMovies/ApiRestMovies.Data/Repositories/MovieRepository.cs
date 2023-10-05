using ApiRestMovies.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiRestMovies.Data.Repositories
{
    public class MovieRepository : IMovieRepository
    {
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

        public Task<IEnumerable<Movie>> GetMovies(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Movie>> GetPopularMovies()
        {
            throw new NotImplementedException();
        }

        public Task<bool> InsertMovie(Movie movie)
        {
            throw new NotImplementedException();
        }
    }
}
