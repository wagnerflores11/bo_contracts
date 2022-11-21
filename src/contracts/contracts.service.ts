import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindManyOptions, Raw } from 'typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.entity';
import appDataSource from 'src/db/typeOrm.config';
import { Local } from 'src/locals/entities/local.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectEntityManager(appDataSource)
    private dataSource: DataSource,
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  create(createContractDto: CreateContractDto) {
    const contract = this.contractRepository.create(createContractDto);
    return this.contractRepository.save(contract);
  }

  find(query?: string) {
    let options: FindManyOptions<Contract> = {
      relations: {
        locals: false,
      },
      order: {
        description: 'ASC',
      },
      take: 30,
    };

    if (query) {
      options = {
        ...options,
        where: [
          {
            contract: Raw((alias) => `${alias} ILIKE '%${query}%'`),
          },
          {
            subcontract: Raw((alias) => `${alias} ILIKE '%${query}%'`),
          },
          {
            line: Raw((alias) => `${alias} ILIKE '%${query}%'`),
          },
        ],
      };
    }

    return this.contractRepository.find(options);
  }

  findOne(id: number) {
    return this.contractRepository.findOneBy({ id });
  }

  async findSubContracts(ltcAccount: string) {
    const local = await this.dataSource
      .getRepository(Local)
      .findOneBy({ ltcAccount });

    const contracts = await this.contractRepository.find({
      where: { businessLTAccount: ltcAccount },
    });

    const objs = contracts.reduce((obj, current) => {
      if (!obj[current.subcontract]) obj[current.subcontract] = [];
      obj[current.subcontract].push({ ...current });
      return obj;
    }, {});
    const dataContract = Object.values(objs).map((contract: Contract[]) => {
      const residues = [];
      const services = [];
      let descriptionName = '';

      contract.forEach(
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
        contract_id: contract[0].id,
        name: descriptionName,
        residues,
        services,
        local: local ? local.city : null,
      };
    });

    return dataContract;
  }

  findOneByNavisionCode(navisionContract: string) {
    return this.contractRepository.findOneBy({
      contract: Raw((alias) => `${alias} ILIKE '%${navisionContract}%'`),
    });
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    const updateResult = await this.contractRepository.update(
      id,
      updateContractDto,
    );

    if (!updateResult.affected) {
      throw new EntityNotFoundError(Contract, id);
    }

    return this.contractRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const deleteResult = await this.contractRepository.delete(id);

    if (!deleteResult.affected) {
      throw new EntityNotFoundError(Contract, id);
    }
  }
}
