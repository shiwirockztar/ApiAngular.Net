using ApiRestMovies.Data.Repositories;
using ApiRestMovies.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiRestMovies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{user}")]
        public async Task<IActionResult> SignIn(User user)
        {
            return Ok(await _userRepository.SignIn(user));
        }

        [HttpPost]
        public async Task<IActionResult> LogIn([FromBody]User user)
        {
            if(user == null)
                return BadRequest();

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _userRepository.Login(user);

            return Created("created", created);
        }
    }
}
