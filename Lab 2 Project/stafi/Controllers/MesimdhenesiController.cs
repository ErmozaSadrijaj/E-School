using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using stafi.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace stafi.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class MesimdhenesiController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public MesimdhenesiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select ID,stafiID,emri_mbiemri,fjalekalimi,email,fotoPath,nrTelefonit,vendbanimi,Kualifikimi,roli from dbo.stafi where roli = 'mesimdhenes'";
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
        public JsonResult Get(string id)
        {
            string query = "select ID,stafiID,emri_mbiemri,fjalekalimi,email,fotoPath,nrTelefonit,vendbanimi,Kualifikimi,roli from dbo.stafi WHERE ID = '" + id + "'";
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
        
        public JsonResult Post(Stafi st)
        {
            // Gjenerejome ID
            string staffId = "M-" + GenerateRandomNumbers(9);

            string query = @"insert into dbo.stafi values
                    ('" + staffId + @"',
                    '" + st.emri_mbiemri + @"',
                    '" + st.fjalekalimi + @"',
                    '" + st.email + @"',
                    '" + st.fotoPath + @"',
                    '" + st.nrTelefonit + @"',
                    '" + st.vendbanimi + @"',
                    '" + st.Kualifikimi + @"',
                    '" + st.roli + @"')
                    ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                // Kontrollojm nese ID egziston ne databaze
                bool idExists = false;
                string checkQuery = "SELECT COUNT(*) FROM dbo.stafi WHERE stafiID = @StaffId";
                using (SqlCommand checkCommand = new SqlCommand(checkQuery, myCon))
                {
                    checkCommand.Parameters.AddWithValue("@StaffId", staffId);
                    int count = (int)checkCommand.ExecuteScalar();
                    idExists = count > 0;
                }

                if (idExists)
                {
                    // Rigjenerohet ID ne rast se egziston ne databaze
                    staffId = "M-" + GenerateRandomNumbers(9);
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

        // Kjo sigurohet qe karakteret e gjeneruara te jene vetem numra
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
        public JsonResult Put(Stafi st)
        {
            string query = @"update dbo.stafi set 
                            stafiID = '" + st.stafiID + @"',
                            emri_mbiemri = '" + st.emri_mbiemri + @"',
                            fjalekalimi = '" + st.fjalekalimi + @"',
                            email = '" + st.email + @"',
                            fotoPath = '" + st.fotoPath + @"',
                            nrTelefonit = '" + st.nrTelefonit + @"',
                            vendbanimi = '" + st.vendbanimi + @"',
                            Kualifikimi = '" + st.Kualifikimi + @"',
                            roli = '" + st.roli + @"'                         

                            where ID = " + st.ID + @"
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
            string query = @"delete from dbo.stafi 
                            where ID = " + id + @"
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
            return new JsonResult("Deleted Successfully");
        }
    }
}