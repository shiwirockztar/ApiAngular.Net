using ApiRestMovies.Data.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Net.Http.Json; // Este namespace permite trabajar con JSON
using System.Net.Http;
using System.Net.Http.Headers;

namespace ApiRestMovies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;
        //private readonly HttpClient _httpClient;
        public MovieController(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
            //_httpClient = httpClient;
        }

        [HttpGet]
        public async Task<IActionResult> GetPopularMovies()
        {
            var httpClient = new HttpClient();
            var url = "https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=$1";
            var response = await httpClient.GetAsync(url);
            return Ok(await response.Content.ReadAsStringAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieById(int id)
        {
            var httpClient = new HttpClient();
            var url = $"https://api.themoviedb.org/3/movie/{id}?api_key=192e0b9821564f26f52949758ea3c473";
            var response = await httpClient.GetAsync(url);
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

    }
}
