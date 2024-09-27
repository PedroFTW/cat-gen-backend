import { baseCatConstants, randomizerCatConstants } from './constants';
export class RandomCatOptions {
  public bodyType: string;
  public hasHeterochromia: boolean;
  public hasSocks: boolean;

  static generateRandomCatOptions(): RandomCatOptions {
    const options = new RandomCatOptions();
    options.bodyType = RandomCatOptions.getRandomBodyType();
    options.hasHeterochromia = RandomCatOptions.getHeterochromia();
    options.hasSocks = RandomCatOptions.getSocks();

    return options;
  }

  static getRandomBodyType(): string {
    return randomizerCatConstants.BODY_TYPES[
      this.getRandomInt(randomizerCatConstants.BODY_TYPES.length)
    ];
  }

  static getHeterochromia(): boolean {
    return this.getRandomInt(100) >= 95;
  }

  static getSocks(): boolean {
    return this.getRandomInt(100) >= 60;
  }

  static getRarityPool(): string {
    const randInt = this.getRandomInt(100);
    if (randInt <= 10) {
      return baseCatConstants.RARE;
    } else if (randInt <= 40) {
      return baseCatConstants.SEMIRARE;
    }

    return baseCatConstants.COMMON;
  }

  static getRandomEntryFromArray(arr: Array<any>) {
    return arr[this.getRandomInt(arr.length)];
  }

  static getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
