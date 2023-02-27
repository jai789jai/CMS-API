using System;
using System.Collections.Generic;

#nullable disable

namespace projapi.Models
{
    public partial class GradeCollege
    {
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Grade { get; set; }

        public virtual StudentCollege EmailNavigation { get; set; }
    }
}
