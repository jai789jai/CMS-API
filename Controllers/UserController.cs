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
    public class UserController : ControllerBase
    {
        private readonly ACE42023Context _context;

        public UserController(ACE42023Context context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        // [Route("GetUserColleges")]
        public async Task<ActionResult<IEnumerable<UserCollege>>> GetUserColleges()
        {
            return await _context.UserColleges.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserCollege>> GetUserCollege(string id)
        {
            var userCollege = await _context.UserColleges.FindAsync(id);

            if (userCollege == null)
            {
                return NotFound();
            }

            return userCollege;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<UserCollege>> Login(UserCollege obj)
        {
            var userCollege = await _context.UserColleges.FindAsync(obj.Email);
            if(userCollege==null)
            {
                return NotFound();
            }
            if(obj.Password!=userCollege.Password)
            {
                return Unauthorized();
            }
            return userCollege;

        }

        [HttpGet("Search/{id}")]
        // [Route("Search/{id}")]
        public async Task<ActionResult<IEnumerable<UserCollege>>> Search(string id)
        {
            var u = await _context.UserColleges.Where(x=>x.Name.Contains(id)).ToListAsync();
            if(u==null)
            {
                return NotFound();
            }
            return u;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserCollege(string id, UserCollege userCollege)
        {
            if (id != userCollege.Email)
            {
                return BadRequest();
            }

            _context.Entry(userCollege).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserCollegeExists(id))
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

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        // [Route("PostUserCollege")]

        public async Task<ActionResult<UserCollege>> PostUserCollege(UserCollege userCollege)
        {
            _context.UserColleges.Add(userCollege);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserCollegeExists(userCollege.Email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUserCollege", new { id = userCollege.Email }, userCollege);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserCollege(string id)
        {
            var userCollege = await _context.UserColleges.FindAsync(id);
            if (userCollege == null)
            {
                return NotFound();
            }

            _context.UserColleges.Remove(userCollege);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserCollegeExists(string id)
        {
            return _context.UserColleges.Any(e => e.Email == id);
        }
    }
}
