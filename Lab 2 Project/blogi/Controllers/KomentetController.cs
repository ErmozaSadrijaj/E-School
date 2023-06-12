using blogi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace blogi.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class KomentetController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public KomentetController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                                SELECT k.*, 
                                    CASE 
                                        WHEN LEFT(k.autoriID, 1) = 'M' THEN s.emri_mbiemri
                                        WHEN LEFT(k.autoriID, 1) = 'N' THEN n.emri_mbiemri
                                        ELSE NULL
                                    END AS emri_mbiemri
                                FROM dbo.komentet k
                                LEFT JOIN stafi s ON LEFT(k.autoriID, 1) = 'M' AND s.StafiID = k.autoriID
                                LEFT JOIN nxenesi n ON LEFT(k.autoriID, 1) = 'N' AND n.NxenesiID = k.autoriID";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            SqlDataReader myReader;

            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpGet("{id}")]

        public JsonResult Get(int id)
        {
            string query = @"SELECT k.*, 
                                    CASE 
                                        WHEN  k.roli = 'mesimdhenesi' THEN s.emri_mbiemri
										WHEN  k.roli = 'administratori' THEN s.emri_mbiemri
                                        WHEN  k.roli = 'drejtori' THEN s.emri_mbiemri
                                        WHEN  k.roli = 'nxenesi' THEN n.emri_mbiemri
                                        ELSE NULL
                                    END AS emri_mbiemri
                                FROM dbo.komentet k
                                LEFT JOIN stafi s ON k.autoriID = s.ID 
                                LEFT JOIN nxenesi n ON k.autoriID = n.ID  where blogID = '" + id + "'";
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
        public JsonResult Post(Komentet ko)
        {
            string query = @"insert into dbo.komentet values
                            ('" + ko.komenti+ @"',
                            '" + ko.dataPublikimit + @"',
                            '" + ko.autoriID + @"',
                            '" + ko.blogID + @"',
                            '" + ko.roli + @"')
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
        public JsonResult Put(Komentet ko)
        {
            string query = @"update dbo.komentet set 
                            komenti = '" + ko.komenti + @"'
                                                
                            where ID = " + ko.ID + @"
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
            string query = @"delete from dbo.komentet 
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

        [HttpDelete("meBlog/{id}")]
        public JsonResult DeleteMeBlog(int id)
        {
            string query = @"delete from dbo.komentet 
                            where blogID = " + id + @"
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

