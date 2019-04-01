using System.ComponentModel.DataAnnotations;

namespace RestDirAPI.Dtos
{
    public class RestaurantDto
    {
        public long Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string PriceRange { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string ContactInfo { get; set; }
        [Required]
        public string Cuisine { get; set; }
    }
}