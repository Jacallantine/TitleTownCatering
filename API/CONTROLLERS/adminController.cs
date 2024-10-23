using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient; 
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using API.DATABASE;
using API.MODELS;
namespace API.CONTROLLERS
{


[Route("api/[controller]")]
[ApiController]

public class adminController : ControllerBase
{
   [HttpPost("adminLogin")]
        public async Task<IActionResult> Login([FromBody] login newLogin)
        {
            Database myDatabase = new();
            var customer = await myDatabase.AdminLogin(newLogin);
            return Ok(customer);
        }

}





}