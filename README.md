# Análise de Apartamentos para Aluguel

Extraído em 16/03/2025 a partir de republicare.com.br e auxiliadorapredial.com.br.

## Estrutura

- **apartamentos.json** – Dados consolidados de todos os imóveis
- **lista-de-apartamentos.md** – Lista original de URLs
- **{ref}/** – Pasta por imóvel com dados.md e imagens

## Imagens

As imagens da Auxiliadora Predial são carregadas dinamicamente. O apartamento **383167** já tem imagens extraídas e salvas em `383167/images/`.

Para extrair imagens dos demais imóveis:

```bash
cd vibes/memory/analysis/apartamentos
npm install
npx playwright install chromium   # só na primeira vez
npm run extrair-imagens
```
