import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { RandomCatOptions } from 'src/cat-generator/random-cat-options';
import { User } from 'src/users/user.schema';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop()
  randomOptions: RandomCatOptions;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
