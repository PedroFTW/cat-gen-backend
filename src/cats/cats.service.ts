import { UsersService } from 'src/users/users.service';
import { CatGeneratorService } from './../cat-generator/cat-generator.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cat.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateCatDto } from './create-cat.dto';
import { UpdateCatDto } from './update-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat.name) private catModel: Model<Cat>,
    private catGeneratorService: CatGeneratorService,
    private usersService: UsersService,
  ) {}

  async create(createCatDto: CreateCatDto, userOID: ObjectId): Promise<Cat> {
    const canCreate = await this.usersService.canCreateCat(userOID);
    if (canCreate === false)
      throw new UnauthorizedException('Cannot generate a cat a this time!');

    createCatDto.owner = userOID;
    const createdCat = new this.catModel(createCatDto);
    const catOptions = this.catGeneratorService.generateCatPng(
      createdCat._id.toString(),
    );

    createdCat.name = catOptions.originalName;
    createdCat.randomOptions = catOptions;

    return createdCat.save();
  }

  async updateCat(
    catOID: string,
    ownerOID: ObjectId,
    updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    const cat = await this.catModel.findOneAndUpdate(
      { _id: catOID, owner: ownerOID },
      updateCatDto,
    );

    if (!cat) {
      throw new NotFoundException('Cat not found!');
    }

    return await this.findOneById(catOID, ownerOID);
  }

  async findAll(userOID: ObjectId): Promise<Cat[]> {
    return this.catModel.find({ owner: userOID }).exec();
  }

  async findOneById(catOID: string, userOID: ObjectId): Promise<Cat> {
    const cat = await this.catModel
      .findOne({ _id: catOID, owner: userOID })
      .exec();
    if (!cat) {
      throw new NotFoundException('Cat not found!');
    }
    return cat;
  }
}
