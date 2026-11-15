"""Calcula as medianas das auditorias Lighthouse dos cardápios digitais.

Uso:
    python3 analysis/medianas_lighthouse.py

Lê analysis/auditoria/relatorios/<caso>_<n>.json (três execuções por caso),
imprime medianas, amplitude e coeficiente de variação, e lista as auditorias de
acessibilidade e de cookies de terceiros que falharam.
"""

import json
import statistics as st
from pathlib import Path

PASTA = Path(__file__).parent / 'auditoria' / 'relatorios'
CASOS = ['ohana', 'atelier', 'cortex', 'armazem']
METRICAS = [
    ('performance', 'Desempenho', None),
    ('first-contentful-paint', 'FCP (s)', 1000),
    ('largest-contentful-paint', 'LCP (s)', 1000),
    ('speed-index', 'Speed Index (s)', 1000),
    ('interactive', 'TTI (s)', 1000),
    ('total-blocking-time', 'TBT (ms)', 1),
    ('cumulative-layout-shift', 'CLS', 1),
    ('total-byte-weight', 'Peso (MB)', 1024 * 1024),
]
AUDITORIAS = ['meta-viewport', 'color-contrast', 'landmark-one-main', 'third-party-cookies']


def valor(r, chave, div):
    if chave == 'performance':
        return r['categories']['performance']['score'] * 100
    return r['audits'][chave]['numericValue'] / div


def main():
    for caso in CASOS:
        rs = [json.loads(p.read_text(encoding='utf-8')) for p in sorted(PASTA.glob(f'{caso}_*.json'))]
        print(f'\n== {caso} ({len(rs)} execuções) {rs[0].get("finalDisplayedUrl")}')
        print(f'   Lighthouse {sorted({r["lighthouseVersion"] for r in rs})}, '
              f'{rs[0]["configSettings"]["formFactor"]}, {rs[0]["configSettings"]["throttlingMethod"]}')
        for chave, nome, div in METRICAS:
            v = [valor(r, chave, div) for r in rs]
            cv = st.stdev(v) / st.mean(v) * 100 if len(v) > 1 and st.mean(v) else 0
            print(f'   {nome:16} mediana {st.median(v):8.2f}   faixa {min(v):.2f}–{max(v):.2f}   CV {cv:3.0f}%')
        for cat in ['accessibility', 'best-practices']:
            print(f'   {cat:16} {[round(r["categories"][cat]["score"] * 100) for r in rs]}')
        for a in AUDITORIAS:
            au = rs[0]['audits'].get(a, {})
            n = len(au.get('details', {}).get('items', []))
            estado = 'falhou' if au.get('score') == 0 else 'passou' if au.get('score') == 1 else au.get('scoreDisplayMode')
            print(f'   {a:20} {estado} ({n} itens)')


if __name__ == '__main__':
    main()
