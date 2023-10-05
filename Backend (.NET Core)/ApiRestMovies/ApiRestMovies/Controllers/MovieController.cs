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
            /*var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://api.themoviedb.org/3/find/external_id?external_source={id}"),
                Headers =
                {
                    { "accept", "application/json" },
                    { "Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjczNzU4ODA2MGM3ZjdmZTY1NWE0ZWI0NWIyMDEwYSIsInN1YiI6IjY1MWUzODVjMmYzYjE3MDExZTIxOGY5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EP_BPM-PINgV-E561EK4jE8SwDIeQQ1osVwFTmoaVh0" },
                },
            };
            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();
                Console.WriteLine(body);
                return Ok(await response.Content.ReadAsStringAsync());
                
            }*/

            var httpClient = new HttpClient();
            var url = "https://api.themoviedb.org/3/movie/{id}?api_key=192e0b9821564f26f52949758ea3c473";
            var response = await httpClient.GetAsync(url);

            return Ok(await response.Content.ReadAsStringAsync());
        }

        
    }
}
