import { ObjectId } from 'mongoose';
import { RandomCat } from 'src/cat-generator/random-cat';

export class CreateCatDto {
  owner: ObjectId;
  randomCat: RandomCat;
}
