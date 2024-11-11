using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

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
        private async Task<List<reservation>> GetReservation(string sql, List<MySqlParameter> parms)
{
    // Dictionary to hold reservation details by reservation_id
    Dictionary<int, reservation> reservationDict = new();

    using var connection = new MySqlConnection(cs);
    await connection.OpenAsync();
    using var command = new MySqlCommand(sql, connection);

    if (parms != null)
    {
        command.Parameters.AddRange(parms.ToArray());
    }

    using var reader = await command.ExecuteReaderAsync();
    while (await reader.ReadAsync())
    {
        int reservationId = reader.GetInt32(0);

        // Check if the reservation_id already exists in the dictionary
        if (!reservationDict.TryGetValue(reservationId, out var currentReservation))
        {
            // If not, create a new reservation and add it to the dictionary
            currentReservation = new reservation
            {
                reservation_id = reservationId,
                email_address = reader.GetString(1),
                food_name = new List<string>(),
                itemprice = new List<int>()
            };
            reservationDict[reservationId] = currentReservation;
        }

        // Add food_name and itemprice to the respective lists
        currentReservation.food_name.Add(reader.GetString(2));
        currentReservation.itemprice.Add(reader.GetInt32(3));
    }

    // Return the dictionary values as a list
    return reservationDict.Values.ToList();
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
            string sql = "SELECT * FROM reservations;";
            List<MySqlParameter> parms = new();
            return await GetReservation(sql, parms);
        }


        public async Task<List<reservation>> GetReservation(string email_address)
{
    Console.WriteLine($"Email Address: {email_address}");
    string sql = @"
        SELECT r.reservation_id, r.email_address, f.food_name, (f.food_price * fi.quantity) AS itemPrice 
        FROM reservations r 
        JOIN food_instance fi ON fi.reservation_id = r.reservation_id 
        JOIN food f ON fi.food_id = f.food_id 
        WHERE r.email_address = @email_address;";
    
    List<MySqlParameter> parms = new()
    {
        new MySqlParameter("@email_address", MySqlDbType.String) { Value = email_address }
    };

    return await GetReservation(sql, parms);
}

      



    }















}