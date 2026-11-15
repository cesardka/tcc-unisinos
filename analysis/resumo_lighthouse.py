"""Resume relatórios do Lighthouse (JSON) dos cardápios digitais auditados.

Uso:
    python3 analysis/resumo_lighthouse.py relatorio1.json [relatorio2.json ...]

Imprime pontuações, métricas de carregamento, peso da página e as auditorias
de acessibilidade que falharam, para montar as tabelas do TCC.
"""

import json
import sys
from pathlib import Path

METRICAS = [
    ('first-contentful-paint', 'FCP'),
    ('largest-contentful-paint', 'LCP'),
    ('speed-index', 'Speed Index'),
    ('total-blocking-time', 'TBT'),
    ('cumulative-layout-shift', 'CLS'),
    ('interactive', 'TTI'),
]


def resumir(caminho):
    r = json.loads(Path(caminho).read_text(encoding='utf-8'))
    a = r['audits']
    cfg = r.get('configSettings', {})
    thr = cfg.get('throttling', {})
    print(f'\n{"=" * 70}\n{Path(caminho).name}\n{"=" * 70}')
    print(f'URL final: {r.get("finalDisplayedUrl") or r.get("finalUrl")}')
    print(f'Lighthouse {r.get("lighthouseVersion")} | dispositivo: {cfg.get("formFactor")} | '
          f'throttling: {cfg.get("throttlingMethod")} '
          f'(RTT {thr.get("rttMs")} ms, {thr.get("throughputKbps")} kbps, CPU {thr.get("cpuSlowdownMultiplier")}x)')
    if r.get('runtimeError'):
        print('ERRO:', r['runtimeError'])
    print('Pontuações:', {k: round((v['score'] or 0) * 100) for k, v in r['categories'].items()})
    for chave, nome in METRICAS:
        if chave in a:
            print(f'  {nome:12} {a[chave].get("displayValue", "")}')
    peso = a.get('total-byte-weight', {})
    print(f'  Peso total  {peso.get("displayValue", "")}')
    itens = a.get('network-requests', {}).get('details', {}).get('items', [])
    if itens:
        print(f'  Requisições {len(itens)}')
        por_tipo = {}
        for i in itens:
            t = i.get('resourceType', 'Outro')
            por_tipo[t] = por_tipo.get(t, 0) + (i.get('transferSize') or 0)
        print('  Transferência por tipo (KiB):',
              {k: round(v / 1024) for k, v in sorted(por_tipo.items(), key=lambda x: -x[1])})
    a11y = r['categories'].get('accessibility', {}).get('auditRefs', [])
    falhas = []
    for ref in a11y:
        au = a.get(ref['id'], {})
        if au.get('score') is not None and au['score'] < 1 and au.get('scoreDisplayMode') == 'binary':
            n = len(au.get('details', {}).get('items', []))
            falhas.append((ref['id'], au.get('title', ''), n))
    print(f'  Acessibilidade, auditorias com falha: {len(falhas)}')
    for i, t, n in falhas:
        print(f'    - {i} ({n} elementos): {t}')


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for c in sys.argv[1:]:
        resumir(c)
