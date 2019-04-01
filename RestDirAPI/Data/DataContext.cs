using Microsoft.EntityFrameworkCore;
using RestDirAPI.Model;

namespace RestDirAPI.Data
{
    public class DataContext:DbContext

    {
        public DataContext(DbContextOptions<DataContext> options):base(options){}
        public DbSet<Restaurant> Restaurants {get;set;}
        public DbSet<User> Users { get; set; }
        public DbSet<ResPhoto> ResPhotos { get; set; }
        public DbSet<Value> Values { get; set; }
    }
}