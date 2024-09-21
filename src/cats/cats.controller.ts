import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  create(@Body() createCatDto: CreateCatDto): string {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
    return 'This action creates a new cat!';
  }

  @Get()
  findAll(): any {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    return `This action returns the ${id} cat`;
  }
}
