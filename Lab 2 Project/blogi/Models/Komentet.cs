using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace blogi.Models
{
    public class Komentet
    {
        public int ID { get; set; }
        public string komenti { get; set; }
        public string dataPublikimit { get; set; }
        public int autoriID { get; set; }
        public int blogID { get; set; }


    }
}
