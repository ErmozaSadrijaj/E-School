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
            string query = "select distinct nx.emri_mbiemri,nx.fotoPath,nx.nxenesiID , s.emri_mbiemri from nxenesi nx join lenda_nxenesi ln on nx.ID = ln.nxenesiID join lenda l on ln.lendaID = l.ID join stafi s on s.ID = l.mesimdhenesi WHERE s.ID = '" + id + "' and s.roli = 'mesimdhenes'";
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
    }
}