import { Module } from '@nestjs/common';
import { RelationValidate } from './relation.validator';

@Module({
  providers: [RelationValidate],
})
export class ValidatorModule {}
