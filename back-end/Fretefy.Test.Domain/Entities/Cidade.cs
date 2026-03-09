using Fretefy.Test.Domain.Entities;
using System;
using System.Collections.Generic;

public class Cidade
{
    public Cidade()
    {
        RegiaoCidades = new List<RegiaoCidade>();
    }

    // Ajuste o construtor para aceitar o ID (seja Guid ou int do IBGE)
    public Cidade(int idCidade, string nome, string uf) : this()
    {
        Id = Guid.NewGuid();
        IdCidade = idCidade;
        Nome = nome;
        UF = uf;
    }

    public Guid Id { get; set; }
    public string Nome { get; set; }
    public int IdCidade { get; set; }
    public string UF { get; set; }

    public virtual ICollection<RegiaoCidade> RegiaoCidades { get; set; }
}