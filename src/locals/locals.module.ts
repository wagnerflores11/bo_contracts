import { Module } from '@nestjs/common';
import { LocalsService } from './locals.service';
import { LocalsController } from './locals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Local } from './entities/local.entity';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Local]), AccountsModule],
  exports: [LocalsService],
  controllers: [LocalsController],
  providers: [LocalsService],
})
export class LocalsModule {}
