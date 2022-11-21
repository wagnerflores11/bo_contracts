import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Contract } from 'src/contracts/entities/contract.entity';
import appDataSource from 'src/db/typeOrm.config';
import { DataSource, EntityNotFoundError, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { PutUpdateOrderDto } from './dto/put-update-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectEntityManager(appDataSource)
    private dataSource: DataSource,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    const order = this.orderRepository.create(createOrderDto);
    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find({
      relations: ['local', 'contract', 'local.account'],
    });
  }

  findOne(id: number) {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['local', 'contract', 'local.account'],
    });
  }

  async getNumber() {
    const number = await this.orderRepository
      .createQueryBuilder('orders')
      .select('max(number)', 'number')
      .getRawOne();

    return (number?.number || 1000) + 1;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const updateResult = await this.orderRepository.update(id, updateOrderDto);

    if (!updateResult.affected) {
      throw new EntityNotFoundError(Order, id);
    }

    return this.orderRepository.findOneBy({ id });
  }

  async putUpdate(id: number, updateOrderDto: PutUpdateOrderDto) {
    const updateResult = await this.orderRepository.update(id, updateOrderDto);

    if (!updateResult.affected) {
      throw new EntityNotFoundError(Order, id);
    }

    return this.orderRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const deleteResult = await this.orderRepository.delete(id);
    if (!deleteResult.affected) {
      throw new EntityNotFoundError(Order, id);
    }
  }

  async findContracts(contract: string, subcontract: string, type: string) {
    let where: { contract?: string; subcontract: string } = { subcontract };

    if (type === 'secundary') {
      where = { subcontract, contract };
    }

    const contracts = await this.dataSource.getRepository(Contract).find({
      where,
    });

    const residues = [];
    const services = [];
    let descriptionName = '';

    contracts.forEach(
      ({ typeOption, description, unitCode, type, businessType }) => {
        if (typeOption === 'waste') {
          residues.push({
            name: description,
            unitCode,
            type,
            businessType,
          });
        } else if (typeOption === 'operation') {
          descriptionName = description;
        } else {
          services.push({ description });
        }
      },
    );

    return {
      name: descriptionName,
      residues,
      services,
    };
  }
}
