using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient; 
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using cs.CONNECTION; 


namespace cs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class reservationController : ControllerBase
    {
         private readonly IConfiguration _configuration;

        public reservationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpPost("createReservation")]
        public async Task<IActionResult> createReservation([FromBody] reservation newReservation)
        {
            var connectionString = new ConnectionString().cs;

            using (var connection = new MySqlConnection(connectionString))
            {
                await connection.OpenAsync();

            
                string query = "INSERT INTO reservations (email_address, price, date, time) VALUES (@Email, @Price, @Date, @Time)";

                using (var command = new MySqlCommand(query, connection))
                {
                
                    command.Parameters.AddWithValue("@Email", newReservation.email_address);
                     command.Parameters.AddWithValue("@Price", newReservation.price);
                      command.Parameters.AddWithValue("@Date", newReservation.date);
                      command.Parameters.AddWithValue("@Time", newReservation.time);
                
                    await command.ExecuteNonQueryAsync();
                }
            }

            return Ok(new { message = "reservation created successfully!" });
        }
    
    }
}