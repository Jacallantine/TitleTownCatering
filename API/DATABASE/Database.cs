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
            List<reservation> currentReservation = new();
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
                currentReservation.Add(new reservation()
                {
                    id = reader.GetInt32(0),
                    email_address = reader.GetString(1),
                    price = reader.GetInt32(2),

                });
            }
            return currentReservation;

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
            string sql = $"SELECT id, email_address, price FROM reservations WHERE email_address = @email_address; ";
            List<MySqlParameter> parms = new();
            parms.Add(new MySqlParameter("@email_address", MySqlDbType.String) { Value = email_address });

            return await GetReservation(sql, parms);
        }



    }















}