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


            [HttpGet("datetime")]
          public async Task<List<ReservationTime>> GetFoods()
          {
               Database myDatabase = new();
               return await myDatabase.ReservationTimeProxy();
          }
          [HttpGet("food")]
          public async Task<List<food>> GetReservationTimes()
          {
               Database myDatabase = new();
               return await myDatabase.FoodProxy();
          }

[HttpPost]
public async void Post([FromBody] reservation request)
{
    Database myDatabase = new();
    
    Console.WriteLine($"Received Reservation: {JsonConvert.SerializeObject(request)}");
    Console.WriteLine($"Received FoodInstances: {JsonConvert.SerializeObject(request.FoodInstances)}");
    


    await myDatabase.CreateReservation(request);


    
}

[HttpPut("{reservation_id}")]

public async void Put([FromBody] ReservationDto update)
{
     Database myDatabase = new();
     await myDatabase.isCompleteProxy(update.reservation_id);
}




















     }

}