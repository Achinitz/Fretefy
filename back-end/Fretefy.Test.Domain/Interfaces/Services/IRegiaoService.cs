using Fretefy.Test.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fretefy.Test.Domain.Interfaces.Services
{
    public interface IRegiaoService
    {
        Task<IEnumerable<Regiao>> Listar();
        Task Salvar(Regiao regiao);
        Task AlterarStatus(Guid id);

        Task<object> ObterResumoPainel();

        Task Atualizar(Regiao regiao);
    }
}
