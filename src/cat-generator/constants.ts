export const STORAGE_PATH = '/public/generated-cats';

export const baseCatConstants = {
  SINGLECOLOR: 'singlecolor',
  TWOCOLOR: 'twocolor',
  RARE: 'rare',
  SEMIRARE: 'semirare',
  COMMON: 'common',
};
export const randomizerCatConstants = {
  BODY_TYPES: [baseCatConstants.SINGLECOLOR, baseCatConstants.TWOCOLOR],
};
export const mappingColors = {
  RED: 0xff0000ff,
  BLUE: 0x0000ffff,
  GREEN: 0x00ff00ff,
  BLACK: 0x000000ff,
  WHITE: 0xffffffff,
  PINK: 0xff00ffff,
  YELLOW: 0xffff00ff,
};

export const catNames = [
  'Alecrim',
  'Amora',
  'Baunilha',
  'Bolinho',
  'Café',
  'Chips',
  'Cookie',
  'Fubá',
  'Jujuba',
  'Paçoca',
  'Lasanha',
  'Marshmallow',
  'Mel',
  'Milk',
  'Muffin',
  'Nacho',
  'Pipoca',
  'Sal',
  'Sashimi',
  'Sushi',
  'Tequila',
  'Torrada',
  'Vodka',
  'Whisky',
];

interface ColorPool {
  [key: string]: any;
}

export const ColorPool: ColorPool = {
  socks: [0x000000ff, 0xffffffff],
  eyes: {
    rare: [0xff0000ff, 0xbb22ffff, 0xffffffff],
    semirare: [0x0dd6e6ff, 0x0cff99ff, 0xf1ff00ff],
    common: [0x1590ffff, 0x22b521ff, 0xa16239ff],
  },
  cheekEars: 0xffaec9ff,
  singlecolor: {
    rare: [0x5ce8a7ff, 0xe889e2ff, 0x5b37a1ff],
    semirare: [0x787878ff, 0xa36317ff, 0xe8e78dff],
    common: [0xffffffff, 0xff9000ff, 0xb5b5b5ff],
  },
  twocolor: {
    rare: [0x6bffc8ff, 0x92ff66ff],
    semirare: [0xffffffff],
    common: [0xffffffff],
    upperBody: {
      rare: [0x5ce8a7ff, 0xe889e2ff, 0x5b37a1ff],
      semirare: [0x787878ff, 0xa36317ff, 0xe8e78dff],
      common: [0xffffffff, 0xff9000ff, 0xb5b5b5ff],
    },
  },
};
