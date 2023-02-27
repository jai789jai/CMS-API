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
    public class GradeController : ControllerBase
    {
        private readonly ACE42023Context _context;

        public GradeController(ACE42023Context context)
        {
            _context = context;
        }

        // GET: api/Grade
        [HttpGet]
        // [Route("GetGradeColleges")]

        public async Task<ActionResult<IEnumerable<GradeCollege>>> GetGradeColleges()
        {
            return await _context.GradeColleges.ToListAsync();
        }

        // GET: api/Grade/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GradeCollege>> GetGradeCollege(string id, string subject)
        {
            var result = (from i in _context.GradeColleges
                          where i.Email==id &&i.Subject==subject
                          select i).SingleOrDefault();

            if (result == null)
            {
                return NotFound();
            }

            return result;
        }

        [HttpGet("Search/{id}")]
        // [Route("Search")]
        public async Task<ActionResult<IEnumerable<GradeCollege>>> Search(string id)
        {
            var u = await _context.GradeColleges.Where(x=>x.Email.Contains(id)).ToListAsync();
            if(u==null)
            {
                return NotFound();
            }
            return u;
        }

        // PUT: api/Grade/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGradeCollege(string id, GradeCollege gradeCollege)
        {
            if (id != gradeCollege.Email)
            {
                return BadRequest();
            }

            _context.Entry(gradeCollege).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GradeCollegeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            // Console.WriteLine(gradeCollege.Grade);
            return NoContent();
        }

        // POST: api/Grade
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        // [Route("PostGradeCollege")]
        
        public async Task<ActionResult<GradeCollege>> PostGradeCollege(GradeCollege gradeCollege)
        {
            _context.GradeColleges.Add(gradeCollege);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (GradeCollegeExists(gradeCollege.Email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetGradeCollege", new { id = gradeCollege.Email }, gradeCollege);
        }

        // DELETE: api/Grade/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGradeCollege(string id, string subject)
        {
            var result = (from i in _context.GradeColleges
                          where i.Email==id &&i.Subject==subject
                          select i).SingleOrDefault();
            if (result == null)
            {
                return NotFound();
            }

            _context.GradeColleges.Remove(result);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GradeCollegeExists(string id)
        {
            return _context.GradeColleges.Any(e => e.Email == id);
        }
    }
}
