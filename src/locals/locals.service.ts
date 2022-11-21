import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, EntityNotFoundError, Raw, Repository } from 'typeorm';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { Local } from './entities/local.entity';
import replaceText from '../utils/replaceText';

@Injectable()
export class LocalsService {
  constructor(
    @InjectRepository(Local)
    private localRepository: Repository<Local>,
  ) {}

  create(createLocalDto: CreateLocalDto) {
    const account = this.localRepository.create(createLocalDto);
    return this.localRepository.save(account);
  }

  getAll() {
    return this.localRepository.find();
  }

  findOne(id: number) {
    return this.localRepository.findOneBy({ id });
  }

  findByAccount(accountId: number, query?: string) {
    const queryBuilder = this.localRepository
      .createQueryBuilder('locals')
      .where('active = true')
      .andWhere('locals.account = :accountId', { accountId })
      .orderBy('name')
      .take(30);

    if (query) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('name ILIKE :name', {
            name: `%${query}%`,
          })
            .orWhere('nif ILIKE :nif', { nif: `%${query}%` })
            .orWhere('ltc_account ILIKE :ltcAccount', {
              ltcAccount: `%${query}%`,
            })
            .orWhere('ltf_account ILIKE :ltfAccount', {
              ltfAccount: `%${query}%`,
            });
        }),
      );
    }

    return queryBuilder.getMany();
  }

  findAll(query?: string) {
    const columns = [
      'locals.id',
      'locals.name',
      'locals.address',
      'locals.zipcode',
      'locals.city',
      'locals.country',
      'locals.nif',
      'account.id',
      'account.name',
      'account.customerAccount',
      'account.supplierAccount',
      'account.address',
      'account.city',
      'account.zipcode',
      'account.email',
      'account.nif',
    ];

    const queryBuilder = this.localRepository
      .createQueryBuilder('locals')
      .select(columns)
      .leftJoin('locals.account', 'account')
      .where('locals.active = true')
      .orderBy('locals.name')
      .take(30);

    if (query) {
      const search = query.split(' ');

      search.forEach((query, i) => {
        queryBuilder
          .andWhere(
            new Brackets((qb) => {
              qb.orWhere(`RA(locals.name) ILIKE :${i}`)
                .orWhere(`RA(locals.searchName) ILIKE :${i}`)
                .orWhere(`RA(locals.city) ILIKE :${i}`)
                .orWhere(`RA(locals.nif) ILIKE :${i}`)
                .orWhere(`RA(locals.email) ILIKE :${i}`)
                .orWhere(`RA(locals.ltcAccount) ILIKE :${i}`)
                .orWhere(`RA(locals.ltfAccount) ILIKE :${i}`)
                .orWhere(`RA(account.name) ILIKE :${i}`)
                .orWhere(`RA(account.nif) ILIKE :${i}`)
                .orWhere(`RA(account.email) ILIKE :${i}`)
                .orWhere(`RA(account.city) ILIKE :${i}`)
                .orWhere(`RA(account.customerAccount) ILIKE :${i}`)
                .orWhere(`RA(account.supplierAccount) ILIKE :${i}`);
            }),
          )
          .setParameter(i.toString(), `%${replaceText(query)}%`);
      });
    }

    return queryBuilder.getMany();
  }

  findOneByNavisionCode(navisionAccount: string) {
    return this.localRepository.findOneBy([
      {
        ltcAccount: Raw((alias) => `${alias} ILIKE '%${navisionAccount}%'`),
      },
      {
        ltfAccount: Raw((alias) => `${alias} ILIKE '%${navisionAccount}%'`),
      },
    ]);
  }

  async update(id: number, updateLocalDto: UpdateLocalDto) {
    const updateResult = await this.localRepository.update(id, updateLocalDto);

    if (!updateResult.affected) {
      throw new EntityNotFoundError(Local, id);
    }

    return this.localRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const deleteResult = await this.localRepository.delete(id);
    if (!deleteResult.affected) {
      throw new EntityNotFoundError(Local, id);
    }
  }
}
