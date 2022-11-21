import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Raw } from 'typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    const account = this.accountRepository.create(createAccountDto);
    return this.accountRepository.save(account);
  }

  find(query?: string) {
    let options: FindManyOptions<Account> = {
      relations: {
        locals: false,
      },
      order: {
        name: 'ASC',
      },
      take: 30,
    };

    if (query) {
      options = {
        ...options,
        where: [
          {
            name: Raw((alias) => `${alias} ILIKE '%${query}%'`),
          },
          {
            nif: Raw((alias) => `${alias} ILIKE '%${query}%'`),
          },
          {
            customerAccount: Raw((alias) => `${alias} ILIKE '%${query}%'`),
          },
          {
            supplierAccount: Raw((alias) => `${alias} ILIKE '%${query}%'`),
          },
        ],
      };
    }

    return this.accountRepository.find(options);
  }

  findOne(id: number) {
    return this.accountRepository.findOneBy({ id });
  }

  findOneByNavisionCode(navisionAccount: string) {
    return this.accountRepository.findOneBy([
      {
        customerAccount: Raw(
          (alias) => `${alias} ILIKE '%${navisionAccount}%'`,
        ),
      },
      {
        supplierAccount: Raw(
          (alias) => `${alias} ILIKE '%${navisionAccount}%'`,
        ),
      },
    ]);
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const updateResult = await this.accountRepository.update(id, {
      ...updateAccountDto,
      syncAt: new Date(),
    });

    if (!updateResult.affected) {
      throw new EntityNotFoundError(Account, id);
    }

    return this.accountRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const deleteResult = await this.accountRepository.delete(id);

    if (!deleteResult.affected) {
      throw new EntityNotFoundError(Account, id);
    }
  }
}
