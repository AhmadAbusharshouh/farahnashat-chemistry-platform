import localFont from 'next/font/local';

export const zainFont = localFont({
  src: [
    {
      path: '../public/fonts/zain/zain-light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/zain/zain-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/zain/zain-bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/zain/zain-extrabold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/zain/zain-black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-zain',
  display: 'swap',
});

// Backward compatibility alias
export const alHurraFont = zainFont;
