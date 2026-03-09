using Fretefy.Test.Domain.Entities;
using System;
using System.Collections.Generic;

public class Cidade
{
    public Cidade()
    {
        RegiaoCidades = new List<RegiaoCidade>();
    }

    public Cidade(string nome, string uf) : this()
    {
        Id = Guid.NewGuid();
        Nome = nome;
        UF = uf;
    }

    public Guid Id { get; set; }
    public string Nome { get; set; }
    public string UF { get; set; }

    public virtual ICollection<RegiaoCidade> RegiaoCidades { get; set; }
}