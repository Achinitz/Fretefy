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
            RegiaoId = regiaoId;
            CidadeId = cidadeId;
        }

        public Guid Id { get; set; }
        public int RegiaoId { get; set; }
        public int CidadeId { get; set; }

        public virtual Regiao Regiao { get; set; }
        public virtual Cidade Cidade { get; set; }

    }
    }
}
