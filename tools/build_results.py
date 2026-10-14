#!/usr/bin/env python3
"""Vyrobí public/data/results-<rok>.json a results-index.json z exportů data/raw/<rok>.csv
(export z rbr.onlineracing.cz, středník, jeden řádek = jezdec × RZ).

Pravidla: do cíle = dojel všechny RZ (trackprogress 100, čas > 0).
Celkový čas = součet časů RZ (čas RZ už penalizaci obsahuje, 'pen' je jen informativní).
Ověřeno proti oficiálním výsledkům 2020 (např. Bujáček 17:12,96 vč. 30 s penalizace).
Nový ročník: nahrát data/raw/<rok>.csv, přidat rok do YEARS a spustit  python3 tools/build_results.py
"""
import csv, json, os, collections, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
YEARS = [2020, 2021, 2022, 2024, 2025]
STAGE_NAMES = {
    'Dostihovka': 'Dostihovka',
    'Fagus Lipa': 'Fagus – Lípa',
    'Dostihovka final stage': 'Dostihovka final stage',
    'Slusovice RS': 'Slušovice RS',
    'Neubuz - Slusovice': 'Neubuz – Slušovice',
}

def build(year):
    rows = list(csv.DictReader(open(os.path.join(ROOT, 'data/raw/%d.csv' % year), encoding='utf-8'), delimiter=';'))
    stages = {}
    for r in rows:
        stages[int(r['stage_pos'])] = STAGE_NAMES.get(r['stagename'], r['stagename'])
    order = sorted(stages)
    drivers = collections.OrderedDict()
    for r in rows:
        d = drivers.setdefault(r['user_name'], {'name': r['user_name'], 'cc': r['country'], 'car': r['car'], 't': {}, 'pen': 0.0})
        t = float(r['time3'])
        if t > 0 and r['trackprogress'] == '100':
            i = int(r['stage_pos'])
            d['t'][i] = round(t, 3)
            d['pen'] += max(0.0, float(r['penalty']))
    fin, dnf = [], []
    for d in drivers.values():
        if len(d['t']) == len(order):
            tot = sum(d['t'].values())
            fin.append({'name': d['name'], 'cc': d['cc'], 'car': d['car'], 'total': round(tot, 3), 'pen': round(d['pen'], 3),
                        'st': [d['t'][i] for i in order]})
        else:
            dnf.append({'name': d['name'], 'cc': d['cc'], 'car': d['car'], 'done': len(d['t'])})
    fin.sort(key=lambda x: x['total'])
    for n, x in enumerate(fin, 1):
        x['pos'] = n
    dnf.sort(key=lambda x: (-x['done'], x['name']))
    out = {'year': year, 'stages': [stages[i] for i in order], 'drivers': len(drivers), 'finished': len(fin), 'fin': fin, 'dnf': dnf}
    return out

def main():
    os.makedirs(os.path.join(ROOT, 'public/data'), exist_ok=True)
    index = {}
    for y in YEARS:
        o = build(y)
        with open(os.path.join(ROOT, 'public/data/results-%d.json' % y), 'w', encoding='utf-8') as f:
            json.dump(o, f, ensure_ascii=False, separators=(',', ':'))
        index[y] = {'drivers': o['drivers'], 'finished': o['finished'], 'stages': len(o['stages']),
                    'podium': [{k: x[k] for k in ('pos', 'name', 'cc', 'car', 'total')} for x in o['fin'][:3]]}
        print(y, o['drivers'], 'jezdců', o['finished'], 'v cíli', o['fin'][0]['name'], o['fin'][0]['total'])
    with open(os.path.join(ROOT, 'public/data/results-index.json'), 'w', encoding='utf-8') as f:
        json.dump(index, f, ensure_ascii=False, separators=(',', ':'))

if __name__ == '__main__':
    main()
