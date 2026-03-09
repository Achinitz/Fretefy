using System;


namespace Fretefy.Test.Domain.Entities
{
    public class RegiaoCidade : IEntity
    {

        public RegiaoCidade(){
        }

        public RegiaoCidade(int regiaoId, int cidadeId)
        {
            Id = Guid.NewGuid();
            RegiaoId = Guid.NewGuid();
            CidadeId = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public Guid RegiaoId { get; set; }
        public Guid CidadeId { get; set; }

        public virtual Regiao Regiao { get; set; }
        public virtual Cidade Cidade { get; set; }

    
    }
}
