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
        Task<User> SignIn(User user);
        Task<bool> Login(User user);
        Task<IEnumerable<User>> getUsers();
        Task<User> getUser(String Name, String Password);

    }
}
