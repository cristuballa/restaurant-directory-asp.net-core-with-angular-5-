using System.ComponentModel.DataAnnotations;

namespace RestDirAPI.Dtos
{
    public class UserForRegisterDto
    {
        [EmailAddress]
         [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 5, ErrorMessage = "You must specify a password between 5 and 10 characters")]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }
    }

    
}