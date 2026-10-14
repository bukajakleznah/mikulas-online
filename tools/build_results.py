#!/usr/bin/env python3
"""Vyrobí public/data/results-<rok>.json a results-index.json z exportů data/raw/<rok>.csv
(export z rbr.onlineracing.cz, středník, jeden řádek = jezdec × RZ).

Pravidla: RZ je dojetá při trackprogress 100 a čase > 0; v cíli = dojel všechny RZ.
Třídy se berou z data/car-classes.json (vůz -> třída, upravitelné ručně).
Celkový čas = součet časů RZ (čas RZ už penalizaci obsahuje, 'pen' je jen informativní).
Ověřeno proti oficiálním výsledkům 2020 (např. Bujáček 17:12,96 vč. 30 s penalizace).
Nový ročník: nahrát data/raw/<rok>.csv, přidat rok do YEARS a spustit  python3 tools/build_results.py
"""
import csv, json, os, collections, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
YEARS = [2020, 2021, 2022, 2024, 2025]
CLASS_ORDER = ['RC1', 'RC2', 'RGT', 'RC3', 'RC4', 'RC5', 'WRC', 'H/B', 'H/A', 'H/4', 'H/2']
STAGE_NAMES = {
    'Dostihovka': 'Dostihovka',
    'Fagus Lipa': 'Fagus – Lípa',
    'Dostihovka final stage': 'Dostihovka final stage',
    'Slusovice RS': 'Slušovice RS',
    'Neubuz - Slusovice': 'Neubuz – Slušovice',
}

def build(year, classes):
    rows = list(csv.DictReader(open(os.path.join(ROOT, 'data/raw/%d.csv' % year), encoding='utf-8'), delimiter=';'))
    stages = {}
    for r in rows:
        stages[int(r['stage_pos'])] = STAGE_NAMES.get(r['stagename'], r['stagename'])
    order = sorted(stages)
    drivers = collections.OrderedDict()
    for r in rows:
        d = drivers.setdefault(r['user_name'], {'n': r['user_name'], 'cc': r['country'], 'car': r['car'],
                                                'cl': classes.get(r['car'], ''), 'st': {}})
        t = float(r['time3'])
        if t > 0 and r['trackprogress'] == '100':
            d['st'][int(r['stage_pos'])] = round(t, 3)
        if not d['cl']:
            print('!! bez třídy:', r['car'])
    out_d, fin = [], []
    for d in drivers.values():
        st = [d['st'].get(i) for i in order]
        out_d.append({'n': d['n'], 'cc': d['cc'], 'car': d['car'], 'cl': d['cl'], 'st': st})
        if all(x is not None for x in st):
            fin.append({'pos': 0, 'name': d['n'], 'cc': d['cc'], 'car': d['car'], 'total': round(sum(st), 3)})
    fin.sort(key=lambda x: x['total'])
    for n, x in enumerate(fin, 1):
        x['pos'] = n
    cls = sorted({d['cl'] for d in out_d if d['cl']}, key=lambda c: CLASS_ORDER.index(c) if c in CLASS_ORDER else 99)
    return {'year': year, 'stages': [stages[i] for i in order], 'drivers': len(out_d), 'finished': len(fin), 'classes': cls, 'd': out_d}, fin

def main():
    os.makedirs(os.path.join(ROOT, 'public/data'), exist_ok=True)
    classes = json.load(open(os.path.join(ROOT, 'data/car-classes.json'), encoding='utf-8'))
    index = {}
    for y in YEARS:
        o, fin = build(y, classes)
        with open(os.path.join(ROOT, 'public/data/results-%d.json' % y), 'w', encoding='utf-8') as f:
            json.dump(o, f, ensure_ascii=False, separators=(',', ':'))
        index[y] = {'drivers': o['drivers'], 'finished': o['finished'], 'stages': len(o['stages']),
                    'podium': [{k: x[k] for k in ('pos', 'name', 'cc', 'car', 'total')} for x in fin[:3]]}
        print(y, o['drivers'], 'jezdců', o['finished'], 'v cíli', fin[0]['name'], fin[0]['total'], o['classes'])
    with open(os.path.join(ROOT, 'public/data/results-index.json'), 'w', encoding='utf-8') as f:
        json.dump(index, f, ensure_ascii=False, separators=(',', ':'))

if __name__ == '__main__':
    main()
