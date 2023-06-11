using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using stafi.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace stafi.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class AdministratoriController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AdministratoriController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]

        public JsonResult Get()
        {
            string query = @"select ID,stafiID,emri_mbiemri,fjalekalimi,email,fotoPath,nrTelefonit,vendbanimi,Kualifikimi,roli from dbo.stafi where roli = 'administratori'";
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

        [HttpPost]
        public JsonResult Post(Stafi st)
        {
            // Gjenerejome ID
            string staffId = "A-" + GenerateRandomNumbers(9);

            // Marrim 2 karakteret e para nga emri_mbiemri
            string prefix = st.emri_mbiemri.Substring(0, 2).ToLower();

            // marrim 5 karakteret e fundit nga ID
            string suffix = staffId.Substring(Math.Max(0, staffId.Length - 5));

            // Gjenerohet nje email
            string email = $"{prefix}{suffix}@bedriPejani.net";

            string query = @"insert into dbo.stafi values
            ('" + staffId + @"',
            '" + st.emri_mbiemri + @"',
            '" + st.fjalekalimi + @"',
            '" + email + @"',
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
                    staffId = "A-" + GenerateRandomNumbers(9);

                    // Behet update email me  staffId te re
                    suffix = staffId.Substring(Math.Max(0, staffId.Length - 5));
                    email = $"{prefix}{suffix}@bedriPejani.net";

                    // behet update query
                    query = @"insert into dbo.stafi values
                    ('" + staffId + @"',
                    '" + st.emri_mbiemri + @"',
                    '" + st.fjalekalimi + @"',
                    '" + email + @"',
                    '" + st.fotoPath + @"',
                    '" + st.nrTelefonit + @"',
                    '" + st.vendbanimi + @"',
                    '" + st.Kualifikimi + @"',
                    '" + st.roli + @"')
                    ";
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


    }
}