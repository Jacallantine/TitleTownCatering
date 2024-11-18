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


[HttpPost]
public async Task<IActionResult> Post([FromBody] reservationRequest request)
{

    Database myDatabase = new();

  
    if (request.Reservation == null || request.FoodInstances == null)
    {
        return BadRequest("Invalid reservation or food instances data.");
    }
    bool isCreated = await myDatabase.CreateReservation(request.Reservation, request.FoodInstances);

    if (isCreated)
    {
        return Ok("Reservation and food instances created successfully.");
    }
    else
    {
        return BadRequest("Failed to create reservation or food instances. Check server logs for details.");
    }
}

















     }

}