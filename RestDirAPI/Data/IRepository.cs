using System.Threading.Tasks;

namespace RestDirAPI.Dtos
{
    public interface IRepository
    {
        void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();

    }
}