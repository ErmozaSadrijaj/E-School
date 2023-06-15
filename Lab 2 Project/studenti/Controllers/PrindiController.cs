using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using studenti.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace studenti.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class PrindiController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public PrindiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select ID,prindiID,emri_mbiemri,email,fjalekalimi from dbo.prindi";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpGet("{id}")]

        public JsonResult GetPrindin(int id)
        {
            string query = @"select ID,prindiID,emri_mbiemri,email from dbo.prindi where ID = "+id;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpGet("nxenesitEPrindit/{id}")]

        public JsonResult GetNxenesitEPrindit(int id)
        {
            string query = @"select n.ID, n.emri_mbiemri ,n.nxenesiID,n.fotoPath,n.drejtimi from nxenesi n join prindi p on p.ID = n.prindiID where n.prindiID = " + id;
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Prindi pr)
        {

            // Gjenerejome ID
            string prindiID = "P-" + GenerateRandomNumbers(9);

            // Marrim 2 karakteret e para nga emri_mbiemri
            string prefix = pr.emri_mbiemri.Substring(0, 2).ToLower();

            // marrim 5 karakteret e fundit nga ID
            string suffix = prindiID.Substring(Math.Max(0, prindiID.Length - 5));

            // Gjenerohet nje email
            string email = $"{prefix}{suffix}@bedriPejani.net";

            string query = @"insert into dbo.prindi values
                            ('" + prindiID + @"',
                            '" + pr.emri_mbiemri + @"',
                            '" + email + @"',
                            '" + pr.fjalekalimi + @"')
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                // Kontrollojm nese ID egziston ne databaze
                bool idExists = false;
                string checkQuery = "SELECT COUNT(*) FROM dbo.prindi WHERE prindiID = @prindiID";
                using (SqlCommand checkCommand = new SqlCommand(checkQuery, myCon))
                {
                    checkCommand.Parameters.AddWithValue("@prindiID", prindiID);
                    int count = (int)checkCommand.ExecuteScalar();
                    idExists = count > 0;
                }
                if (idExists)
                {
                    // Rigjenerohet ID ne rast se egziston ne databaze
                    prindiID = "P-" + GenerateRandomNumbers(9);

                    // Behet update email me  nxenesiID te re
                    suffix = prindiID.Substring(Math.Max(0, prindiID.Length - 5));
                    email = $"{prefix}{suffix}@bedriPejani.net";

                    // behet update query
                    query = @"insert into dbo.prindi values
                            ('" + prindiID + @"',
                            '" + pr.emri_mbiemri + @"',
                            '" + email + @"',
                            '" + pr.fjalekalimi + @"')
                            ";
                }
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Added Successfully");
        }
        private string GenerateRandomNumbers(int length)
        {
            Random random = new Random();
            string numbers = "";
            for (int i = 0; i < length; i++)
            {
                numbers += random.Next(0, 10);
            }
            return numbers;
        }

        [HttpPut]
        public JsonResult Put(Prindi pr)
        {
            string query = @"update dbo.prindi set 

                            emri_mbiemri = '" + pr.emri_mbiemri + @"',
                            email = '" + pr.email + @"',
                            fjalekalimi = '" + pr.fjalekalimi + @"'

                            where ID = " + pr.ID + @"
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"DELETE FROM dbo.nxenesi WHERE prindiID = @id;
                     DELETE FROM dbo.prindi WHERE ID = @id;";

            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@id", id);
                    myCon.Open();
                    myCommand.ExecuteNonQuery();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}