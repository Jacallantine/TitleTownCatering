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
     public class reservationController : ControllerBase
     {


          [HttpGet]
          public async Task<List<reservation>> Get()
          {
               Database myDatabase = new();
               return await myDatabase.GetAllReservations();
          }

          [HttpGet("email/{email_address}")]
          public async Task<List<reservation>> GetReservationByEmail(string email_address)
          {
               Database myDatabase = new();
               return await myDatabase.GetCustomerReservations(email_address);
          }

          // [HttpGet("id/{reservation_id}")]
          // public async Task<List<reservation>> GetReservationById(int reservation_id)
          // {
          //      Database myDatabase = new();
          //      return await myDatabase.GetReservation(reservation_id);
          // }






     }

}