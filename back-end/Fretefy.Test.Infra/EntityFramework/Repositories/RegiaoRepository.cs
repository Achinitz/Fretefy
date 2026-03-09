using Fretefy.Test.Domain.Entities;
using Fretefy.Test.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fretefy.Test.Infra.EntityFramework.Repositories
{
    public class RegiaoRepository : IRegiaoRepository
    {
        private readonly TestDbContext _context;

        public RegiaoRepository(TestDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Regiao>> Listar()
        {
            return await _context.Regiao
                .Include(x => x.RegiaoCidades)
                .ThenInclude(x => x.Cidade)
                .ToListAsync();
        }

        public async Task<Regiao> ObterPorId(Guid id)
        {
            return await _context.Regiao.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Salvar(Regiao regiao)
        {
            await _context.Regiao.AddAsync(regiao);
            await _context.SaveChangesAsync();
        }

        public async Task Atualizar(Regiao regiao)
        {
            _context.Regiao.Update(regiao);
            await _context.SaveChangesAsync();
        }

        public async Task<Regiao> ObterPorNome(string nome)
        {            
            return await _context.Regiao
                .FirstOrDefaultAsync(x => x.Nome.ToLower() == nome.ToLower());
        }

        public async Task<int> ContarTotalRegioes()
        {
            return await _context.Regiao.CountAsync();
        }

        public async Task<int> ContarRegioesAtivas()
        {
            return await _context.Regiao.CountAsync(x => x.Status);
        }

        public async Task<int> SomarTotalCidadesNasRegioes()
        {
            return await _context.RegiaoCidade.CountAsync();
        }
    }
}
