import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Manole Daniel Portfolio',
    short_name: 'Manole.cad',
    description: 'Portofoliu Inginerie Industrială și Robotică',
    start_url: '/',
    display: 'standalone',
    background_color: '#e0e5ec',
    theme_color: '#e0e5ec',
    icons: [
      {
        src: '/icon',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: 'any',
        type: 'image/png',
      }
    ],
  }
}