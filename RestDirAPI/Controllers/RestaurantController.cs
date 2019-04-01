using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using RestDirAPI.Data;
using RestDirAPI.Dtos;
using RestDirAPI.Model;

namespace RestDirAPI.Controllers {



   [Route("api/[controller]")]
    public class RestaurantController: Controller {
    public readonly DataContext _context;
    public RestaurantController(DataContext context)
       {
                _context = context;
        }


    [AllowAnonymous]
    //[Authorize(Roles="admin")]
     [HttpGet("unverifiedrestos")]
      public async Task<IActionResult> GetRestaurantsUnVerified()
      {
        var restos= await _context.Restaurants.FromSql("GetRestaurantsUnVerified").ToListAsync();
        return Ok(restos);
      }

    [AllowAnonymous]
      [HttpGet("restos")]
      public async Task<IActionResult> GetRestaurants()
      {
        var restos= await _context.Restaurants.FromSql("GetRestaurantsVerified").ToListAsync();
        return Ok(restos);
      }


     [AllowAnonymous]
     [HttpGet("search/{keyword}")]
      public async Task<IActionResult> GetRestaurantsByKeyword(string keyword)
      {
        var restos=  await _context.Restaurants.FromSql("GetRestaurants @p0", keyword).ToListAsync();
        return Ok(restos);
      }


     [HttpGet("resto/{id}")]
       public async Task<IActionResult> GetRestaurant(int id)
      {
        var resto=  await _context.Restaurants.FirstOrDefaultAsync(x => x.Id == id);
         return Ok(resto);
      }

     // [Authorize]
      [HttpPost("Add")]
      public  async Task<IActionResult> AddRestaurant([FromBody] Restaurant resto)
      {
        if (!ModelState.IsValid)
        return BadRequest(ModelState);

           _context.Restaurants.Add(resto);
          await _context.SaveChangesAsync();

          return Ok();
      }

     [Authorize(Roles="Admin")]
     [HttpPut("Update/{id}")]
      public  async Task<IActionResult> UpdateRestaurant([FromRoute] int id,[FromBody] Restaurant resto)
      {
          if (!ModelState.IsValid)
          return BadRequest(ModelState);

          if (id != resto.Id)
              return BadRequest();
            _context.Entry(resto).State = EntityState.Modified;
          await _context.SaveChangesAsync();
          return NoContent();
      }

      //[Authorize]
      [HttpPut("verify/{id}")]
      public  async Task<IActionResult> VerifyRestaurant([FromRoute] int id)
      {

      if (!ModelState.IsValid)
          return BadRequest(ModelState);

          Restaurant resto = await _context.Restaurants.SingleOrDefaultAsync(r => r.Id == id);
             resto.IsVerified=true;

           _context.Entry(resto).State = EntityState.Modified;
          await _context.SaveChangesAsync();

          return NoContent();
      }

      [Authorize(Roles="Admin")]
      [HttpDelete("Delete/{id}")]
      public  async Task<IActionResult> DeleteRestaurant([FromRoute] int id)
      {
          if (!ModelState.IsValid)
          return BadRequest(ModelState);

          Restaurant resto = await _context.Restaurants.SingleOrDefaultAsync(r => r.Id == id);
          if (resto == null)
              return NotFound();
          _context.Restaurants.Remove(resto);
          await _context.SaveChangesAsync();
          return Ok(resto);
      }

    }
}