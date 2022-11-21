import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractService: ContractsService) {}

  @Get()
  findAll(@Query('query') query) {
    return this.contractService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @Get('ltc/:ltcAccount')
  findSubContract(@Param('ltcAccount') ltcAccount: string) {
    return this.contractService.findSubContracts(ltcAccount);
  }

  @MessagePattern('contracts')
  async syncContract(@Payload() message: any, @Ctx() context: KafkaContext) {
    const { headers } = context.getMessage();

    if (headers.entity != 'ContractLine') {
      return;
    }

    if (headers.action == 'delete') {
      this.delete(message.tableData);
    } else {
      this.createOrUpdate(message.tableData);
    }
  }

  private async createOrUpdate(data) {
    const params: CreateContractDto = {
      contract: data.CTCNo,
      line: data.CTCLine,
      subcontract: data.CTCSub,
      type: data.TypeNo,
      typeOption: data.TypeOption,
      description: data.Dsg + (data.Dsg2 ? ` ${data.Dsg2}` : ''),
      unitCode: data.UnCode,
      qty: data.Qty,
      postingType: data.PostingType,
      postingAccount: data.PostingAccount,
      postingLTAccount: data.PostingLTAccount,
      businessType: data.BusinessType,
      businessAccount: data.BusinessAccount,
      businessLTAccount: data.BusinessLTAccount,
      salesperson: data.Salesperson,
      orderCode: data.OrderCode,
      qualityCode: data.QualityCode,
      deliveryCode: data.DeliveryCode,
      ourRef: data.OurRef,
      yourRef: data.YourRef,
      externalDoc: data.ExternalDocNo,
    };

    const contract = await this.contractService.findOneByNavisionCode(
      params.contract,
    );

    if (!contract) {
      this.contractService.create(params);
    } else {
      this.contractService.update(contract.id, params);
    }
  }

  private async delete(data) {
    this.contractService.remove(data.id);
  }
}
