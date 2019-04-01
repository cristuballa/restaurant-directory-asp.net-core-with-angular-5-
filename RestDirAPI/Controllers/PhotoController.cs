using System;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RestDirAPI.Data;
using RestDirAPI.Dtos;
using RestDirAPI.Helpers;
using RestDirAPI.Model;
using AutoMapper;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace RestDirAPI.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    public class PhotoController:Controller
    {
        public DataContext _context { get; }
        private readonly IMapper _mapper;

       private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public PhotoController(DataContext context,  IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _context = context;

            _cloudinaryConfig = cloudinaryConfig;
            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);

        }

       [HttpPost("Add/{id}/{userid}")]
        public  async Task<IActionResult> AddPhoto( [FromRoute] int id, [FromRoute] int userid,PhotoForCreationDto photoDto)
        {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

          // var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userid);

          // var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
           var resto = await _context.Restaurants.FirstOrDefaultAsync(r => r.Id == id);
             var currentUserId = resto.UserId;

            if (currentUserId != userid)
                return Unauthorized();

            var file = photoDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream)
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoDto.Url = uploadResult.Uri.ToString();
            photoDto.PublicId = uploadResult.PublicId;

            //var photo = _mapper.Map<ResPhoto>(photoDto);

             var photo = new ResPhoto();
             photo.Url = uploadResult.Uri.ToString();
             photo.PublicId = uploadResult.PublicId;
             photo.RestaurantId = id;
             photo.UserId=userid;

            _context.ResPhotos.Add(photo);

               resto.UrlPhoto=photo.Url;
            await _context.SaveChangesAsync();

            return Ok(photo);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPhoto(int id)
        {
        var photo=  await _context.Restaurants.FirstOrDefaultAsync(x => x.Id == id);
         return Ok(photo);
        }

        [HttpGet("Photos/{id}")]
        public async Task<IActionResult> GetPhotos([FromRoute] int id)
        {
        var photos=  await _context.ResPhotos.FromSql("GetPhotos @p0", id).ToListAsync();
        return Ok(photos);
        }

        [HttpPut("Update/{id}")]
        public  async Task<IActionResult> UpdatePhoto([FromRoute] int id,[FromBody] ResPhoto photo)
        {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

            if (id != photo.Id)
                return BadRequest();

            _context.Entry(photo).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }


        [HttpDelete("Delete/{id}")]
        public  async Task<IActionResult> DeletePhoto([FromRoute] int id)
        {

            if (!ModelState.IsValid)
            return BadRequest(ModelState);

            ResPhoto photo = await _context.ResPhotos.SingleOrDefaultAsync(r => r.Id == id);
            if (photo == null)
                return NotFound();


            _context.ResPhotos.Remove(photo);
            await _context.SaveChangesAsync();

            return Ok(photo);

        }


    }
}