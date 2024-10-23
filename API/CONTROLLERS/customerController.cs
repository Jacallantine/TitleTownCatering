using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using API.MODELS;
using API.DATABASE;
namespace API.CONTROLLERS
{


    [Route("api/[controller]")]
    [ApiController]

    public class customerController : ControllerBase
    {

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] login newLogin)
        {
            Database myDatabase = new();
            var customer = await myDatabase.CustomerLogin(newLogin);
            return Ok(customer);
        }


        [HttpPost]
        public async Task Post([FromBody] customer newCustomer)
        {
            Database myDatabase = new();
            await myDatabase.CreateCustomer(newCustomer);
        }

    }





}