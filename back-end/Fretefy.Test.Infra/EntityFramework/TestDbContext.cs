using Fretefy.Test.Domain.Entities;
using Fretefy.Test.Infra.EntityFramework.Mappings;
using Microsoft.EntityFrameworkCore;

namespace Fretefy.Test.Infra.EntityFramework
{
    public class TestDbContext : DbContext
    {
        public TestDbContext() { }

        public TestDbContext(DbContextOptions<TestDbContext> options)
            : base(options) { }
        
        public DbSet<Regiao> Regiao { get; set; }
        public DbSet<Cidade> Cidade { get; set; }
        public DbSet<RegiaoCidade> RegiaoCidade { get; set; } 

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new RegiaoMap());
            modelBuilder.ApplyConfiguration(new CidadeMap());
            
            modelBuilder.Entity<RegiaoCidade>(builder =>
            {
                builder.ToTable("RegiaoCidade");
                builder.HasKey(x => x.Id);
                builder.Property(x => x.RegiaoId).IsRequired();
                builder.Property(x => x.CidadeId).IsRequired();

                builder.HasOne(x => x.Regiao)
                       .WithMany(x => x.RegiaoCidades)
                       .HasForeignKey(x => x.RegiaoId);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}