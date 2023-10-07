using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiRestMovies.Model
{
    public class Movie
    {
        public int IdMovie { get; set; }
        public int IdApi { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int IdUser { get; set; }
        //public User User { get; set; }
    }
}
