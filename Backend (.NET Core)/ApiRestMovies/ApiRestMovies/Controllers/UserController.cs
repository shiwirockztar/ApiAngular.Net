
using ApiRestMovies.Data.Repositories;
using ApiRestMovies.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace ApiRestMovies.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUserRepository _userRepository;
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
            var id = usuario.IdUser.ToString();
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
                new Claim("id", id),
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
                user= usuario.Name,
                result = new JwtSecurityTokenHandler().WriteToken(token)
            };
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetMoviesOfUser(int id)
        {
            var user = await _userRepository.GetUserById(id);
            Console.WriteLine(user.Movies);
            return Ok(await _userRepository.GetUserById(id));
        }

        //[HttpDelete("{id}")]
        [HttpPost("{id}")]
        public  async Task<dynamic> DelUser(int id)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            //if (identity != null) { }
            var objetoConSuccess = new
            {
                success = false,
                message = "",
                result = ""
            };
            dynamic rToken =  await _userRepository.validationToken(identity);
            objetoConSuccess = await _userRepository.validationToken(identity);

            //Console.WriteLine(objetoConSuccess.success);
            Console.WriteLine(objetoConSuccess);
            Console.WriteLine(objetoConSuccess.success);
            




            /*if (rToken) {
                return   rToken;
            }*/



            /*Console.WriteLine(rToken);
            Console.WriteLine(rToken.GetType());
            var rs = rToken;
            miVariableAnonima = rToken;
            Console.WriteLine(rs.success);
            Console.WriteLine(miVariableAnonima.success);
            */

            // Crear un nuevo objeto utilizando reflexión
            /*object objR = new
            {
                success = rToken.success,
                message = rToken.message,
                result = rToken.result
            };*/

            //Console.WriteLine(objR);

            //if (objR.success) { Console.WriteLine(rs.result);return rToken;  } Console.WriteLine(rToken);
            //if (rToken != null) {return rToken;  }
            //if (rToken != null) {return rToken;  }

            //throw new NotImplementedException();

            return new
            {
                success = true,
                message = "Cliente eliminado",
                /*result = rToken*/
            };
        }
    }
}
