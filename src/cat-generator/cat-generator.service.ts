import { PngGenerator } from './png-generator';
import { Injectable } from '@nestjs/common';
import { RandomCatOptions } from './random-cat-options';
import { RandomCat } from './random-cat';

@Injectable()
export class CatGeneratorService {
  generateCatPng(catOId: string): void {
    try {
      const catOptions = RandomCatOptions.generateRandomCatOptions();
      const randomCat = RandomCat.getRandomCat(catOptions);
      const pngGenerator: PngGenerator = new PngGenerator(randomCat);

      pngGenerator.generatePng(catOId);
    } catch {
      //TODO: Completely useless error message. Implement real exceptions along the generation process.
      throw new Error('Oops, something went wrong!');
    }
  }
}
