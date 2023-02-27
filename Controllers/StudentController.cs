using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using projapi.Models;

namespace projapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ACE42023Context _context;

        public StudentController(ACE42023Context context)
        {
            _context = context;
        }

        // GET: api/Student
        [HttpGet]
        // [Route("GetStudentColleges")]

        public async Task<ActionResult<IEnumerable<StudentCollege>>> GetStudentColleges()
        {
            return await _context.StudentColleges.ToListAsync();
        }

        // GET: api/Student/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentCollege>> GetStudentCollege(string id)
        {
            var studentCollege = await _context.StudentColleges.FindAsync(id);

            if (studentCollege == null)
            {
                return NotFound();
            }
            // Console.WriteLine("API USED");
            return studentCollege;
        }

        [HttpGet("Search/{id}")]
        // [Route("Search")]
        public async Task<ActionResult<IEnumerable<StudentCollege>>> Search(string id)
        {
            var u = await _context.StudentColleges.Where(x=>x.Name.Contains(id)).ToListAsync();
            if(u==null)
            {
                return NotFound();
            }
            return u;
        }

        // PUT: api/Student/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentCollege(string id, StudentCollege studentCollege)
        {
            if (id != studentCollege.Email)
            {
                return BadRequest();
            }

            _context.Entry(studentCollege).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentCollegeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Student
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        // [Route("PostStudentCollege")]

        public async Task<ActionResult<StudentCollege>> PostStudentCollege(StudentCollege studentCollege)
        {
            _context.StudentColleges.Add(studentCollege);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (StudentCollegeExists(studentCollege.Email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStudentCollege", new { id = studentCollege.Email }, studentCollege);
        }

        // DELETE: api/Student/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentCollege(string id)
        {
            var studentCollege = await _context.StudentColleges.FindAsync(id);
            if (studentCollege == null)
            {
                return NotFound();
            }

            _context.StudentColleges.Remove(studentCollege);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentCollegeExists(string id)
        {
            return _context.StudentColleges.Any(e => e.Email == id);
        }
    }
}
