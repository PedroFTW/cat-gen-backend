import { Jimp } from 'jimp';
import { RandomCat } from './random-cat';
import { SpriteSegment } from './sprite-segment';
import { STORAGE_PATH } from './constants';

export class PngGenerator {
  constructor(public randomCat: RandomCat) {}
  generatePng(filename: string): void {
    const filePath = process.cwd() + STORAGE_PATH + '/' + filename;
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
        image.write(`${filePath}.png`);
      });
  }

  async mapSprite(): Promise<RandomCat> {
    const map = await Jimp.read(
      process.cwd() +
        '/public/' +
        `${this.randomCat.randomCatOptions.bodyType}.png`,
    );

    map.scan((x, y) => {
      this.randomCat.segments.forEach((segment) => {
        if (map.getPixelColor(x, y) === segment.map_color) {
          segment.pixel_data.push({
            x: x,
            y: y,
          });
        }
      });
    });

    return this.randomCat;
  }
}
