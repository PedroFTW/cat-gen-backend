import { Test, TestingModule } from '@nestjs/testing';
import { CatGeneratorService } from './cat-generator.service';

describe('CatGeneratorService', () => {
  let service: CatGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatGeneratorService],
    }).compile();

    service = module.get<CatGeneratorService>(CatGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
