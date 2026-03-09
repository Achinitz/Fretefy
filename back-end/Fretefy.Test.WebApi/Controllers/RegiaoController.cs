using Fretefy.Test.Domain.Entities;
using Fretefy.Test.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Fretefy.Test.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegiaoController : ControllerBase
    {
        private readonly IRegiaoService _regiaoService;
        
        public RegiaoController(IRegiaoService regiaoService)
        {
            _regiaoService = regiaoService;
        }

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            try
            {
                var regioes = await _regiaoService.Listar();
                return Ok(regioes);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Erro ao buscar regiões." });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Salvar([FromBody] Regiao regiao)
        {
            try
            {                
                await _regiaoService.Salvar(regiao);
                return Ok(new { message = "Região cadastrada com sucesso!" });
            }
            catch (Exception ex)
            {                
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> AlterarStatus(Guid id)
        {
            try
            {
                await _regiaoService.AlterarStatus(id);
                return Ok(new { message = "Status alterado com sucesso." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Erro ao alterar status." });
            }
        }

        [HttpGet("resumo")]
        public async Task<IActionResult> ObterResumo()
        {
            var resumo = await _regiaoService.ObterResumoPainel();
            return Ok(resumo);
        }

    }
}