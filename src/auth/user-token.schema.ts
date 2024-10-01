import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/user.schema';

export type UserTokenDocument = HydratedDocument<UserToken>;

@Schema()
export class UserToken {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop()
  refresh_token: string;
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
