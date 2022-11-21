import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Get()
  findAll(@Query('query') query) {
    return this.accountService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @MessagePattern('accounts')
  syncAccount(@Payload() message: any, @Ctx() context: KafkaContext) {
    const { headers } = context.getMessage();

    if (headers.entity != 'Account') {
      return;
    }

    if (headers.action == 'delete') {
      this.delete(message.tableData);
    } else {
      this.createOrUpdate(message.tableData);
    }
  }

  private async createOrUpdate(data) {
    const params: CreateAccountDto = {
      customerAccount: data.CLAccount ? data.CLAccount : null,
      supplierAccount: data.FDAccount ? data.FDAccount : null,
      nif: data.nif,
      name: data.name + (data.name2 ? ` ${data.name2}` : ''),
      email: data.email,
      address: data.address2 + (data.address2 ? ` ${data.address2}` : ''),
      zipcode: data.postCode,
      phone: data.phoneNo,
      blockedForNewOrders: data.BlockedForNewOrders == 'Sim',
      isCustomer: data.CLAccount ? true : false,
      isSupplier: data.FDAccount ? true : false,
      active: true,
    };

    const account = await this.accountService.findOneByNavisionCode(
      params.customerAccount ? params.customerAccount : params.supplierAccount,
    );

    if (!account) {
      this.accountService.create(params);
    } else {
      this.accountService.update(account.id, params);
    }
  }

  private delete(data) {
    this.accountService.remove(data.id);
  }
}
