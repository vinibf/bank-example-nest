import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentAccountController } from './controllers/current-account.controller';
import { OperationController } from './controllers/operation.controller';
import { CurrentAccount } from './entities/current-account.entity';
import { Operation } from './entities/operation.entity';
import { CurrentAccountService } from './services/current-account.service';
import { OperationService } from './services/operation.service';


@Module({
  imports: [TypeOrmModule.forFeature([CurrentAccount, Operation])],
  controllers: [OperationController, CurrentAccountController],
  providers: [CurrentAccountService, OperationService],
})
export class BankModule {}
