using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiRestMovies.Model
{
    public class Jwt
    {
        public string key { get; set; }
        public string Issuer { get; set; }
        public string Audiencie { get; set; }
        public string Subject { get; set; }
    }
}
