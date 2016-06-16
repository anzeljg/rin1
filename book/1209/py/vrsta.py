# Ta modul vsebuje osnovne operacije za delo
# z vrsto. Vrsta je implementirana kot povezani
# seznam.

import povezaniSeznam as sez

# Ustvari in vrne prazno vrsto.
def Ustvari():
  return sez.Ustvari()

# Doda element v vrsto.
def Dodaj(vrsta, element):
  sez.DodajNaKonec(vrsta, element)

# Odvzame element iz vrste in vrne odvzeti
# element.
def Odvzemi(vrsta):
  indeks = sez.IndeksZacetnega(vrsta)
  element = sez.Element(vrsta, indeks)
  sez.IzlociZacetnega(vrsta)
  return element

# Vrne True natanko v primeru, če je vrsta
# prazna.
def JePrazna(vrsta):
  return (sez.SteviloElementov(vrsta) == 0)

# Pomožna funkcija za izpis elementov vrste.
def Izpisi(vrsta):
  print(sez.Zaporedje(vrsta))

# Pomožna funkcija, ki vrne elemente vrste.
def Vrni(vrsta):
 return sez.Zaporedje(vrsta)

# Ta funkcija se izvede, če datoteko poženemo
# kot samostojen program.
def main():
  vrsta = Ustvari()

  print('Dodamo A v vrsto ...')
  Dodaj(vrsta, 'A')
  Izpisi(vrsta)

  print('Dodamo B v vrsto ...')
  Dodaj(vrsta, 'B')
  Izpisi(vrsta)

  print('Dodamo C v vrsto ...')
  Dodaj(vrsta, 'C')
  Izpisi(vrsta)

  if JePrazna(vrsta):
    print('Vrsta je prazna.')
  else:
    print('Vrsta ni prazna.')

  print('')
  print('Odvzamemo element iz vrste ...')
  Odvzemi(vrsta)
  Izpisi(vrsta)

  print('Odvzamemo element iz vrste ...')
  Odvzemi(vrsta)
  Izpisi(vrsta)

  print('Odvzamemo element iz vrste ...')
  Odvzemi(vrsta)
  Izpisi(vrsta)

  if JePrazna(vrsta):
    print('Vrsta je prazna.')
  else:
    print('Vrsta ni prazna.')

if __name__ == '__main__':
  main()