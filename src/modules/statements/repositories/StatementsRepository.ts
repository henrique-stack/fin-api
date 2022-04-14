import { getRepository, Repository } from "typeorm";

import { Statement } from "../entities/Statement";
import { ICreateStatementDTO } from "../useCases/createStatement/ICreateStatementDTO";
import { IGetBalanceDTO } from "../useCases/getBalance/IGetBalanceDTO";
import { IGetStatementOperationDTO } from "../useCases/getStatementOperation/IGetStatementOperationDTO";
import { IStatementsRepository } from "./IStatementsRepository";

export class StatementsRepository implements IStatementsRepository {
  private repository: Repository<Statement>;

  constructor() {
    this.repository = getRepository(Statement);
  }

  async create({
    user_id,
    sender_id,
    amount,
    description,
    type
  }: ICreateStatementDTO): Promise<Statement> {
    const statement = this.repository.create({
      user_id,
      sender_id,
      amount,
      description,
      type
    });

    return await this.repository.save(statement);
  };

  async findStatementOperation({ statement_id, user_id }: IGetStatementOperationDTO): Promise<Statement | undefined> {
    return this.repository.findOne(statement_id, {
      where: { user_id }
    });
  }

  async getUserBalance({ user_id, sender_id, with_statement = false }: IGetBalanceDTO):
    Promise<
      { balance: number } | { balance: number, statement: Statement[] }
    >
    {
      // here is where only functionality is using per x,
      // for instance: if your use functionality CreateStatementUseCase, So you going use 'user_id',
      // if you use TransferUseCase you will use 'sender_id', because not is possible to use from both
      // in same time.

      const statement = await this.repository.find({
        where: [
          { user_id },
          { sender_id }
        ]
      });

      const balance = statement.reduce((acc, operation) => {
        const amount = operation.amount;
        const type = operation.type;

         switch (type) {
           case 'transfer':
           amount - acc;
           break;

           case 'withdraw':
           amount - acc;
           break;
           
           default:
           amount + acc;
           break;
         };
         return amount;
      }, 0);

      if (with_statement) {
        return {
          statement,
          balance
        }
      }
      
      return { balance }
    }
};
  