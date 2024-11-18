using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

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
                date = reader.GetString(reader.GetOrdinal("date")),
                address = reader.GetString(reader.GetOrdinal("address")),
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


      private async Task<bool> CreateReservationLogic(reservation newReservation)
{
    using var connection = new MySqlConnection(cs);
    await connection.OpenAsync();

    using var transaction = await connection.BeginTransactionAsync();

    try
    {
        string insertReservationSql = @"INSERT INTO reservations (email_address, date, address) 
                                         VALUES (@EmailAddress, @Date, @Address);
                                         SELECT LAST_INSERT_ID();";
        using var reservationCommand = new MySqlCommand(insertReservationSql, connection, transaction);
        reservationCommand.Parameters.AddWithValue("@EmailAddress", newReservation.email_address);
        reservationCommand.Parameters.AddWithValue("@Date", newReservation.date);
        reservationCommand.Parameters.AddWithValue("@Address", newReservation.address);

        int reservationId = Convert.ToInt32(await reservationCommand.ExecuteScalarAsync());

        await transaction.CommitAsync();
        return true;
    }
    catch
    {
        await transaction.RollbackAsync();
        return false;
    }
}


private async Task<bool> CreateFoodInstances(List<FoodInstance> foodInstances)
{
    using var connection = new MySqlConnection(cs);
    await connection.OpenAsync();

    using var transaction = await connection.BeginTransactionAsync();

    try
    {
        string insertFoodInstanceSql = @"INSERT INTO food_instance (food_id, reservation_id, quantity) 
                                         VALUES (@FoodId, @ReservationId, @Quantity);";

        foreach (var foodInstance in foodInstances)
        {
            using var foodInstanceCommand = new MySqlCommand(insertFoodInstanceSql, connection, transaction);
            foodInstanceCommand.Parameters.AddWithValue("@FoodId", foodInstance.food_id);
            foodInstanceCommand.Parameters.AddWithValue("@ReservationId", foodInstance.reservation_id);
            foodInstanceCommand.Parameters.AddWithValue("@Quantity", foodInstance.quantity);

            await foodInstanceCommand.ExecuteNonQueryAsync();
        }

        await transaction.CommitAsync();
        return true;
    }
    catch
    {
        await transaction.RollbackAsync();
        return false;
    }
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
            string sql = "INSERT INTO customer (email_address, password, first_name, last_name) VALUES (@Email, @Password, @FirstName, @LastName)";

            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@Email", MySqlDbType.String) { Value = newCustomer.email_address });
            parms.Add(new MySqlParameter("@Password", MySqlDbType.String) { Value = newCustomer.password });
            parms.Add(new MySqlParameter("@FirstName", MySqlDbType.String) { Value = newCustomer.first_name });
            parms.Add(new MySqlParameter("@LastName", MySqlDbType.String) { Value = newCustomer.last_name });


            await CreateAccount(sql, parms);
        }
















       public async Task<List<reservation>> GetAllReservations()
{
    string sql = @"SELECT 
    r.reservation_id, 
    r.email_address, 
    r.date, 
    r.address,
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


public async Task<bool> CreateReservation(reservation reservationData, List<FoodInstance> foodInstances)
{
    if (reservationData == null || foodInstances == null || !foodInstances.Any())
    {
        throw new ArgumentException("Invalid reservation or food instance data.");
    }


    bool isReservationCreated = await CreateReservationLogic(reservationData);

    if (isReservationCreated)
    {
       
        foreach (var foodInstance in foodInstances)
        {
            foodInstance.reservation_id = reservationData.reservation_id; 
        }

       
        bool areFoodInstancesCreated = await CreateFoodInstances(foodInstances);
        return areFoodInstancesCreated;
    }

    return false;
}





    }















}