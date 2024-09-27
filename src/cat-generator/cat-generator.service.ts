import { Injectable } from '@nestjs/common';
import { RandomCatOptions } from './random-cat-options';
import { RandomCat } from './random-cat';

@Injectable()
export class CatGeneratorService {
  generateCatPng(): string | boolean {
    const catOptions = RandomCatOptions.generateRandomCatOptions();
    const randomCat = RandomCat.getRandomCat(catOptions);
    //TODO: Actually return something and check what it has to actually return you know?
    return false;
  }
}
