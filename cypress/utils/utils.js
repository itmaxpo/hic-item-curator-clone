const parseNamesIntoAreas = (names) =>
  names.map((name) => ({
    title: name,
    subtitle: 'Argentina',
    description: 'No description found.'
  }))

export const firstPageAreaData = [
  {
    title: 'Autonomous City of Buenos Aires',
    subtitle: 'Argentina',
    description: 'test description 😃'
  },
  {
    title: 'Buenos Aires',
    subtitle: 'Argentina',
    description: 'description of buenos aires ah si 🥵'
  },
  {
    title: 'Córdoba',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Feuerland',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Corrientes',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Chaco',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Santiago del Estero',
    subtitle: 'Argentina',
    description: 'description of Santiaguito del Estero amigo 😛'
  },
  {
    title: 'Río Negro',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Departamento Santa María',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Departamento Ambato',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Departamento Valle Viejo',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Departamento Chacabuco',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Departamento General San Martín',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Departamento San Alberto',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Formosa',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Departamento Ancasti',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Departamento Pomán',
    subtitle: 'Argentina',
    description: 'description for nuestro queridisimo Poman alabado sea 🙏'
  },
  {
    title: 'Departamento El Alto',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Departamento Antofagasta de la Sierra',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Departamento Presidencia de la Plaza',
    subtitle: 'Argentina',
    description: 'la casa del presi Mauri 👨'
  }
]

export const secondPageAreaData = parseNamesIntoAreas([
  'Departamento Bermejo',
  'Departamento Comandante Fernández',
  'Departamento Independencia',
  'Partido de Ituzaingó',
  'Departamento Sobremonte',
  'Partido de Avellaneda',
  'Departamento Guaymallén',
  'Partido de Quilmes',
  'Partido de General Rodríguez',
  'Partido de Berisso',
  'Partido de Ensenada',
  'Partido de Ramallo',
  'Partido de Luján',
  'Partido de Merlo',
  'Partido de Exaltación de la Cruz',
  'Partido de San Andrés de Giles',
  'Departamento Capital',
  'Partido de Ezeiza',
  'Partido de General Viamonte',
  'Partido de Carmen de Areco'
])

export const fifthPageAreaData = parseNamesIntoAreas([
  'Departamento Saladas',
  'Departamento Esquina',
  'Departamento Sauce',
  'Cafayate',
  'Departamento Libertador General San Martín',
  'Departamento Veinticinco de Mayo',
  'Departamento Candelaria',
  'Departamento Constitución',
  'Departamento Chicligasta',
  'Departamento Capital',
  'Departamento Juan Bautista Alberdi',
  'Departamento General López',
  'Departamento Valcheta',
  'Departamento Ledesma',
  'Departamento General Taboada',
  'Departamento San Antonio',
  'Departamento Quebrachos',
  'Departamento El Carmen',
  'Departamento Moreno',
  'Departamento El Cuy'
])

export const lastPageAreaData = parseNamesIntoAreas([
  'Distrito Sauce',
  'Distrito Anchoris',
  'Pedanía Macha',
  'Distrito El Divisadero',
  'Distrito Primero',
  'Pedanía San Bartolomé',
  'Pedanía San Vicente',
  'Distrito El Sauce',
  'Distrito El Carmen',
  'Cuartel Asamblea',
  'Distrito Cruz de Piedra',
  'Distrito Río Barrancas',
  'Distrito La Paz Norte',
  'Distrito Bowen',
  'Pedanía Matorrales',
  'Pedanía Sacanta'
])

export const testItemPage = (dataSet) => {
  dataSet.forEach((el, index) => {
    cy.get('[data-test=search-item]').eq(index).contains(el.title)

    cy.get('[data-test=search-item]').eq(index).find('[data-test=subtitle]').contains(el.subtitle)

    cy.get('[data-test=search-item]')
      .eq(index)
      .find('[data-test=description]')
      .contains(el.description)

    cy.get('[data-test=search-item]')
      .eq(index)
      .find('[data-test=photo]')
      .contains(el.photo || '3 Photos')
  })
}

export const pageAccomData = [
  {
    title: 'Ah si el nombre',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Amérian Executive Mendoza Hotel',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Broadway Hotel &amp; Suites',
    subtitle: 'Argentina',
    description: 'Broadway Hotel & Suites is located in the heart of the city'
  },
  {
    title: 'Dazzler Puerto Madryn',
    subtitle: 'Argentina',
    description: 'The Dazzler Puerto Madryn is located on the shore of the coastal Puerto Madryn.'
  },
  {
    title: 'Lagos Del Calafate',
    subtitle: 'Argentina',
    description: 'Unique Luxury Patagonia is located in the city of El Calafate'
  },
  {
    title: 'Pestana Buenos Aires Hotel',
    subtitle: 'Argentina',
    description: 'Pestana Buenos Aires Hotel is located in the heart of 9 de Julio'
  },
  {
    title: 'Tierra del Fuego Hotel',
    subtitle: 'Ushuaia, Argentina',
    description: 'Tierra del Fuego Hotel is in downtown Ushuaia.'
  },
  {
    title: 'la casa de belencita 2 ah si la numero dos',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'la casa de belencita ah si',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'la casita de la abuelita de belen',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'new test',
    subtitle: 'Argentina',
    description: 'No description found.'
  }
]

export const pageAccomDataAfterMerge = [
  {
    title: 'Ah si el item after merge',
    subtitle: 'Argentina',
    description: 'Ah si la nueva description after merge',
    photo: '0 Photos'
  },
  {
    title: 'Ah si el nombre',
    subtitle: 'Argentina',
    description: 'No description found.'
  },
  {
    title: 'Broadway Hotel &amp; Suites',
    subtitle: 'Argentina',
    description: 'Broadway Hotel & Suites is located in the heart of the city',
    photo: '0 Photos'
  },
  {
    title: 'Lagos Del Calafate',
    subtitle: 'Argentina',
    description: 'Unique Luxury Patagonia is located in the city of El Calafate',
    photo: '0 Photos'
  },
  {
    title: 'Pestana Buenos Aires Hotel',
    subtitle: 'Argentina',
    description: 'Pestana Buenos Aires Hotel is located in the heart of 9 de Julio',
    photo: '0 Photos'
  },
  {
    title: 'Tierra del Fuego Hotel',
    subtitle: 'Ushuaia, Argentina',
    description: 'Tierra del Fuego Hotel is in downtown Ushuaia.',
    photo: '0 Photos'
  },
  {
    title: 'la casa de belencita 2 ah si la numero dos',
    subtitle: 'Argentina',
    description: 'No description found.',
    photo: '0 Photos'
  },
  {
    title: 'la casa de belencita ah si',
    subtitle: 'Argentina',
    description: 'No description found.',
    photo: '0 Photos'
  },
  {
    title: 'la casita de la abuelita de belen',
    subtitle: 'Argentina',
    description: 'No description found.',
    photo: '0 Photos'
  },
  {
    title: 'new test',
    subtitle: 'Argentina',
    description: 'No description found.',
    photo: '0 Photos'
  }
]
