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

        public Regiao(int id, string nome, bool status) : this()
        {
            Id = id;
            Nome = nome;
            Status = status;
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public bool Status { get; set; }

        public virtual ICollection<RegiaoCidade> RegiaoCidades { get; set; }
    }
}