import localFont from 'next/font/local';

export const alHurraFont = localFont({
  src: [
    {
      path: '../public/fonts/alhurratxtlight.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/alhurratxtreg.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/alhurratxtbold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-alhurra',
  display: 'swap',
});
