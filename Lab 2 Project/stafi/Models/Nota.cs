using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace nota.Models
{
    public class Nota
    {
        public int ID { get; set; }
        public int lendaID { get; set; }
        public int nxenesiID { get; set; }
        public int stafiID { get; set; }
        public int notaNumer { get; set; }
        public string notaShkronje { get; set; }
        public string dataVendosjes { get; set; }
      
    }
}
