using ApiRestMovies.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiRestMovies.Data.Repositories
{
    public interface IUserRepository
    {
        Task<bool> SignIn(User user);
        Task<bool> Login(User user);

    }
}
