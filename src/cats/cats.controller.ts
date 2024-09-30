import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Put,
  Res,
  Header,
} from '@nestjs/common';
import { CreateCatDto } from './create-cat.dto';
import { CatsService } from './cats.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthneticatedUser } from 'src/users/user.decorator';
import { User } from 'src/users/user.schema';
import { UpdateCatDto } from './update-cat.dto';
import { createReadStream } from 'fs';
import { STORAGE_PATH } from 'src/cat-generator/constants';
import { join } from 'path';
import { Response } from 'express';

@Controller('cats')
@UseGuards(AuthGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  async create(
    @AuthneticatedUser() user: User,
    @Body() createCatDto: CreateCatDto,
  ): Promise<any> {
    return this.catsService.create(createCatDto, user._id);
  }

  @Put(':id')
  async update(
    @AuthneticatedUser() user: User,
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<any> {
    return this.catsService.updateCat(id, user._id, updateCatDto);
  }

  @Get()
  findAll(@AuthneticatedUser() user: User): any {
    return this.catsService.findAll(user._id);
  }

  @Get(':id')
  findOne(@AuthneticatedUser() user: User, @Param('id') id: string): any {
    return this.catsService.findOneById(id, user._id);
  }

  @Get(':id/img')
  @Header('Content-Type', 'image/png')
  getFile(@Res() res: Response, @Param('id') catOID: string) {
    const file = createReadStream(
      join(process.cwd(), STORAGE_PATH, `${catOID}.png`),
    );
    file.pipe(res);
  }
}
