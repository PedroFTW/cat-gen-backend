import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateCatDto } from "./create-cat.dto";

@Controller('cats')
export class CatsControllerController {
    @Post()
    create(@Body() createCatDto: CreateCatDto): string {
        return "This action creates a new cat!"
    }

    @Get()
    findAll(): string {
        return "This action returns all cats!";
    }

    @Get(":id")
    findOne(@Param("id") id: number): string {
        return `This action returns the ${id} cat`;
    }
}
