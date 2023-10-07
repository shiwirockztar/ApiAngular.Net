using ApiRestMovies.Data.Repositories;
using ApiRestMovies.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Xml.Linq;

namespace ApiRestMovies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public IConfiguration _configuration;

        public UserController(IUserRepository userRepository,IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
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

        [HttpPost("SignIn")]
        public async Task<dynamic> SignInAsync([FromBody] User user)
        {
            var usuario = await _userRepository.SignIn(user);
            if (usuario == null)
            {
                return new
                {
                    success = false,
                    message = "credenciales incorrectas",
                    result = ""
                };

            }
            var jwt = _configuration.GetSection("Jwt").Get<Jwt>();

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("name", usuario.Name),
                new Claim("password",usuario.Password)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.key));
            var SingIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                jwt.Issuer,
                jwt.Audiencie,
                claims,
                expires: DateTime.Now.AddMinutes(4),
                signingCredentials: SingIn
                );

            return new
            {
                success = true,
                message = "Exito",
                result = new JwtSecurityTokenHandler().WriteToken(token)
            };
        }

 
    }
}
