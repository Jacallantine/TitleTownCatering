using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using Newtonsoft.Json;
// using Newtonsoft.Json;

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
          [HttpGet("food")]
          public async Task<List<food>> GetFoods()
          {
               Database myDatabase = new();
               return await myDatabase.FoodProxy();
          }

[HttpPost]
public async void Post([FromBody] reservation request)
{
    Database myDatabase = new();
    

    // Log the incoming request for debugging
    Console.WriteLine($"Received Reservation: {JsonConvert.SerializeObject(request)}");
    Console.WriteLine($"Received FoodInstances: {JsonConvert.SerializeObject(request.FoodInstances)}");
    


    await myDatabase.CreateReservation(request);


    
}




















     }

}