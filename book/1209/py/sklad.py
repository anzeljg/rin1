# Ta modul vsebuje osnovne operacije za delo
# s skladom. Sklad je implementiran kot tabela.

# Ustvari in vrne prazen sklad.
def Ustvari():
  return []

# Doda element na sklad.
def Dodaj(sklad, element):
  sklad.append(element)

# Odvzame element s sklada in vrne odvzeti
# element. To najlažje naredimo s pythonovo
# funkcijo "pop", ki odstrani zadnji element
# tabele in ga hkrati vrne.
def Odvzemi(sklad):
  element = sklad.pop()
  return element

# Vrne true natanko v primeru, če je sklad
# prazen.
def JePrazen(sklad):
  return (len(sklad) == 0)

# Pomožna funkcija za izpis elementov sklada.
def Izpisi(sklad):
  print(sklad)

# Ta funkcija se izvede, če datoteko poženemo
# kot samostojen program.
def main():
  sklad = Ustvari()

  print('Dodamo A na sklad ...')
  Dodaj(sklad, 'A')
  print(sklad)

  print('Dodamo B na sklad ...')
  Dodaj(sklad, 'B')
  print(sklad)

  print('Dodamo C na sklad ...')
  Dodaj(sklad, 'C')
  print(sklad)

  if JePrazen(sklad):
    print('Sklad je prazen.')
  else:
    print('Sklad ni prazen.')

  print('')
  print('Odvzamemo element s sklada ...')
  Odvzemi(sklad)
  print(sklad)

  print('Odvzamemo element s sklada ...')
  Odvzemi(sklad)
  print(sklad)

  print('Odvzamemo element s sklada ...')
  Odvzemi(sklad)
  print(sklad)

  if JePrazen(sklad):
    print('Sklad je prazen.')
  else:
    print('Sklad ni prazen.')

if __name__ == '__main__':
  main()