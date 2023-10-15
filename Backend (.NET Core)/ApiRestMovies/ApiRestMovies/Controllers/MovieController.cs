using ApiRestMovies.Data.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Net.Http.Json; // Este namespace permite trabajar con JSON
using System.Net.Http;
using System.Net.Http.Headers;
using ApiRestMovies.Model;

namespace ApiRestMovies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;
        public MovieController(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        [HttpGet("populars/{pages}")]
        public async Task<IActionResult> GetPopularMovies(int pages)
        {
            var httpClient = new HttpClient();
            var url = $"https://api.themoviedb.org/3/movie/top_rated?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page={pages}";
            var response = await httpClient.GetAsync(url);
            return Ok(await response.Content.ReadAsStringAsync());
        }

        [HttpGet("last/{pages}")]
        public async Task<IActionResult> GetLastMovies(string pages)
        {
            var httpClient = new HttpClient();
            var url = $"https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page={pages}";
            Console.WriteLine(url);
            var response = await httpClient.GetAsync(url);
            return Ok(await response.Content.ReadAsStringAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieById(int id)
        {
            var httpClient = new HttpClient();
            var urlMx = $"https://api.themoviedb.org/3/movie/{id}?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX";
            var url = $"https://api.themoviedb.org/3/movie/{id}?api_key=192e0b9821564f26f52949758ea3c473";
            var response = await httpClient.GetAsync(urlMx);
            return Ok(await response.Content.ReadAsStringAsync());
        }

        [HttpGet("keyword/{keyword}")]
        public async Task<IActionResult> GetMovieByKeyword(string keyword)
        {
            var httpClient = new HttpClient();
            var url = $"https://api.themoviedb.org/3/search/movie?api_key=192e0b9821564f26f52949758ea3c473&query={keyword}";
            var response = await httpClient.GetAsync(url);
            return Ok(await response.Content.ReadAsStringAsync()); 
        }

        [HttpPost("save")]
        public async Task<IActionResult> SaveMovie([FromBody] Movie movie)
        {
            if (movie == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _movieRepository.InsertMovie(movie);

            return Created("created", created);
        }

        [HttpGet("GetMovies/{id}")]
        public async Task<IActionResult> GetMoviesOfUser(int id)
        {
            //var user = await _movieRepository.GetMovies(id);
            //Console.WriteLine(user.Movies);
            return Ok(await _movieRepository.GetMovies(id));
        }

    }
}
