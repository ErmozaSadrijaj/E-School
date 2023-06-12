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
    public class BlogsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public BlogsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select b.ID,titulli,permbatja,dataPublikimit,kliket,b.fotoPath,aprovuar,autoriID,s.emri_mbiemri from dbo.blogs b join stafi s on s.ID = b.autoriID";
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
        [HttpGet("/aprovuar")]

        public JsonResult GetAprovuar()
        {
            string query = @"select b.ID,titulli,permbatja,dataPublikimit,kliket,b.fotoPath,aprovuar,autoriID,s.emri_mbiemri  from dbo.blogs b join stafi s on s.ID = b.autoriID  where aprovuar = 'po' ";
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
        [HttpGet("/JoAprovuar")]

        public JsonResult GetJoAprovuar()
        {
            string query = @"select b.ID,titulli,permbatja,dataPublikimit,kliket,b.fotoPath,aprovuar,autoriID,s.emri_mbiemri  from dbo.blogs b join stafi s on s.ID = b.autoriID  where aprovuar = 'jo' ";
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

        public JsonResult Get(int id)
        {
            string query = @"select b.ID,titulli,permbatja,dataPublikimit,kliket,b.fotoPath,aprovuar,autoriID,s.emri_mbiemri from dbo.blogs b join stafi s on s.ID = b.autoriID where b.ID ='" + id + "'";
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
        public JsonResult Post(Blogs bl)
        {
            string query = @"INSERT INTO dbo.blogs OUTPUT INSERTED.ID VALUES
                     ('" + bl.titulli + @"',
                      '" + bl.permbatja + @"',
                      '" + bl.dataPublikimit + @"',
                      '" + bl.kliket + @"',
                      '" + bl.fotoPath + @"',
                      '" + bl.aprovuar + @"',
                      '" + bl.autoriID + @"')
                    ";
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("DBAppCon");
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    int insertedId = (int)myCommand.ExecuteScalar();
                    myCon.Close();
                    return new JsonResult(new { ID = insertedId, Message = "Added Successfully" });
                }
            }
        }


        [HttpPut]
        public JsonResult Put(Blogs bl)
        {
            string query = @"update dbo.blogs set 
                            titulli = '" + bl.titulli + @"',
                            permbatja = '" + bl.permbatja + @"',
                            dataPublikimit = '" + bl.dataPublikimit + @"',
                            kliket = '" + bl.kliket + @"',
                            fotoPath = '" + bl.fotoPath + @"',
                            aprovuar = '" + bl.aprovuar + @"',
                            autoriID = '" + bl.autoriID + @"'                         

                            where ID = " + bl.ID + @"
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
        [HttpPut("aprovo/")]
        public JsonResult PutAprovo(Blogs bl)
        {
            string query = @"update dbo.blogs set 
                            permbatja = '" + bl.permbatja + @"',
                            aprovuar = '" + bl.aprovuar + @"'

                            where ID = " + bl.ID + @"
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
        [HttpPut("shtoKliket/")]
        public JsonResult PutKliket(Blogs bl)
        {
            string query = @"update dbo.blogs set                         
                            kliket = '" + bl.kliket + @"'                                              
                            where ID = " + bl.ID + @"
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
            string query = @"delete from dbo.blogs 
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

