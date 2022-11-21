import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private requestRespository: Repository<Request>,
  ) {}

  create(request: CreateRequestDto) {
    const newRequest = this.requestRespository.create(request);
    return this.requestRespository.save(newRequest);
  }

  async update(id: number, request: UpdateRequestDto) {
    const updateResult = await this.requestRespository.update(id, request);

    if (!updateResult.affected) {
      throw new EntityNotFoundError(Request, id);
    }

    return this.requestRespository.findOneBy({ id });
  }

  findOne(id: number) {
    return this.requestRespository.findOneBy({ id });
  }
}
