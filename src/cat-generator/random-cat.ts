import { Jimp } from 'jimp';
import { RandomCatOptions } from './random-cat-options';
import { baseCatConstants, ColorPool, mappingColors } from './constants';
import { SpriteSegment } from './sprite-segment';

export abstract class RandomCat {
  public segments: SpriteSegment[] = [];
  public spriteMapPath: string;

  constructor(public randomCatOptions: RandomCatOptions) {
    this.setBaseSegments();
  }

  abstract createRandomCat(): RandomCat;

  static getRandomCat(randomCatOptions: RandomCatOptions): RandomCat {
    if (randomCatOptions.bodyType === baseCatConstants.SINGLECOLOR) {
      return new SingleColorCat(randomCatOptions);
    }
    if (randomCatOptions.bodyType === baseCatConstants.TWOCOLOR) {
      return new TwoColorCat(randomCatOptions);
    }

    throw Error(`No ${randomCatOptions.bodyType} type found`);
  }

  getBodySegment(): SpriteSegment {
    const body = new SpriteSegment();
    const rarity = RandomCatOptions.getRarityPool();
    body.name = 'body';
    body.map_color = mappingColors.WHITE;
    body.output_color = RandomCatOptions.getRandomEntryFromArray(
      ColorPool[this.randomCatOptions.bodyType][rarity],
    );

    return body;
  }

  getOutlineSegment(): SpriteSegment {
    const outline = new SpriteSegment();
    outline.name = 'outline';
    outline.map_color = mappingColors.BLACK;
    outline.output_color = mappingColors.BLACK;

    return outline;
  }

  getCheeksEarsSegment(): SpriteSegment {
    const cheekEars = new SpriteSegment();
    cheekEars.name = 'cheekEars';
    cheekEars.map_color = mappingColors.RED;
    cheekEars.output_color = ColorPool[cheekEars.name];

    return cheekEars;
  }

  getEyesSegment(): SpriteSegment[] {
    const rarity = RandomCatOptions.getRarityPool();
    const leftEye = new SpriteSegment();
    leftEye.name = 'leftEye';
    leftEye.map_color = mappingColors.PINK;
    leftEye.output_color = RandomCatOptions.getRandomEntryFromArray(
      ColorPool['eyes'][rarity],
    );

    const rightEye = new SpriteSegment();
    rightEye.name = 'rightEye';
    rightEye.map_color = mappingColors.YELLOW;

    if (!this.randomCatOptions.hasHeterochromia) {
      rightEye.output_color = leftEye.output_color;
    } else {
      rightEye.output_color = RandomCatOptions.getRandomEntryFromArray(
        ColorPool['eyes'][rarity],
      );
    }

    return [leftEye, rightEye];
  }

  getSocksSegment(): SpriteSegment {
    const socks = new SpriteSegment();
    const body = this.segments.filter((segment) => segment.name === 'body');

    let socksColorPool: Array<number> = ColorPool['socks'];
    socksColorPool = socksColorPool.filter(
      (color) => color !== body[0].output_color,
    );
    socks.name = 'socks';
    socks.map_color = mappingColors.BLUE;

    socks.output_color =
      RandomCatOptions.getRandomEntryFromArray(socksColorPool);

    return socks;
  }

  setBaseSegments(): void {
    this.segments.push(this.getOutlineSegment());
    this.segments.push(this.getBodySegment());
    this.segments.push(this.getCheeksEarsSegment());

    const eyes = this.getEyesSegment();
    this.segments.push(eyes[0]);
    this.segments.push(eyes[1]);

    this.segments.push(this.getSocksSegment());
  }

  generatePng(): void {
    const image = new Jimp({
      width: 26,
      height: 15,
      color: 0x00000000,
    });

    this.mapSprite()
      .then((spriteMap: RandomCat) => {
        spriteMap.segments.map((segment: SpriteSegment) => {
          segment.pixel_data.map((index) => {
            image.setPixelColor(segment.output_color, index.x, index.y);
          });
        });
      })
      .then(() => {
        image.write('out.png');
      });
  }

  async mapSprite(): Promise<RandomCat> {
    const map = await Jimp.read(
      process.cwd() + '/public/' + `${this.randomCatOptions.bodyType}.png`,
    );

    map.scan((x, y) => {
      this.segments.forEach((segment) => {
        if (map.getPixelColor(x, y) === segment.map_color) {
          segment.pixel_data.push({
            x: x,
            y: y,
          });
        }
      });
    });

    return this;
  }
}

export class SingleColorCat extends RandomCat {
  createRandomCat(): RandomCat {
    return this;
  }
}

export class TwoColorCat extends RandomCat {
  createRandomCat(): RandomCat {
    const upperBody = new SpriteSegment();
    const rarity = RandomCatOptions.getRarityPool();
    upperBody.name = 'upper_body';
    upperBody.map_color = mappingColors.GREEN;
    upperBody.output_color = RandomCatOptions.getRandomEntryFromArray(
      ColorPool[this.randomCatOptions.bodyType]['upperBody'][rarity],
    );

    this.segments.push(upperBody);

    return this;
  }
}
