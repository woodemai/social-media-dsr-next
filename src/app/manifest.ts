import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DevSphere',
    short_name: 'DevSphere',
    theme_color: '#fff',
    background_color: '#fff',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    lang: 'ru',
    description: 'DevSphere - social media for developers',
    icons: [
      {
        src: '/icons/icon3.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon4.png',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/icons/icon5.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icons/icon5.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
