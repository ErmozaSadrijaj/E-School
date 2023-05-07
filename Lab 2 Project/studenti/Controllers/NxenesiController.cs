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
            string query = @"insert into dbo.nxenesi values
                            ('" + nx.emri_mbiemri + @"',
                            '" + nx.email + @"',
                            '" + nx.passwordi + @"',
                            '" + nx.fotoPath + @"',
                            '" + nx.vendbanimi + @"',
                            '" + nx.nrTelefonit + @"',
                            '" + nx.drejtimi + @"',
                            '" + nx.emriPrindit + @"',
                            '" + nx.prindiID + @"',
                            '" + nx.drejtimiID + @"',
                            '" + nx.mesimdhenesiID + @"'),                        
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
                            fjalekalimi = '" + nx.passwordi + @"',
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