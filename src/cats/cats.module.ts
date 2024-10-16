import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';
import { CatGeneratorModule } from 'src/cat-generator/cat-generator.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    CatGeneratorModule,
    UsersModule,
  ],
  exports: [CatsService],
})
export class CatsModule {}
