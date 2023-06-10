using Auth.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Auth.Controllers
{
    [Route("admin/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        [HttpGet("nxenes/{param1}/{param2}")]
        public JsonResult GetNxenesi(string param1, string param2)
        {
            string query = null;
            string roli = null;
            if (param1.StartsWith("N"))
            {
                roli = "nxenesi";
                query = @"select ID from dbo.nxenesi where nxenesiID = @param1 and fjalekalimi = @param2";
            }
            else if (param1.StartsWith("P"))
            {
                roli = "prindi";
                query = @"select ID from dbo.prindi where prindiID = @param1 and fjalekalimi = @param2";
            }

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@param1", param1);
                    myCommand.Parameters.AddWithValue("@param2", param2);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                }

                myCon.Close();
            }

            // Add the "roli" column to the DataTable
            table.Columns.Add("role", typeof(string));
            foreach (DataRow row in table.Rows)
            {
                row["role"] = roli;
            }

            // Return the modified DataTable containing ID and role
            return new JsonResult(table);
        }

        [HttpGet("staf/{param1}/{param2}")]
        public JsonResult GetStafi(string param1, string param2)
        {
           string query = @"select ID,roli from dbo.stafi where stafiID = @param1 and fjalekalimi = @param2";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@param1", param1);
                    myCommand.Parameters.AddWithValue("@param2", param2);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                }

                myCon.Close();
            }
            return new JsonResult(table);
        }
    }
}

