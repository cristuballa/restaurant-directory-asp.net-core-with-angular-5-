using System.Threading.Tasks;
using RestDirAPI.Dtos;

namespace RestDirAPI.Data
{
    public class Repository : IRepository
    {    
        private readonly DataContext _context;
        public Repository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
               _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async  Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}