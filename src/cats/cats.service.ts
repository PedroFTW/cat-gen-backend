import { CatGeneratorService } from './../cat-generator/cat-generator.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cat.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateCatDto } from './create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private catModel: Model<Cat>,
    private catGeneratorService: CatGeneratorService,
  ) {}

  async create(createCatDto: CreateCatDto, userOID: ObjectId): Promise<Cat> {
    createCatDto.owner = userOID;

    const createdCat = new this.catModel(createCatDto);
    this.catGeneratorService.generateCatPng(createdCat._id.toString());
    return createdCat.save();
  }

  async findAll(userOID: ObjectId): Promise<Cat[]> {
    return this.catModel.find({ owner: userOID }).exec();
  }

  async findByName(name: string, userOID: ObjectId): Promise<Cat[]> {
    return this.catModel.find({ name: name, owner: userOID }).exec();
  }
}
