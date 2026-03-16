# Análise de Apartamentos para Aluguel — Porto Alegre

Extração, consolidação e análise de **21 imóveis** para aluguel em regiões centrais de Porto Alegre. Dados coletados em **16/03/2025** a partir da [Auxiliadora Predial](https://www.auxiliadorapredial.com.br).

---

## Destaques do relatório

### Top 3 — Ordenados pelos mais legais

| # | Ref | Bairro | Total/mês | Diferencial |
|---|-----|--------|-----------|-------------|
| 1 | **778979** | Cidade Baixa | R$ 2.826 | Promoção R$ 800 nos 3 primeiros meses; Redenção; portaria 24h |
| 2 | **288435** | Rio Branco | R$ 2.201 | Melhor custo-benefício (R$ 24/m²); 90m²; condomínio R$ 1 |
| 3 | **233858** | Centro Histórico | R$ 2.120 | Menor custo total; Zaffari; sol norte |

### Síntese geral

| Indicador | Valor |
|-----------|-------|
| Faixa de aluguel | R$ 1.690 — R$ 2.600 |
| Faixa total mensal | R$ 2.080 — R$ 3.590 |
| Menor custo total | **233858** — R$ 2.120 (69 m², 2 quartos) |
| Maior área | **414697** — 180 m² (3 quartos, R$ 3.427) |
| Imóveis mobiliados/semi | 8 |
| Imóveis com vaga | 4 |
| Imóveis com suíte | 2 |

### Bairros

- **Centro Histórico** (11) — Comércio, transporte, vida urbana
- **Menino Deus** (7) — Valorizado, orla, shoppings
- **Cidade Baixa** (2) — Vida noturna, Parque da Redenção
- **Rio Branco** (2) — Boa relação preço/área
- **Farroupilha** (1) — Av. João Pessoa

---

## Estrutura do projeto

```
apartamentos/
├── README.md                    # Este arquivo
├── RELATORIO-APARTAMENTOS.md    # Relatório completo com ranking e avaliação comparativa
├── LISTA-IMAGENS.md             # Lista de imagens por imóvel
├── apartamentos.json            # Dados consolidados (21 imóveis)
├── lista-de-apartamentos.md     # Lista original de URLs com checkboxes
├── individuais/                 # Documentação detalhada por imóvel (21 arquivos)
│   ├── 778979.md               # 1º ranking — Cidade Baixa, promoção
│   ├── 288435.md               # 2º — Rio Branco, melhor custo-benefício
│   ├── 233858.md               # 3º — Centro Histórico, menor custo
│   └── ...                     # Um .md completo por apartamento
├── {ref}/                       # Pasta por imóvel (ex: 383167/)
│   ├── dados.md
│   └── images/
│       └── *.jpg
├── extrair-imagens.mjs          # Script para baixar imagens
└── package.json
```

---

## Documentos principais

| Arquivo | Conteúdo |
|---------|----------|
| **RELATORIO-APARTAMENTOS.md** | Síntese executiva, ranking (21 posições), detalhamento por imóvel (1 imagem cada), avaliação comparativa, conclusões |
| **apartamentos.json** | Dados brutos estruturados: endereço, aluguel, total, área, quartos, banheiros, vagas, IPTU, condomínio, descrição |
| **individuais/*.md** | Ficha detalhada de cada apartamento (21 arquivos) |
| **LISTA-IMAGENS.md** | Lista de imagens de cada imóvel (paths relativos) |

### Conteúdo de cada ficha em `individuais/`

Cada `{ref}.md` inclui: tabela resumo (endereço, aluguel, total, área, quartos, banheiros, vagas, IPTU, condomínio, mobiliado), descrição expandida, localização e pontos de interesse, amenidades (imóvel e condomínio), análise com prós e contras, link do anúncio e posição no ranking.

---

## Como usar

### Extrair imagens dos imóveis

```bash
cd vibes/memory/analysis/apartamentos
npm install
npx playwright install chromium   # só na primeira vez
npm run extrair-imagens
```

### Consultar dados

- **Visão consolidada:** `apartamentos.json`
- **Análise e ranking:** `RELATORIO-APARTAMENTOS.md`
- **Detalhes por imóvel:** `individuais/{ref}.md`

---

## Critérios do ranking

Ordenação por score considerando:

- Custo-benefício (R$/m²)
- Área útil
- Amenidades (mobiliado, suíte, vaga, churrasqueira, ar-condicionado)
- Condomínio
- Localização

---

## Fontes

- [Auxiliadora Predial](https://www.auxiliadorapredial.com.br) — 21 imóveis
- Repúblicare — 1 link (timeout na extração)

---

*Última atualização: 16/03/2025*
