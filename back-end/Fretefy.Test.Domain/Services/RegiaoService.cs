using Fretefy.Test.Domain.Entities;
using Fretefy.Test.Domain.Interfaces.Repositories;
using Fretefy.Test.Domain.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fretefy.Test.Domain.Services
{
    public class RegiaoService : IRegiaoService
    {
        private readonly IRegiaoRepository _repository;

        public RegiaoService(IRegiaoRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Regiao>> Listar() => await _repository.Listar();

        public async Task Salvar(Regiao regiao)
        {            
            var regiaoExistente = await _repository.ObterPorNome(regiao.Nome);
            if (regiaoExistente != null)
                throw new Exception($"A região '{regiao.Nome}' já está cadastrada.");
            
            if (regiao.RegiaoCidades == null || !regiao.RegiaoCidades.Any())
                throw new Exception("Uma região deve conter pelo menos uma cidade.");
            
            if (regiao.Id == Guid.Empty) regiao.Id = Guid.NewGuid();
            regiao.Status = true;
            
            await _repository.Salvar(regiao);
        }

        public async Task AlterarStatus(Guid id)
        {
            var regiao = await _repository.ObterPorId(id);
            if (regiao != null)
            {
                regiao.Status = !regiao.Status;
                await _repository.Atualizar(regiao);
            }
        }

        public async Task<object> ObterResumoPainel()
        {
            var total = await _repository.ContarTotalRegioes();
            var ativas = await _repository.ContarRegioesAtivas();
            var cidades = await _repository.SomarTotalCidadesNasRegioes();

            // Retorna um objeto anônimo que vira JSON automaticamente
            return new
            {
                totalRegioes = total,
                regioesAtivas = ativas,
                cidadesAtendidas = cidades
            };
        }

        public async Task Atualizar(Regiao regiao)
        {
            var existente = await _repository.ObterPorId(regiao.Id);

            if (existente == null)
                throw new Exception("Região não encontrada.");
            
            await _repository.Atualizar(regiao);
        }

    }
}
