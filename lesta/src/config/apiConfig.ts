export const apiUrl = 'https://vortex.worldofwarships.ru/api/graphql/glossary/'

export const queries = {
  vehicles: `{ vehicles {
    title
    description
    icons {
      small
      large
      medium
    }
    level
    type {
      name
      title
      icons {
        default
      }
    }
    nation {
      name
      title
      color
      icons {
        small
        medium
        large
      }
    }
  } }`,

  nations: `{ nations {
    name
    title
  } }`,

  types: `{ types: vehicleTypes {
    name
    title
  } }`,
}
