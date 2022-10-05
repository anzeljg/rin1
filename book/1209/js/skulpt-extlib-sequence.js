// External library: povezaniSeznam.py
Sk.builtinFiles["files"]["src/lib/povezaniSeznam.py"] = "def Ustvari():\n    return [[0, 0, 0]]\n\ndef SteviloElementov(povSeznam):\n    return povSeznam[0][0]\n\ndef IndeksZacetnega(povSeznam):\n    return povSeznam[0][1]\n\ndef IndeksNaslednika(povSeznam, indeks):\n    return povSeznam[indeks][1]\n\ndef IndeksKoncnega(povSeznam):\n    return povSeznam[0][2]\n\ndef IndeksPredhodnika(povSeznam, indeks):\n    return povSeznam[indeks][2]\n\ndef Element(povSeznam, indeks):\n    return povSeznam[indeks][0]\n\ndef DodajNaKonec(povSeznam, element):\n    iPrejKoncnega = povSeznam[0][2]\n    iDodanega = len(povSeznam)\n    povSeznam.append([element, 0, iPrejKoncnega])\n    povSeznam[iPrejKoncnega][1] = iDodanega\n    povSeznam[0][2] = iDodanega\n    povSeznam[0][0] += 1\n\ndef Vstavi(povSeznam, indeks, element):\n    iNasled = indeks\n    iPredhod = povSeznam[indeks][2]\n    iDodanega = len(povSeznam)\n    povSeznam.append([element, iNasled, iPredhod])\n    povSeznam[iPredhod][1] = iDodanega\n    povSeznam[iNasled][2] = iDodanega\n    povSeznam[0][0] += 1\n\ndef DodajNaZacetek(povSeznam, element):\n    iZacetnega = IndeksZacetnega(povSeznam)\n    Vstavi(povSeznam, iZacetnega, element)\n\ndef Izloci(povSeznam, indeks):\n    iNasled = povSeznam[indeks][1]\n    iPredhod = povSeznam[indeks][2]\n    povSeznam[iPredhod][1] = iNasled\n    povSeznam[iNasled][2] = iPredhod\n    povSeznam[0][0] -= 1\n\ndef IzlociZacetnega(povSeznam):\n    Izloci(povSeznam, IndeksZacetnega(povSeznam))\n\ndef IzlociKoncnega(povSeznam):\n    Izloci(povSeznam, IndeksKoncnega(povSeznam))\n\ndef Zaporedje(povSeznam):\n    indeks = IndeksZacetnega(povSeznam)\n    elementi = []\n    while indeks != 0:\n        elementi.append(Element(povSeznam, indeks))\n        indeks = IndeksNaslednika(povSeznam, indeks)\n    return elementi\n\ndef ZaporedjeNazaj(povSeznam):\n    indeks = IndeksKoncnega(povSeznam)\n    elementi = []\n    while indeks != 0:\n        elementi.append(Element(povSeznam, indeks))\n        indeks = IndeksPredhodnika(povSeznam, indeks)\n    return elementi\n\ndef IzpisiVse(povSeznam):\n    print(povSeznam)\n    opis = 'Zaporedje od za\u010Detka do konca: '\n    print(opis + str(Zaporedje(povSeznam)))\n    opis = 'Zaporedje od konca do za\u010Detka: '\n    print(opis + str(ZaporedjeNazaj(povSeznam)))\n\ndef main():\n    print('Ustvarimo novo zaporedje ...')\n    ps = Ustvari()\n    IzpisiVse(ps)\n    print('')\n    print('Dodamo A na konec ...')\n    DodajNaKonec(ps, 'A')\n    IzpisiVse(ps)\n    print('')\n    print('Dodamo Z na za\u010Detek ...')\n    DodajNaZacetek(ps, 'Z')\n    IzpisiVse(ps)\n    print('')\n    print('Dodamo M na za\u010Detek ...')\n    DodajNaZacetek(ps, 'M')\n    IzpisiVse(ps)\n    print('')\n    print('Vstavimo I pred Z ...')\n    indeks = IndeksZacetnega(ps)\n    indeks = IndeksNaslednika(ps, indeks)\n    Vstavi(ps, indeks, 'I')\n    IzpisiVse(ps)\n    print('')\n    print('Vstavimo N pred A ...')\n    indeks = IndeksKoncnega(ps)\n    Vstavi(ps, indeks, 'N')\n    IzpisiVse(ps)\n    print('')\n    print('Izlo\u010Dimo N ...')\n    indeks = IndeksKoncnega(ps)\n    indeks = IndeksPredhodnika(ps, indeks)\n    Izloci(ps, indeks)\n    IzpisiVse(ps)\n    print('')\n    print('Izlo\u010Dimo Z ...')\n    indeks = IndeksKoncnega(ps)\n    indeks = IndeksPredhodnika(ps, indeks)\n    Izloci(ps, indeks)\n    IzpisiVse(ps)\n    print('')\n    print('Izlo\u010Dimo za\u010Detni element ...')\n    IzlociZacetnega(ps)\n    IzpisiVse(ps)\n    print('')\n    print('Izlo\u010Dimo kon\u010Dni element ...')\n    IzlociKoncnega(ps)\n    IzpisiVse(ps)\n    print('')\n    print('Izlo\u010Dimo za\u010Detni element ...')\n    IzlociZacetnega(ps)\n    IzpisiVse(ps)\n\nif __name__ == '__main__':\n    main()";

// External library: sklad.py
Sk.builtinFiles["files"]["src/lib/sklad.py"] = "def Ustvari():\n  return []\n\ndef Dodaj(sklad, element):\n  sklad.append(element)\n\ndef Odvzemi(sklad):\n  element = sklad.pop()\n  return element\n\ndef JePrazen(sklad):\n  return (len(sklad) == 0)\n\ndef Izpisi(sklad):\n  print(sklad)\n\ndef main():\n  sklad = Ustvari()\n\n  print('Dodamo A na sklad ...')\n  Dodaj(sklad, 'A')\n  print(sklad)\n\n  print('Dodamo B na sklad ...')\n  Dodaj(sklad, 'B')\n  print(sklad)\n\n  print('Dodamo C na sklad ...')\n  Dodaj(sklad, 'C')\n  print(sklad)\n\n  if JePrazen(sklad):\n    print('Sklad je prazen.')\n  else:\n    print('Sklad ni prazen.')\n\n  print('')\n  print('Odvzamemo element s sklada ...')\n  Odvzemi(sklad)\n  print(sklad)\n\n  print('Odvzamemo element s sklada ...')\n  Odvzemi(sklad)\n  print(sklad)\n\n  print('Odvzamemo element s sklada ...')\n  Odvzemi(sklad)\n  print(sklad)\n\n  if JePrazen(sklad):\n    print('Sklad je prazen.')\n  else:\n    print('Sklad ni prazen.')\n\nif __name__ == '__main__':\n  main()";

// External library: vrsta.py
Sk.builtinFiles["files"]["src/lib/vrsta.py"] = "import povezaniSeznam as sez\n\ndef Ustvari():\n  return sez.Ustvari()\n\ndef Dodaj(vrsta, element):\n  sez.DodajNaKonec(vrsta, element)\n\ndef Odvzemi(vrsta):\n  indeks = sez.IndeksZacetnega(vrsta)\n  element = sez.Element(vrsta, indeks)\n  sez.IzlociZacetnega(vrsta)\n  return element\n\ndef JePrazna(vrsta):\n  return (sez.SteviloElementov(vrsta) == 0)\n\ndef Izpisi(vrsta):\n  print(sez.Zaporedje(vrsta))\n\ndef Vrni(vrsta):\n return sez.Zaporedje(vrsta)\n\ndef main():\n  vrsta = Ustvari()\n\n  print('Dodamo A v vrsto ...')\n  Dodaj(vrsta, 'A')\n  Izpisi(vrsta)\n\n  print('Dodamo B v vrsto ...')\n  Dodaj(vrsta, 'B')\n  Izpisi(vrsta)\n\n  print('Dodamo C v vrsto ...')\n  Dodaj(vrsta, 'C')\n  Izpisi(vrsta)\n\n  if JePrazna(vrsta):\n    print('Vrsta je prazna.')\n  else:\n    print('Vrsta ni prazna.')\n\n  print('')\n  print('Odvzamemo element iz vrste ...')\n  Odvzemi(vrsta)\n  Izpisi(vrsta)\n\n  print('Odvzamemo element iz vrste ...')\n  Odvzemi(vrsta)\n  Izpisi(vrsta)\n\n  print('Odvzamemo element iz vrste ...')\n  Odvzemi(vrsta)\n  Izpisi(vrsta)\n\n  if JePrazna(vrsta):\n    print('Vrsta je prazna.')\n  else:\n    print('Vrsta ni prazna.')\n\nif __name__ == '__main__':\n  main()";