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
    public class BookController : ControllerBase
    {
        private readonly ACE42023Context _context;

        public BookController(ACE42023Context context)
        {
            _context = context;
        }

        // GET: api/Book
        [HttpGet]
        // [Route("GetBookColleges")]

        public async Task<ActionResult<IEnumerable<BookCollege>>> GetBookColleges()
        {
            return await _context.BookColleges.ToListAsync();
        }

        // GET: api/Book/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookCollege>> GetBookCollege(int id)
        {
            var bookCollege = await _context.BookColleges.FindAsync(id);

            if (bookCollege == null)
            {
                return NotFound();
            }

            return bookCollege;
        }
        [HttpGet("Search/{id}")]
        // [Route("Search")]
        public async Task<ActionResult<IEnumerable<BookCollege>>> Search(string id)
        {
            var u = await _context.BookColleges.Where(x=>x.BookName.Contains(id)).ToListAsync();
            if(u==null)
            {
                return NotFound();
            }
            return u;
        }

        // PUT: api/Book/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookCollege(int id, BookCollege bookCollege)
        {
            if (id != bookCollege.BookId)
            {
                return BadRequest();
            }

            _context.Entry(bookCollege).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookCollegeExists(id))
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

        // POST: api/Book
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        // [Route("PostBookCollege")]

        public async Task<ActionResult<BookCollege>> PostBookCollege(BookCollege bookCollege)
        {
            _context.BookColleges.Add(bookCollege);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookCollegeExists(bookCollege.BookId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBookCollege", new { id = bookCollege.BookId }, bookCollege);
        }

        // DELETE: api/Book/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookCollege(int id)
        {
            var bookCollege = await _context.BookColleges.FindAsync(id);
            if (bookCollege == null)
            {
                return NotFound();
            }

            _context.BookColleges.Remove(bookCollege);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookCollegeExists(int id)
        {
            return _context.BookColleges.Any(e => e.BookId == id);
        }
    }
}
