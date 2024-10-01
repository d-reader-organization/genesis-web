import localFont from 'next/font/local'

const satoshi = localFont({
  src: [
    { path: './satoshi/Satoshi-Light.woff2', weight: '300', style: 'normal' },
    { path: './satoshi/Satoshi-LightItalic.woff2', weight: '300', style: 'italic' },
    { path: './satoshi/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: './satoshi/Satoshi-Italic.woff2', weight: '400', style: 'italic' },
    { path: './satoshi/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: './satoshi/Satoshi-MediumItalic.woff2', weight: '500', style: 'italic' },
    { path: './satoshi/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
    { path: './satoshi/Satoshi-BoldItalic.woff2', weight: '700', style: 'italic' },
    { path: './satoshi/Satoshi-Black.woff2', weight: '900', style: 'normal' },
    { path: './satoshi/Satoshi-BlackItalic.woff2', weight: '900', style: 'italic' },
  ],
  display: 'swap',
  preload: true,
  variable: '--font-satoshi',
})

const obviouslyNarrow = localFont({
  src: [
    { path: './obviously-narrow/ObviouslyNarrow-Light.otf', weight: '300', style: 'normal' },
    { path: './obviously-narrow/ObviouslyNarrow-LightItalic.otf', weight: '300', style: 'italic' },
    { path: './obviously-narrow/ObviouslyNarrow-Regular.otf', weight: '400', style: 'normal' },
    { path: './obviously-narrow/ObviouslyNarrow-Italic.otf', weight: '400', style: 'italic' },
    { path: './obviously-narrow/ObviouslyNarrow-Medium.otf', weight: '500', style: 'normal' },
    { path: './obviously-narrow/ObviouslyNarrow-MediumItalic.otf', weight: '500', style: 'italic' },
    { path: './obviously-narrow/ObviouslyNarrow-SemiBold.otf', weight: '600', style: 'normal' },
    { path: './obviously-narrow/ObviouslyNarrow-SemBdIta.otf', weight: '600', style: 'italic' },
    { path: './obviously-narrow/ObviouslyNarrow-Bold.otf', weight: '700', style: 'normal' },
    { path: './obviously-narrow/ObviouslyNarrow-BoldItalic.otf', weight: '700', style: 'italic' },
    { path: './obviously-narrow/ObviouslyNarrow-Black.otf', weight: '900', style: 'normal' },
    { path: './obviously-narrow/ObviouslyNarrow-BlackItalic.otf', weight: '900', style: 'italic' },
  ],
  display: 'swap',
  preload: true,
  variable: '--font-obviously-narrow',
})

export { satoshi, obviouslyNarrow }
