using Fretefy.Test.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Fretefy.Test.Infra.EntityFramework.Mappings
{
    public class RegiaoMap : IEntityTypeConfiguration<Regiao>
    {
        public void Configure(EntityTypeBuilder<Regiao> builder)
        {
            builder.ToTable("Regiao");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.IdRegiao)
                   .HasMaxLength(50);

            builder.Property(p => p.Nome)
                   .HasMaxLength(100)
                   .IsRequired();

            builder.Property(p => p.Status)
                   .IsRequired();

            builder.HasMany(p => p.RegiaoCidades)
                   .WithOne(p => p.Regiao)
                   .HasForeignKey(p => p.RegiaoId)
                   .OnDelete(DeleteBehavior.Cascade);

        }
    }
}