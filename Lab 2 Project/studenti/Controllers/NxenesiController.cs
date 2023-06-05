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
    public class NxenesiController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public NxenesiController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select ID,nxenesiID,emri_mbiemri,email,fjalekalimi,fotoPath,vendbanimi,nrTelefonit,drejtimi,emriPrindit,prindiID,drejtimiID,mesimdhenesiID from dbo.nxenesi";
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
            string query = "SELECT ID,nxenesiID,emri_mbiemri,email,fjalekalimi,fotoPath,vendbanimi,nrTelefonit,drejtimi,emriPrindit,prindiID,drejtimiID,mesimdhenesiID from dbo.nxenesi WHERE ID = '" + id + "'";
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
        public JsonResult Post(Nxenesi nx)
        {
            string nxenesiID = "N-" + GenerateRandomNumbers(9);

            string query = @"insert into dbo.nxenesi values
                            (
                            '"+ nxenesiID + @"',
                            '" + nx.emri_mbiemri + @"',
                            '" + nx.email + @"',
                            '" + nx.fjalekalimi + @"',
                            '" + nx.fotoPath + @"',
                            '" + nx.vendbanimi + @"',
                            '" + nx.nrTelefonit + @"',
                            '" + nx.drejtimi + @"',
                            '" + nx.emriPrindit + @"',
                            '" + nx.prindiID + @"',
                            '" + nx.drejtimiID + @"',
                            '" + nx.mesimdhenesiID + @"')                        
                            ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();

                // Kontrollojm nese ID egziston ne databaze
                bool idExists = false;
                string checkQuery = "SELECT COUNT(*) FROM dbo.nxenesi WHERE nxenesiID = @NxenesId";
                using (SqlCommand checkCommand = new SqlCommand(checkQuery, myCon))
                {
                    checkCommand.Parameters.AddWithValue("@NxenesId", nxenesiID);
                    int count = (int)checkCommand.ExecuteScalar();
                    idExists = count > 0;
                }

                if (idExists)
                {
                    // Rigjenerohet ID ne rast se egziston ne databaze
                    nxenesiID = "N-" + GenerateRandomNumbers(9);
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
        public JsonResult Put(Nxenesi nx)
        {
            string query = @"update dbo.nxenesi set 
                            emri_mbiemri = '" + nx.emri_mbiemri + @"',
                            email = '" + nx.email + @"',
                            fjalekalimi = '" + nx.fjalekalimi + @"',
                            fotoPath = '" + nx.fotoPath + @"'                         
                            vendbanimi = '" + nx.vendbanimi + @"',
                            nrTelefonit = '" + nx.nrTelefonit + @"',
                            drejtimi = '" + nx.drejtimi + @"',
                            emriPrindit = '" + nx.emriPrindit + @"',
                            prindiID = '" + nx.prindiID + @"',
                            drejtimiID = '" + nx.drejtimiID + @"',
                            mesimdhenesiID = '" + nx.mesimdhenesiID + @"',

                            where nxenesiID = " + nx.nxenesiID + @"
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
            string query = @"delete from dbo.nxenesi 
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