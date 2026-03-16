#!/usr/bin/env node
/**
 * Script para extrair imagens dos apartamentos da Auxiliadora Predial.
 * Uso: node extrair-imagens.mjs
 * Requer: npx playwright install chromium (primeira vez)
 */
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = __dirname;

async function main() {
  let playwright;
  try {
    playwright = await import('playwright');
  } catch (e) {
    console.error('Instale o Playwright: npx playwright install chromium');
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(join(BASE, 'apartamentos.json'), 'utf-8'));
  const aux = data.apartamentos.filter(a => a.fonte === 'auxiliadorapredial' && a.id !== '383167');

  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext();

  for (const apt of aux) {
    const ref = apt.id;
    const url = apt.url;
    const imgDir = join(BASE, ref, 'images');
    mkdirSync(imgDir, { recursive: true });

    const page = await context.newPage();
    const imageUrls = [];

    page.on('response', async (response) => {
      const respUrl = response.url();
      if (respUrl.includes('img.auxiliadorapredial.com.br') && respUrl.includes(ref)) {
        imageUrls.push(respUrl);
      }
    });

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(2000);
    } catch (e) {
      console.warn(`[${ref}] Erro ao carregar: ${e.message}`);
    }
    await page.close();

    const unique = [...new Set(imageUrls)];
    for (let i = 0; i < unique.length; i++) {
      const u = unique[i];
      const fn = u.split('/').pop() || `img-${i + 1}.jpg`;
      const outPath = join(imgDir, fn);
      try {
        const res = await fetch(u);
        const buf = await res.arrayBuffer();
        const { writeFileSync } = await import('fs');
        writeFileSync(outPath, Buffer.from(buf));
        console.log(`  [${ref}] Salvou: ${fn}`);
      } catch (e) {
        console.warn(`  [${ref}] Erro ao baixar ${fn}: ${e.message}`);
      }
    }
    if (unique.length > 0) {
      console.log(`[${ref}] ${unique.length} imagens extraídas`);
    }
  }

  await browser.close();
  console.log('Concluído.');
}

main().catch(console.error);
