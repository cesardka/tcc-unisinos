"""Análise descritiva do questionário com frequentadores (Seção 3.5 do TCC).

Uso:
    python3 analysis/analise_questionario.py caminho/para/respostas.csv

Lê o CSV exportado do Google Forms, imprime o relatório no terminal e grava
tabelas LaTeX com dados agregados em analysis/tabelas/. O CSV com respostas
individuais nunca deve ser copiado para o repositório.
"""

import csv
import statistics as st
import sys
from collections import Counter
from pathlib import Path

LIKERT = {
    'PE1': 'mais prático que o cardápio físico',
    'PE2': 'escolher meu pedido mais rapidamente',
    'EE1': 'fácil aprender a usar',
    'EE2': 'dificuldade de ler ou navegar',
    'SI1': 'Pessoas próximas a mim',
    'SI2': 'Avaliações em redes sociais',
    'FC1': 'conexão de internet adequada',
    'FC2': 'Quando preciso de ajuda',
    'HM1': 'prazeroso explorar',
    'HM2': 'atrapalha a experiência social',
    'PV1': 'dados móveis e meu tempo',
    'PV2': 'pedir ou gastar mais',
    'HB1': 'hábito automático',
    'HB2': 'sem precisar pensar muito',
    'BI1': 'continuar usando',
    'BI2': 'Recomendaria a um amigo',
    'TRU': 'Confio nos preços',
    'PRI': 'proteção dos meus dados',
    'SOC': 'falta da interação com o garçom',
}
INVERTIDOS = {'EE2', 'HM2', 'PV2'}
CONSTRUTOS = {
    'PE': 'Expectativa de desempenho',
    'EE': 'Expectativa de esforço',
    'SI': 'Influência social',
    'FC': 'Condições facilitadoras',
    'HM': 'Motivação hedônica',
    'PV': 'Valor',
    'HB': 'Hábito',
    'BI': 'Intenção comportamental',
}
EXTENSOES = {'TRU': 'Confiança', 'PRI': 'Privacidade', 'SOC': 'Experiência social'}

PERGUNTAS = {
    'consentimento': 'Termo de Consentimento',
    'idade': 'Faixa etária',
    'poa': 'Porto Alegre ou na região metropolitana',
    'genero': 'Gênero',
    'escolaridade': 'Escolaridade',
    'frequencia': 'Com que frequência você vai',
    'tipo': 'Que tipo de estabelecimento',
    'deficiencia': 'deficiência ou dificuldade',
    'exposicao': 'Nos últimos 12 meses',
    'preferencia': 'qual é a sua preferência',
    'frustracao': 'desistiu de pedir',
    'frustracao_relato': 'conte brevemente',
    'problemas': 'enfrentou algum destes problemas',
    'melhor': 'funciona melhor',
    'pior': 'funciona pior',
    'vieram_ficar': 'vieram para ficar',
    'adotaria': 'adotaria cardápio digital',
    'porque': 'Por quê?',
    'comentarios': 'Há algo mais',
}
PROBLEMAS = [
    'Layout confuso ou difícil de ler',
    'Falha ao escanear o QR Code ou abrir o cardápio',
    'Página ou interface não carregou (internet lenta ou Wi-Fi indisponível)',
    'Precisei fazer cadastro ou informar dados pessoais para ver o cardápio ou pedir',
    'Tela do tablet ou totem não respondeu ao toque',
    'Falta de opção de acessibilidade (tamanho de fonte, contraste)',
    'Preço ou informação desatualizados',
    'Nenhum desses',
]
DEFICIENCIAS = ['Visual', 'Motora', 'De leitura', 'Nenhuma', 'Prefiro não responder']
FAIXAS = ['18 a 24', '25 a 34', '35 a 44', '45 a 54', '55 ou mais']


def localizar_colunas(cabecalho):
    col = {}
    for chave, trecho in PERGUNTAS.items():
        col[chave] = next(i for i, c in enumerate(cabecalho) if trecho in c and '[' not in c)
    for codigo, trecho in LIKERT.items():
        col[codigo] = next(i for i, c in enumerate(cabecalho) if '[' in c and trecho in c)
    return col


def multipla(valor, opcoes):
    """Separa respostas de marcação múltipla sem quebrar opções que contêm vírgula."""
    marcadas = [o for o in opcoes if o in valor]
    resto = valor
    for o in marcadas:
        resto = resto.replace(o, '')
    outros = [p.strip() for p in resto.split(',') if p.strip()]
    return marcadas, outros


def pct(n, total):
    return 100 * n / total if total else 0.0


def spearman(a, b):
    def postos(x):
        ordem = sorted(range(len(x)), key=lambda i: x[i])
        r = [0.0] * len(x)
        i = 0
        while i < len(x):
            j = i
            while j + 1 < len(x) and x[ordem[j + 1]] == x[ordem[i]]:
                j += 1
            for k in range(i, j + 1):
                r[ordem[k]] = (i + j) / 2 + 1
            i = j + 1
        return r
    return pearson(postos(a), postos(b))


def pearson(a, b):
    ma, mb = st.mean(a), st.mean(b)
    num = sum((x - ma) * (y - mb) for x, y in zip(a, b))
    den = (sum((x - ma) ** 2 for x in a) * sum((y - mb) ** 2 for y in b)) ** 0.5
    return num / den if den else float('nan')


class Base:
    def __init__(self, linhas, col):
        self.linhas, self.col = linhas, col

    def __len__(self):
        return len(self.linhas)

    def valores(self, chave):
        return [r[self.col[chave]].strip() for r in self.linhas]

    def expostos(self):
        """Exclui quem nunca encontrou cardápios digitais, que não deveria avaliar as afirmações."""
        return self.filtrar(lambda r: r[self.col['exposicao']].strip() != 'Nunca')

    def likert(self, codigo):
        """Valores 1 a 5, já recodificados nos itens invertidos (alto = favorável ao digital)."""
        out = []
        for r in self.expostos().linhas:
            v = r[self.col[codigo]].strip()
            if v[:1].isdigit():
                x = int(v[0])
                out.append(6 - x if codigo in INVERTIDOS else x)
        return out

    def escore(self, construto):
        a, b = self.likert(construto + '1'), self.likert(construto + '2')
        return [(x + y) / 2 for x, y in zip(a, b)]

    def filtrar(self, cond):
        return Base([r for r in self.linhas if cond(r)], self.col)


def frequencias(base, chave, ordem=None):
    c = Counter(base.valores(chave))
    chaves = ordem or [k for k, _ in c.most_common()]
    return [(k, c.get(k, 0), pct(c.get(k, 0), len(base))) for k in chaves if c.get(k, 0) or ordem]


def resumo_item(v):
    return {
        'n': len(v),
        'media': st.mean(v),
        'mediana': st.median(v),
        'dp': st.stdev(v) if len(v) > 1 else 0.0,
        'concordancia': pct(sum(x >= 4 for x in v), len(v)),
    }


def relatorio(total, poa):
    print(f'Respostas válidas (com consentimento): {len(total)}')
    print(f'  Porto Alegre e região metropolitana: {len(poa)}')
    print(f'  Outras localidades: {len(total) - len(poa)}')
    nunca = sum(v == 'Nunca' for v in total.valores('exposicao'))
    print(f'  Nunca encontraram cardápios digitais: {nunca}')

    for nome, base in [('BASE PRINCIPAL (POA + RM)', poa), ('AMOSTRA TOTAL', total)]:
        exp = base.expostos()
        print(f'\n{"=" * 70}\n{nome}, n = {len(base)} (expostos a cardápios digitais: {len(exp)})\n{"=" * 70}')
        for chave, ordem in [('idade', FAIXAS), ('genero', None), ('escolaridade', None),
                             ('frequencia', None), ('tipo', None), ('exposicao', None),
                             ('preferencia', None), ('vieram_ficar', None), ('adotaria', None)]:
            print(f'\n# {PERGUNTAS[chave]}')
            for k, n, p in frequencias(base, chave, ordem):
                print(f'  {n:3d}  {p:5.1f}%  {k}')
        print(f'\n# {PERGUNTAS["frustracao"]} (somente expostos)')
        for k, n, p in frequencias(exp, 'frustracao'):
            print(f'  {n:3d}  {p:5.1f}%  {k}')

        print('\n# Deficiência ou dificuldade (marcação múltipla)')
        c = Counter()
        for v in base.valores('deficiencia'):
            c.update(multipla(v, DEFICIENCIAS)[0])
        for o in DEFICIENCIAS:
            print(f'  {c[o]:3d}  {pct(c[o], len(base)):5.1f}%  {o}')

        print('\n# Problemas técnicos (marcação múltipla, somente expostos)')
        c, outros = Counter(), []
        for v in exp.valores('problemas'):
            m, o = multipla(v, PROBLEMAS)
            c.update(m)
            outros += o
        for o in PROBLEMAS:
            print(f'  {c[o]:3d}  {pct(c[o], len(exp)):5.1f}%  {o}')
        for o in outros:
            print(f'        outro: {o}')

        print('\n# Itens Likert (invertidos recodificados; alto = favorável ao digital)')
        print(f'  {"item":5} {"n":>3} {"média":>6} {"med":>4} {"dp":>5} {"%4-5":>6}')
        for codigo in LIKERT:
            s = resumo_item(base.likert(codigo))
            print(f'  {codigo:5} {s["n"]:3d} {s["media"]:6.2f} {s["mediana"]:4.1f} {s["dp"]:5.2f} {s["concordancia"]:5.1f}%')

        print('\n# Construtos (média dos dois itens) e correlação entre os itens')
        for k, nome_c in CONSTRUTOS.items():
            e = base.escore(k)
            r = pearson(base.likert(k + '1'), base.likert(k + '2'))
            print(f'  {k}  média {st.mean(e):.2f}  dp {st.stdev(e):.2f}  r(itens) {r:+.2f}  {nome_c}')

        print('\n# Correlação de Spearman de cada construto com a intenção (BI)')
        bi = base.escore('BI')
        for k in CONSTRUTOS:
            if k != 'BI':
                print(f'  {k} x BI  rho = {spearman(base.escore(k), bi):+.2f}')

    print(f'\n{"=" * 70}\nCRUZAMENTOS (base principal)\n{"=" * 70}')
    grupos = {
        '18 a 34': poa.filtrar(lambda r: r[poa.col['idade']] in ('18 a 24', '25 a 34')),
        '35 ou mais': poa.filtrar(lambda r: r[poa.col['idade']] in ('35 a 44', '45 a 54', '55 ou mais')),
    }
    cruzar('Faixa etária', grupos)
    grupos = {
        'POA + RM': poa,
        'Outras': total.filtrar(lambda r: r[total.col['poa']] != 'Sim'),
    }
    cruzar('Localidade (amostra total)', grupos)

    print(f'\n{"=" * 70}\nRESPOSTAS ABERTAS (amostra total)\n{"=" * 70}')
    for chave in ['frustracao_relato', 'melhor', 'pior', 'porque', 'comentarios']:
        textos = [v for v in total.valores(chave) if v]
        print(f'\n# {PERGUNTAS[chave]} ({len(textos)} respostas)')
        for t in textos:
            print('  -', t.replace('\n', ' '))


def cruzar(titulo, grupos):
    print(f'\n# {titulo}')
    for nome, base in grupos.items():
        pref = Counter(base.valores('preferencia'))
        esc = '  '.join(f'{k} {st.mean(base.escore(k)):.2f}' for k in CONSTRUTOS)
        print(f'  {nome:10} n={len(base):3d}  físico {pct(pref["Cardápio físico"], len(base)):5.1f}%  '
              f'digital {pct(pref["Cardápio digital"], len(base)):5.1f}%  '
              f'indiferente {pct(pref["Indiferente"], len(base)):5.1f}%')
        print(f'  {"":10} {esc}')


def fmt(x, casas=2):
    return f'{x:.{casas}f}'.replace('.', ',')


def tabelas_latex(poa, destino):
    destino.mkdir(parents=True, exist_ok=True)

    linhas = []
    for chave, rotulo, ordem in [('idade', 'Faixa etária', FAIXAS), ('genero', 'Gênero', None),
                                 ('escolaridade', 'Escolaridade', None),
                                 ('frequencia', 'Frequência de ida', None)]:
        linhas.append(f'\\multicolumn{{3}}{{l}}{{\\textit{{{rotulo}}}}} \\\\')
        for k, n, p in frequencias(poa, chave, ordem):
            linhas.append(f'\\quad {k or "Não informado"} & {n} & {fmt(p, 1)} \\\\')
    (destino / 'perfil.tex').write_text('\n'.join(linhas) + '\n', encoding='utf-8')

    linhas = []
    for k, nome in CONSTRUTOS.items():
        e = poa.escore(k)
        r = pearson(poa.likert(k + '1'), poa.likert(k + '2'))
        conc = pct(sum(x >= 4 for x in e), len(e))
        linhas.append(f'{nome} ({k}) & {fmt(st.mean(e))} & {fmt(st.median(e), 1)} & {fmt(st.stdev(e))} & '
                      f'{fmt(conc, 1)} & {fmt(r)} \\\\')
    linhas.append('\\midrule')
    for k, nome in EXTENSOES.items():
        s = resumo_item(poa.likert(k))
        linhas.append(f'{nome} ({k}) & {fmt(s["media"])} & {fmt(s["mediana"], 1)} & {fmt(s["dp"])} & '
                      f'{fmt(s["concordancia"], 1)} & --- \\\\')
    (destino / 'construtos.tex').write_text('\n'.join(linhas) + '\n', encoding='utf-8')

    exp = poa.expostos()
    c = Counter()
    for v in exp.valores('problemas'):
        c.update(multipla(v, PROBLEMAS)[0])
    linhas = [f'{o} & {c[o]} & {fmt(pct(c[o], len(exp)), 1)} \\\\'
              for o in sorted(PROBLEMAS, key=lambda o: -c[o])]
    (destino / 'problemas.tex').write_text('\n'.join(linhas) + '\n', encoding='utf-8')


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    with open(sys.argv[1], encoding='utf-8') as f:
        linhas = list(csv.reader(f))
    col = localizar_colunas(linhas[0])
    total = Base([r for r in linhas[1:] if r[col['consentimento']].startswith('Li, concordo')], col)
    poa = total.filtrar(lambda r: r[col['poa']] == 'Sim')
    relatorio(total, poa)
    tabelas_latex(poa, Path(__file__).parent / 'tabelas')


if __name__ == '__main__':
    main()
