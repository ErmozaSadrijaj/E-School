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
    [Route("admin/[controller]")]
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
            string query = @"select nxenesiID,emri_mbiemri,email,passwordi,fotoPath,vendbanimi,nrTelefonit,drejtimi,emriPrindit,prindiID from dbo.nxenesi";
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
            string query = @"insert into dbo.nxenesi values
                            ('" + nx.emri_mbiemri + @"',
                            '" + nx.email + @"',
                            '" + nx.passwordi + @"',
                            '" + nx.fotoPath + @"',
                            '" + nx.vendbanimi + @"',
                            '" + nx.nrTelefonit + @"',
                            '" + nx.drejtimi + @"',
                            '" + nx.emriPrindit + @"',
                            '" + nx.prindiID + @"'),                        
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
            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Nxenesi nx)
        {
            string query = @"update dbo.nxenesi set 
                            emri_mbiemri = '" + nx.emri_mbiemri + @"',
                            email = '" + nx.email + @"',
                            passwordi = '" + nx.passwordi + @"',
                            fotoPath = '" + nx.fotoPath + @"'                         
                            vendbanimi = '" + nx.vendbanimi + @"',
                            nrTelefonit = '" + nx.nrTelefonit + @"',
                            drejtimi = '" + nx.drejtimi + @"',
                            emriPrindit = '" + nx.emriPrindit + @"',
                            emriPrindit = '" + nx.emriPrindit + @"',

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
                            where nxenesiID = " + id + @"
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