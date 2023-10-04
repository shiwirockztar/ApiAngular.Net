using ApiRestMovies.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiRestMovies.Data.Repositories
{
    public interface IMovieRepository
    {
        Task<IEnumerable<Movie>> GetMovies(int id);
        Task<Movie> GetMovieByTitle(string title);
        Task<Movie> GetMovieById(int id);
        Task<bool> InsertMovie(Movie movie);
        Task<bool> DeleteMovie(int id);
    }
}
