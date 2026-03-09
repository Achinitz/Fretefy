using System;
using System.Collections.Generic;

namespace Fretefy.Test.Domain.Entities
{
    public class Regiao
    {
        public Regiao()
        {            
            RegiaoCidades = new List<RegiaoCidade>();
        }

        public Regiao(int idRegiao, string nome, bool status) : this()
        {
            Id = Guid.NewGuid();
            Nome = nome;
            IdRegiao = idRegiao.ToString();
            Status = status;
        }

        public Guid Id { get; set; }
        public string IdRegiao { get; set; }
        public string Nome { get; set; }
        public bool Status { get; set; }

        public virtual ICollection<RegiaoCidade> RegiaoCidades { get; set; }
    }
}