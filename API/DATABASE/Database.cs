using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Newtonsoft.Json;

using API.MODELS;
namespace API.DATABASE
{

    public class Database
    {
        private string cs;


        public Database()
        {
            cs = "server=d13xat1hwxt21t45.cbetxkdyhwsb.us-east-1.rds.amazonaws.com;database=wyy58hdk8euoriv4;user=ujsfwodssb8dddhf;password=aza6uqhshq753iyv;port=3306;";
        }
       
      private async Task<List<food>> GetAllFoods(string sql, List<MySqlParameter> parms)
        {
            List<food> foods = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);
            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }
            using var reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                foods.Add(new food()
                {
                    food_id = reader.GetInt32(0),
                    food_name = reader.GetString(1),
                    food_price = reader.GetInt32(2),
                    food_type = reader.GetString(3),
                    feed_count = reader.GetInt32(4)
                });
            }
            return foods;
        }

        public async void IsComplete(string sql, List<MySqlParameter> parameters)
{
    using (var connection = new MySqlConnection(cs))
    {
        await connection.OpenAsync();

        using (var command = new MySqlCommand(sql, connection))
        {
            command.Parameters.AddRange(parameters.ToArray());

            await command.ExecuteNonQueryAsync();
        }
    }
}



          private async Task<List<ReservationTime>> GetAllReservationTimes(string sql, List<MySqlParameter> parms)
        {
            List<ReservationTime> reservationtime = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);
            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }
            using var reader = command.ExecuteReader();
            while (await reader.ReadAsync())
            {
                reservationtime.Add(new ReservationTime()
                {
                    DateTime = reader.GetString(0) 
                });
            }
            return reservationtime;
        }


  private async Task<List<reservation>> GetAllCustomerReservation(string sql, List<MySqlParameter> parms)
{
    List<reservation> reservations = new();
    var reservationMap = new Dictionary<int, reservation>(); 

    using var connection = new MySqlConnection(cs);
    await connection.OpenAsync();
    using var command = new MySqlCommand(sql, connection);

    if (parms.Any())
    {
        command.Parameters.AddRange(parms.ToArray());
    }

    using var reader = await command.ExecuteReaderAsync();
    while (await reader.ReadAsync())
    {
        int reservationId = reader.GetInt32(reader.GetOrdinal("reservation_id"));

      
        if (!reservationMap.ContainsKey(reservationId))
        {
            var reservation = new reservation
            {
                reservation_id = reservationId,
                email_address = reader.GetString(reader.GetOrdinal("email_address")),
                date = DateTime.Parse(reader.GetString(reader.GetOrdinal("date"))), 
                address = reader.GetString(reader.GetOrdinal("address")),
                isComplete = reader.GetInt32(reader.GetOrdinal("isComplete")),
                FoodInstances = new List<FoodInstance>()
            };

            
            reservationMap.Add(reservationId, reservation);
            reservations.Add(reservation); 
        }

        
        var foodInstance = new FoodInstance
        {
            food_id = reader.GetInt32(reader.GetOrdinal("food_id")),
            reservation_id = reservationId,
            quantity = reader.GetInt32(reader.GetOrdinal("quantity"))
        };

       
        reservationMap[reservationId].FoodInstances.Add(foodInstance);
    }

    return reservations;
}


        private async Task<object> ValidateLogin(string sql, List<MySqlParameter> parms)
        {
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);


            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }
            using var reader = await command.ExecuteReaderAsync();
            if (await reader.ReadAsync())
            {
                return new
                {
                    email_address = reader.GetString(0),
                    first_name = reader.GetString(1)
                };
            }
            return null;
        }


        private async Task CreateAccount(string sql, List<MySqlParameter> parms)
        {
            List<customer> newCustomer = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }
            await command.ExecuteNonQueryAsync();

        }


            private async Task Reservation(string sql, List<MySqlParameter> parms)
        {
            List<customer> newCustomer = new();
            using var connection = new MySqlConnection(cs);
            await connection.OpenAsync();
            using var command = new MySqlCommand(sql, connection);

            if (parms != null)
            {
                command.Parameters.AddRange(parms.ToArray());
            }
            await command.ExecuteNonQueryAsync();

        }


      private async Task CreateReservationLogic(reservation newReservation)
{
    using var connection = new MySqlConnection(cs);
    await connection.OpenAsync();

    
        
        using var reservationCommand = new MySqlCommand("", connection);
        
        reservationCommand.CommandText = @"INSERT INTO reservations (email_address, date, address, reservation_id) 
                                         VALUES (@EmailAddress, @Date, @Address, @ReservationID);";
        
        reservationCommand.Parameters.AddWithValue("@EmailAddress", newReservation.email_address);
        reservationCommand.Parameters.AddWithValue("@Date", newReservation.date);
        reservationCommand.Parameters.AddWithValue("@Address", newReservation.address);
        reservationCommand.Parameters.AddWithValue("@ReservationID", newReservation.reservation_id);

        reservationCommand.Prepare();


        reservationCommand.ExecuteNonQuery();
        
}


private async Task CreateFoodInstance(FoodInstance foodInstance)
{
    using var connection = new MySqlConnection(cs);
    await connection.OpenAsync();


        using var foodInstanceCommand = new MySqlCommand("", connection);
        
        
            foodInstanceCommand.CommandText = @"INSERT INTO food_instance (food_id, quantity, reservation_id) 
                                         VALUES (@FoodId, @Quantity, @ReservationId);";
            foodInstanceCommand.Parameters.AddWithValue("@FoodId", foodInstance.food_id);
            foodInstanceCommand.Parameters.AddWithValue("@ReservationId", foodInstance.reservation_id);
            foodInstanceCommand.Parameters.AddWithValue("@Quantity", foodInstance.quantity);

            await foodInstanceCommand.ExecuteNonQueryAsync();
        

}


        public async Task<object> CustomerLogin(login newLogin)
        {

            string sql = "SELECT email_address, first_name FROM customer WHERE email_address = @EmailAddress AND password = @Password;";


            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@EmailAddress", MySqlDbType.String) { Value = newLogin.email_address });
            parms.Add(new MySqlParameter("@Password", MySqlDbType.String) { Value = newLogin.password });

            return await ValidateLogin(sql, parms);
        }

        public async Task<object> AdminLogin(login newLogin)
        {

            string sql = "SELECT email_address, first_name FROM admin WHERE email_address = @EmailAddress AND password = @Password;";


            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@EmailAddress", MySqlDbType.String) { Value = newLogin.email_address });
            parms.Add(new MySqlParameter("@Password", MySqlDbType.String) { Value = newLogin.password });

            return await ValidateLogin(sql, parms);
        }


        public async Task CreateCustomer(customer newCustomer)
        {
            string sql = "INSERT INTO customer (email_address, password, first_name, last_name, address, zip, state) VALUES (@Email, @Password, @FirstName, @LastName, @Address, @Zip, @State)";

            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@Email", MySqlDbType.String) { Value = newCustomer.email_address });
            parms.Add(new MySqlParameter("@Password", MySqlDbType.String) { Value = newCustomer.password });
            parms.Add(new MySqlParameter("@FirstName", MySqlDbType.String) { Value = newCustomer.first_name });
            parms.Add(new MySqlParameter("@LastName", MySqlDbType.String) { Value = newCustomer.last_name });
            parms.Add(new MySqlParameter("@Address", MySqlDbType.String) { Value = newCustomer.address });
            parms.Add(new MySqlParameter("@Zip", MySqlDbType.Int32) { Value = newCustomer.zip });
            parms.Add(new MySqlParameter("@State", MySqlDbType.String) { Value = newCustomer.state });


            await CreateAccount(sql, parms);
        }





       public async Task<List<reservation>> GetAllReservations()
{
    string sql = @"SELECT 
    r.reservation_id, 
    r.email_address, 
    r.date, 
    r.address,
    r.isComplete,
    fi.food_id,
    fi.quantity
FROM 
    reservations r
JOIN 
    food_instance fi ON r.reservation_id = fi.reservation_id
ORDER BY 
    r.reservation_id, fi.food_id;
";
    List<MySqlParameter> parms = new();
    return await GetAllCustomerReservation(sql, parms);
}


public async Task CreateReservation(reservation reservationData)
{

  
    await CreateReservationLogic(reservationData);

  

    foreach(var foodInstance in reservationData.FoodInstances){
        await CreateFoodInstance(foodInstance);
    }
    
    
}

public async Task<List<food>> FoodProxy()
{
    string sql = @"Select * from food";
      List<MySqlParameter> parms = new();
    return await GetAllFoods(sql, parms);
}


public async Task<List<ReservationTime>> ReservationTimeProxy()
{
    string sql = @"select date from reservations";
      List<MySqlParameter> parms = new();
    return await GetAllReservationTimes(sql, parms);
}


public async Task isCompleteProxy(int reservation_id)
{
    string sql = @"UPDATE reservations set isComplete = 1 Where reservation_id = @reservation_id";
    List<MySqlParameter> parms = new()
    {
        new MySqlParameter("@reservation_id", reservation_id)
    };
     IsComplete(sql, parms);
}



public async Task inCompleteProxy(int reservation_id)
{
    string sql = @"UPDATE reservations set isComplete = 0 Where reservation_id = @reservation_id";
    List<MySqlParameter> parms = new()
    {
        new MySqlParameter("@reservation_id", reservation_id)
    };
     IsComplete(sql, parms);
}





public async Task<List<reservationInfo>> ReservationInfo(){
    List<reservationInfo> reservationInfo = new();
    using var connection = new MySqlConnection(cs);
    await connection.OpenAsync();

    using var command = new MySqlCommand("select fi.reservation_id, fi.food_id, quantity, date, food_name from food_instance fi join reservations r on fi.reservation_id = r.reservation_id join food f on fi.food_id = f.food_id;", connection);

    using var reader = await command.ExecuteReaderAsync();
    while(await reader.ReadAsync()){
        reservationInfo.Add(new reservationInfo(){
            reservation_id = reader.GetInt32(0),
            food_id = reader.GetInt32(1),
            quantity = reader.GetInt32(2),
            date = reader.GetString(3),
            foodName = reader.GetString(4),
        });
    }
    return reservationInfo;
}

    }
}