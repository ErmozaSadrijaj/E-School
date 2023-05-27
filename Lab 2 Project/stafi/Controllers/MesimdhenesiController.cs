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
            string query = "select ID,stafiID,emri_mbiemri,fjalekalimi,email,fotoPath,nrTelefonit,vendbanimi,Kualifikimi,roli from dbo.stafi WHERE ID = '" + id + "' and roli = 'mesimdhenes'";
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
            string query = @"insert into dbo.stafi values
                            ('" + st.stafiID + @"',
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