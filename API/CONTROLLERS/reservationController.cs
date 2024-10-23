using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient; 
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MySqlConnector;

using API.MODELS;
using API.DATABASE;

namespace API.CONTROLLERS{
     [Route("api/[controller]")]
     [ApiController]
     public class reservationController : ControllerBase
     {


          [HttpGet]
          public async Task<List<reservation>> Get()
          {
               Database myDatabase = new();
               return await myDatabase.GetAllReservations();
          }

          [HttpGet("{email_address}")]
          public async Task<List<reservation>> Get(string email_address)
          {
               Database myDatabase = new();
               return await myDatabase.GetReservation(email_address);
          }
        
        

        
     }

}