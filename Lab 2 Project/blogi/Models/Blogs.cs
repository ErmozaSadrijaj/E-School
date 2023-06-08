using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace blogi.Models
{
    public class Blogs
    {
        public int ID { get; set; }
        public string titulli { get; set; }
        public string permbatja { get; set; }
        public string dataPublikimit { get; set; }
        public int kliket { get; set; }
        public string fotoPath { get; set; }
        public string aprovuar { get; set; }
        public int autoriID { get; set; }


    }
}
