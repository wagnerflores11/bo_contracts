import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { AccountsService } from 'src/accounts/accounts.service';
import { CreateLocalDto } from './dto/create-local.dto';
import { LocalsService } from './locals.service';

@Controller('locals')
export class LocalsController {
  constructor(
    private readonly localService: LocalsService,
    private readonly accountService: AccountsService,
  ) {}

  @Get('account/:account')
  findAll(@Param('account') account: string, @Query('query') query: string) {
    return this.localService.findByAccount(+account, query);
  }

  @Get(':id')
  view(@Param('id') localId: string) {
    return this.localService.findOne(+localId);
  }

  @Get('')
  async findLocalAndAccounts(@Query('query') query: string) {
    return await this.localService.findAll(query);
  }

  @MessagePattern('ltcs')
  syncLocal(@Payload() message: any, @Ctx() context: KafkaContext) {
    const { headers } = context.getMessage();

    if (headers.entity != 'LTCAccount') {
      return;
    }

    if (headers.action == 'delete') {
      this.delete(message.tableData);
    } else {
      this.createOrUpdate(message.tableData);
    }
  }

  private async createOrUpdate(data) {
    const account = await this.accountService.findOneByNavisionCode(
      data.CLAccount || data.FDAccount,
    );

    const params: CreateLocalDto = {
      account: account,
      ltcAccount: data.LTC || null,
      ltfAccount: data.LTF || null,
      nif: data.nif,
      name: data.name + (data.name2 ? ` ${data.name2}` : ''),
      email: data.email,
      address: data.address2 + (data.address2 ? ` ${data.address2}` : ''),
      zipcode: data.postCode,
      city: data.city,
      country: data.countryCode,
      phone: data.phoneNo,
      emailPlanning: data.emailPlanning,
      sirapaid: data.sirapaid,
      area: data.area,
      mainSiteCode: data.mainSiteCode,
      siteCode: data.siteCode,
      blocked: data.blocked == 'Sim',
      searchName: data.searchName,
      contactName: data.contactName,
      contactCargo: data.contactCargo,
      contactPhone: data.contactPhoneNo,
      active: true,
    };

    const local = await this.localService.findOneByNavisionCode(
      data.LTC || data.LTF,
    );

    if (!local) {
      this.localService.create(params);
    } else {
      this.localService.update(local.id, params);
    }
  }

  private async delete(data) {
    this.localService.remove(data.id);
  }
}
