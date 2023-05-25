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
    public class NotatController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public NotatController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select ID,lendaID,stafiID,nxenesiID,notaNumer,notaShkronje from dbo.notat";
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
        /*Ketu merren lendet per nxenesit me ane te ID te nxenesit */
        [HttpGet("{id}")]
        public JsonResult Get(string id)
        {
            string query = "SELECT l.emri as 'Lenda',n.notaNumer,n.notaShkronje, s.emri_mbiemri as 'Mesimdhenesi', n.dataVendosjes " +
                            "FROM notat n " +
                            "JOIN stafi s ON n.stafiID = s.ID " +
                            "JOIN lenda l on n.lendaID = l.ID " +
                            "JOIN nxenesi nx on n.nxenesiID = nx.ID where n.nxenesiID = '" + id + "'";
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
        public JsonResult Post(Notat not)
        {
            string query = @"insert into dbo.notat values
                            ('" + not.lendaID + @"',
                            '" + not.stafiID + @"',
                            '" + not.nxenesiID + @"',
                            '" + not.notaNumer + @"'), 
                            '" + not.notaShkronje + @"'), 

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
        public JsonResult Put(Notat not)
        {
            string query = @"update dbo.notat set 
                            lendaID = '" + not.lendaID + @"',
                            stafiID = '" + not.stafiID + @"',
                            nxenesiID = '" + not.nxenesiID + @"',
                            notaNumer = '" + not.notaNumer + @"',  
                            notaShkronje = '" + not.notaShkronje + @"',

                            where ID = " + not.ID + @"
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
            string query = @"delete from dbo.notat 
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