interface Site {
  author: string
  baseUrl: string
  title: string
  description?: string
  locale: string
}

export const site: Site = {
  author: 'Fauzira Alpiandi',
  baseUrl: 'https://music.zira.my.id',
  title: 'Meltronome',
  description: 'Lista de Reproduccion with Meltronome',
  locale: 'en',
}
