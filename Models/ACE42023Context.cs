using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace projapi.Models
{
    public partial class ACE42023Context : DbContext
    {
        public ACE42023Context()
        {
        }

        public ACE42023Context(DbContextOptions<ACE42023Context> options)
            : base(options)
        {
        }

        public virtual DbSet<BookCollege> BookColleges { get; set; }
        public virtual DbSet<GradeCollege> GradeColleges { get; set; }
        public virtual DbSet<StudentCollege> StudentColleges { get; set; }
        public virtual DbSet<UserCollege> UserColleges { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DEVSQL.corp.local;Database=ACE 4- 2023;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<BookCollege>(entity =>
            {
                entity.HasKey(e => e.BookId)
                    .HasName("PK__bookColl__490D1AE108E2EE28");

                entity.ToTable("bookCollege");

                entity.Property(e => e.BookId)
                    .ValueGeneratedNever()
                    .HasColumnName("book_id");

                entity.Property(e => e.Author)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("author");

                entity.Property(e => e.BookName)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("book_name");

                entity.Property(e => e.IssuedTo)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("issued_to");

                entity.Property(e => e.Status)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("status");
            });

            modelBuilder.Entity<GradeCollege>(entity =>
            {
                entity.HasKey(e => new { e.Email, e.Subject })
                    .HasName("PK__gradeCol__C78362F3494A794C");

                entity.ToTable("gradeCollege");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Subject)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("subject");

                entity.Property(e => e.Grade)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("grade");

                entity.HasOne(d => d.EmailNavigation)
                    .WithMany(p => p.GradeColleges)
                    .HasForeignKey(d => d.Email)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_email");
            });

            modelBuilder.Entity<StudentCollege>(entity =>
            {
                entity.HasKey(e => e.Email)
                    .HasName("PK__studentC__AB6E6165EC426050");

                entity.ToTable("studentCollege");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("address");

                entity.Property(e => e.Batch).HasColumnName("batch");

                entity.Property(e => e.Birthdate)
                    .HasColumnType("date")
                    .HasColumnName("birthdate");

                entity.Property(e => e.Cgpa)
                    .HasColumnType("decimal(4, 2)")
                    .HasColumnName("CGPA");

                entity.Property(e => e.Degree)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("degree");

                entity.Property(e => e.Department)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("department");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Rollno).HasColumnName("rollno");
            });

            modelBuilder.Entity<UserCollege>(entity =>
            {
                entity.HasKey(e => e.Email)
                    .HasName("PK__userColl__AB6E6165A4C62A7A");

                entity.ToTable("userCollege");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("name");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("password");

                entity.Property(e => e.Phone)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("phone");

                entity.Property(e => e.Type)
                    .HasMaxLength(255)
                    .IsUnicode(false)
                    .HasColumnName("type");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
