import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Inject,
  OnModuleInit,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { LocalsService } from 'src/locals/locals.service';
import { PutUpdateOrderDto } from './dto/put-update-order.dto';
import { ContractsService } from 'src/contracts/contracts.service';
import { RequestService } from 'src/request/request.service';

@Controller('orders')
export class OrdersController implements OnModuleInit {
  private kafkaProducer: Producer;

  constructor(
    private readonly ordersService: OrdersService,
    private readonly localService: LocalsService,
    private readonly contractService: ContractsService,
    private readonly requestService: RequestService,
    @Inject('KAFKA_SERVICE') private kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaProducer = await this.kafkaClient.connect();
  }

  @MessagePattern('contracts')
  async syncContract(@Payload() message: any, @Ctx() context: KafkaContext) {
    const { headers } = context.getMessage();

    if (headers.action !== 'response') {
      return;
    }

    const returnUpdate = await this.requestService.update(message.requestId, {
      responseId: message.responseId,
      tableId: message.order,
      tableName: message.tableName,
    });
    console.log(returnUpdate);
    console.log(await this.requestService.findOne(message.requestId));
  }

  @Post()
  async create(@Body() orderDto: CreateOrderDto, @Res() response: Response) {
    orderDto.number = await this.ordersService.getNumber();
    orderDto.status = 'draft';

    try {
      const order = await this.ordersService.create(orderDto);
      const request = await this.requestService.create({
        tableId: order,
        tableName: 'orders',
      });

      this.kafkaProducer.send({
        topic: 'contracts',
        messages: [
          {
            key: 'order.new-order',
            headers: { action: 'response' },
            value: JSON.stringify({
              tableName: request.tableName,
              order: request.tableId,
              requestId: request.id,
              responseId: request.responseId,
            }),
          },
        ],
      });

      return response.status(HttpStatus.OK).send(order);
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).send({
        message: 'Não foi possível criar a ordem',
      });
    }
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Get(':id/:type')
  async findMainContract(
    @Param('id') orderId: string,
    @Param('type') type: string,
    @Res() response,
  ) {
    const order = await this.ordersService.findOne(+orderId);

    if (!order) {
      return response.status(HttpStatus.NOT_FOUND).send();
    }

    const contracts = await this.ordersService.findContracts(
      order.contract.contract,
      order.contract.subcontract,
      type,
    );

    return response.send(contracts);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateCommentDto);
  }

  @Put(':id')
  putUpdate(
    @Param('id') id: string,
    @Body() updateCommentDto: PutUpdateOrderDto,
  ) {
    return this.ordersService.putUpdate(+id, updateCommentDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }

  @Get('account/create')
  createAccount() {
    this.kafkaProducer.send({
      topic: 'accounts',
      messages: [
        {
          headers: {
            entity: 'Account',
            action: 'create',
          },
          value: JSON.stringify({
            tableData: {
              CLAccount: 'CL000003',
              name: 'GLS2 - Carpintaria, Lda',
              name2: 'Test',
              address: 'Rua Caminho da Igreja, 1254',
              address2: 'Fervença',
              postCode: '3060-805',
              city: 'SANGUINHEIRA',
              countryCode: 'PT',
              phoneNo: '961394250',
              nif: 'PT510095720',
              FDAccount: 'FD000001',
              BlockedForNewOrders: 'Não',
            },
          }),
        },
      ],
    });

    return 'account:create';
  }

  @Get('account/update')
  updateAccount() {
    this.kafkaProducer.send({
      topic: 'accounts',
      messages: [
        {
          headers: {
            entity: 'Account',
            action: 'update',
          },
          value: JSON.stringify({
            tableData: {
              CLAccount: 'CL000288',
              name: 'Doca Pesca - Portos e Lotas, S.A.',
              name2: '',
              searchName: 'DOCA PESCA',
              address: 'Rua Caminho da Igreja, 1254',
              address2: 'Fervença',
              postCode: '1400-038',
              city: 'SANGUINHEIRA',
              countryCode: 'PT',
              phoneNo: '961394250',
              nif: 'PT500086826',
              FDAccount: 'FD000279',
              BlockedForNewOrders: 'Não',
            },
          }),
        },
      ],
    });

    return 'account:update';
  }

  @Get('local/create')
  createLocal() {
    this.kafkaProducer.send({
      topic: 'ltcs',
      messages: [
        {
          headers: {
            entity: 'LTCAccount',
            action: 'create',
          },
          value: JSON.stringify({
            tableData: {
              CLAccount: 'CL008278',
              FDAccount: 'FD009208',
              LTC: '123',
              LTF: '124',
              name: 'GLS2 - Carpintaria, Lda',
              name2: 'test',
              email: 'test@blueotter.pt',
              nif: 'PT510095720',
              address: 'Rua Caminho da Igreja, 1254',
              address2: 'Fervença',
              postCode: '3060-805',
              city: 'SANGUINHEIRA',
              countryCode: 'PT',
              phoneNo: '961394250',
              emailPlanning: 'test@blueotter.pt',
              sirapaid: '123',
              area: 'area',
              mainSiteCode: 'mainsitecode',
              siteCode: 'sitecoed',
              searchName: 'search name',
              contactName: 'Contact Name',
              contactCargo: 'contact cargo',
              contactPhoneNo: '99999231',
            },
          }),
        },
      ],
    });

    return 'local:create';
  }

  @Get('local/update')
  updateLocal() {
    this.kafkaProducer.send({
      topic: 'ltcs',
      messages: [
        {
          headers: {
            entity: 'LTCAccount',
            action: 'update',
          },
          value: JSON.stringify({
            tableData: {
              CLAccount: 'CL008278',
              FDAccount: 'FD009208',
              LTC: '121',
              LTF: '121',
              name: 'GLS - Carpintaria, Lda',
              name2: 'Test',
              email: 'test@blueotter.pt',
              nif: 'PT510095720',
              address: 'Rua Caminho da Igreja, 1254',
              address2: 'Fervença',
              postCode: '3060-805',
              city: 'SANGUINHEIRA',
              countryCode: 'PT',
              phoneNo: '961394250',
              emailPlanning: 'test@blueotter.pt',
              sirapaid: '123',
              area: 'area',
              mainSiteCode: 'mainsitecode',
              siteCode: 'sitecoed',
              searchName: 'search name',
              contactName: 'Contact Name',
              contactCargo: 'contact cargo',
              contactPhoneNo: '99999231',
            },
          }),
        },
      ],
    });

    return 'local:update';
  }

  @Get('contract/create')
  createContract() {
    this.kafkaProducer.send({
      topic: 'contracts',
      messages: [
        {
          headers: {
            entity: 'ContractLine',
            action: 'create',
          },
          value: JSON.stringify({
            tableData: {
              CTCNo: 'CTC-13000277',
              CTCLine: '42500',
              CTCSub: '1',
              TypeNo: 'GES-RIB-IND-008',
              TypeOption: 'waste',
              Dsg: '1TRATAMENTO/ELIMINAÇÃO DE RES. INDIFERENCIADOS',
              Dsg2: null,
              UnCode: 'TON',
              Qty: '1',
              PostingType: 'Venda',
              PostingAccount: 'CL008523',
              PostingLTAccount: 'LTC-013915',
              BusinessType: 'Venda',
              BusinessAccount: 'CL008523',
              BusinessLTAccount: 'LTC-013915',
              Salesperson: 'DHORTA',
              OrderCode: 'MENSAL',
              QualityCode: null,
              DeliveryCode: null,
              OurRef: null,
              YourRef: null,
              ExternalDocNo: null,
            },
          }),
        },
      ],
    });

    return 'contract:create';
  }

  @Get('contract/update')
  updateContract() {
    this.kafkaProducer.send({
      topic: 'contracts',
      messages: [
        {
          headers: {
            entity: 'ContractLine',
            action: 'update',
          },
          value: JSON.stringify({
            tableData: {
              CTCNo: 'CTC-13000278',
              CTCLine: '42500',
              CTCSub: '1',
              TypeNo: 'GES-RIB-IND-008',
              TypeOption: 'waste',
              Dsg: 'TRATAMENTO/ELIMINAÇÃO DE RES. INDIFERENCIADOS',
              Dsg2: 'teste',
              UnCode: 'TON',
              Qty: '1',
              PostingType: 'Venda',
              PostingAccount: 'CL008523',
              PostingLTAccount: 'LTC-013915',
              BusinessType: 'Venda',
              BusinessAccount: 'CL008523',
              BusinessLTAccount: 'LTC-013915',
              Salesperson: 'DHORTA',
              OrderCode: 'MENSAL',
              QualityCode: null,
              DeliveryCode: null,
              OurRef: null,
              YourRef: null,
              ExternalDocNo: null,
            },
          }),
        },
      ],
    });

    return 'contract:update';
  }

  @Get('middleware/producer')
  createMiddleware() {
    this.kafkaProducer.send({
      topic: 'middleware-test',
      messages: [
        {
          key: 'teste',
          headers: {
            entity: 'LTCAccount',
            action: 'create',
          },
          value: JSON.stringify({
            tableData: {
              CLAccount: 'CL008278',
              FDAccount: 'FD009208',
              LTC: '123',
              LTF: '124',
              name: 'GLS2 - Carpintaria, Lda',
              name2: 'test',
              email: 'test@blueotter.pt',
              nif: 'PT510095720',
              address: 'Rua Caminho da Igreja, 1254',
              address2: 'Fervença',
              postCode: '3060-805',
              city: 'SANGUINHEIRA',
              countryCode: 'PT',
              phoneNo: '961394250',
              emailPlanning: 'test@blueotter.pt',
              sirapaid: '123',
              area: 'area',
              mainSiteCode: 'mainsitecode',
              siteCode: 'sitecoed',
              searchName: 'search name',
              contactName: 'Contact Name',
              contactCargo: 'contact cargo',
              contactPhoneNo: '99999231',
            },
          }),
        },
      ],
    });

    return 'middleware:producer';
  }
}
