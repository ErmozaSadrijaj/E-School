using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace stafi.Models
{
    public class Stafi
    {
        public int ID { get; set; }
        public int stafiID { get; set; }
        public string emri_mbiemri { get; set; }
        public string fjalekalimi { get; set; }
        public string email { get; set; }
        public string fotoPath { get; set; }
        public string nrTelefonit { get; set; }
        public string vendbanimi { get; set; }
        public string Kualifikimi { get; set; }
        public string roli { get; set; }
    }
}
