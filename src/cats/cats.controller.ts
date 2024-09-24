import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cats')
@UseGuards(AuthGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  create(@Body() createCatDto: CreateCatDto): any {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
    return { success: true };
  }

  @Get()
  findAll(): any {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') name: string): any {
    return this.catsService.findByName(name);
  }
}
