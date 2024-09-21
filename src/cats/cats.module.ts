import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cat.schema';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  exports: [CatsService],
})
export class CatsModule {}
