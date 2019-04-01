using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RestDirAPI.Model
{
    public class Restaurant
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; } 
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string AverageCost { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string ContactInfo { get; set; }
        [Required]
        public string Cuisine { get; set; }
        public string OtherInfo { get; set; }
        [Required]
        public string OpenHours { get; set; } 
        [Required]
        public string TypeOfRestaurant { get; set; } 
        public bool IsVerified { get; set; } 
        public string UrlPhoto { get; set; }
        public int UserId { get; set; }

    }
    
}
