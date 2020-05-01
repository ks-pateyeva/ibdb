using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using InternetBookDatabase.Domain.Models.Request;
using InternetBookDatabase.Domain.Models.Response;
using InternetBookDatabase.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InternetBookDatabase.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserToken>> Login([FromBody] LoginUser loginUser)
        {
            var token = await _accountService.AuthorizeUser(loginUser);
            if (token != null)
                return token;
            else
                return NotFound();
        }

        [HttpPost("logout")]
        public void Logout([FromBody] string token)
        {
            // todo: delete token from DB
        }

        [Authorize]
        [HttpGet("info")]
        public async Task<ActionResult> Info()
        {
            Claim userIdClaim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "uId");
            int userId = -1;
            if (userIdClaim == null || !Int32.TryParse(userIdClaim.Value, out userId))
                return Unauthorized();
            var info = await _accountService.GetInfo(userId);
            if (info == null)
                return Unauthorized();
            else
                return Ok(info);

        }

        [Authorize]
        [HttpGet("UserPic")]
        public async Task<IActionResult> UserPic()
        {
            Claim idClaim = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "pId");
            int id = -1;
            if (idClaim == null || !Int32.TryParse(idClaim.Value, out id))
                return Unauthorized();
            UserPhoto personPhoto = await _accountService.GetUserPhoto(id);
            if (personPhoto == null)
                return StatusCode(204);
            return File(personPhoto.Photo, personPhoto.FileType, personPhoto.FileName);
        }
	}
}