import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthneticatedUser } from 'src/users/user.decorator';
import { User } from 'src/users/user.schema';

@Controller('cats')
@UseGuards(AuthGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  async create(
    @AuthneticatedUser() user: User,
    @Body() createCatDto: CreateCatDto,
  ): Promise<any> {
    this.catsService.create(createCatDto, user._id);
    return { success: true };
  }

  @Get()
  findAll(@AuthneticatedUser() user: User): any {
    return this.catsService.findAll(user._id);
  }

  @Get(':id')
  findOne(@AuthneticatedUser() user: User, @Param('id') name: string): any {
    return this.catsService.findByName(name, user._id);
  }
}
