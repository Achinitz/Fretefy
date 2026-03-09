using Fretefy.Test.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fretefy.Test.Domain.Interfaces.Repositories
{
    public interface IRegiaoRepository
    {
        Task<IEnumerable<Regiao>> Listar();
        Task<Regiao> ObterPorId(Guid id);
        Task<Regiao> ObterPorNome(string nome);
        Task Salvar(Regiao regiao);
        Task Atualizar(Regiao regiao);


        Task<int> ContarTotalRegioes();
        Task<int> ContarRegioesAtivas();
        Task<int> SomarTotalCidadesNasRegioes();

    }
}
