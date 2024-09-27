import { Module } from '@nestjs/common';
import { CatGeneratorService } from './cat-generator.service';

@Module({
  exports: [CatGeneratorService],
  providers: [CatGeneratorService],
})
export class CatGeneratorModule {}
