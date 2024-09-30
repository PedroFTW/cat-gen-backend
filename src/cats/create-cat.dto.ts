import { ObjectId } from 'mongoose';

export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
  owner: ObjectId;
}
