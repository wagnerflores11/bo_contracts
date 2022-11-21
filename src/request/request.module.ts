import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { RequestService } from './request.service';

@Module({
  imports: [TypeOrmModule.forFeature([Request])],
  exports: [RequestService],
  providers: [RequestService],
})
export class RequestModule {}
