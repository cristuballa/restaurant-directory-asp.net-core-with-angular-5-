using System.ComponentModel.DataAnnotations;

namespace RestDirAPI.Dtos
{   
     public class UserForLoginDto
    {
        [EmailAddress]
        public string Username { get; set; }
        public string Password { get; set; }
        
    }
}