using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using mungesa.Models;
using nota.Models;
using stafi.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using veretje.Models;

namespace stafi.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class MesimdhenesiNxenesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public MesimdhenesiNxenesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("{id}")]
        public JsonResult Get(string id)
        {
            string query = "select distinct nx.ID,nx.emri_mbiemri,nx.fotoPath,nx.nxenesiID,nx.mesimdhenesiID , s.emri_mbiemri from nxenesi nx join lenda_nxenesi ln on nx.ID = ln.nxenesiID join lenda l on ln.lendaID = l.ID join stafi s on s.ID = l.mesimdhenesi WHERE s.ID = '" + id + "' and s.roli = 'mesimdhenesi'";
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

        [HttpGet("{id}/lendetEStudentit/{studentId}")]
        public JsonResult GetLendetEStudentit(string id, string studentId)
        {
            string query = "select distinct l.ID,l.viti,l.emri from nxenesi nx join lenda_nxenesi ln on nx.ID = ln.nxenesiID join lenda l on ln.lendaID = l.ID join stafi s on s.ID = l.mesimdhenesi WHERE s.ID = '"+id+"' and s.roli = 'mesimdhenesi' and nx.nxenesiID = '"+ studentId + "'";
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
        [HttpGet("mesimdhenesitEStudentit/{studentId}")]
        public JsonResult GetMesimdhenesitEStudentit(string studentId)
        {
            string query = "select distinct s.ID,s.emri_mbiemri,s.stafiID from stafi s join lenda l on s.ID = l.mesimdhenesi join lenda_nxenesi ln on ln.lendaID = l.ID where ln.nxenesiID = '" + studentId + "'";
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
        public JsonResult Post(Nota nt)
        {
            string query = @"insert into dbo.notat values
                            ('" + nt.lendaID + @"',
                            '" + nt.nxenesiID + @"',
                            '" + nt.stafiID + @"',
                            '" + nt.notaNumer + @"', 
                            '" + nt.notaShkronje + @"',
                            '" + nt.dataVendosjes + @"')
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
        [HttpPost("veretjet")]
        public JsonResult PostVeretjet(Veretje vt)
        {
            string query = @"insert into dbo.veretjet values
                            ('" + vt.komenti + @"',
                            '" + vt.stafiID + @"',
                            '" + vt.nxenesiID + @"',
                            '" + vt.dataVendosjes + @"')
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
        [HttpPost("mungesat")]
        public JsonResult PostMungesat(Mungesat mu)
        {
            string query = @"insert into dbo.mungesatDitore values
                            ('" + mu.meArsyje + @"',
                            '" + mu.paArsyje + @"',
                            '" + mu.nxenesiID + @"',
                            '" + mu.dataVendosjes + @"')
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
    }
}