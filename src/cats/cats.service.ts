import { CatGeneratorService } from './../cat-generator/cat-generator.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cat.schema';
import { Model } from 'mongoose';
import { CreateCatDto } from './create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private catModel: Model<Cat>,
    private catGeneratorService: CatGeneratorService,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    this.catGeneratorService.generateCatPng(createdCat._id.toString());
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findByName(name: string): Promise<Cat[]> {
    return this.catModel.find({ name: name }).exec();
  }
}
