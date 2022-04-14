import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { Statement } from "../../entities/Statement";
import { CreateStatementError } from "../createStatement/CreateStatementError";
import { ITransferValueDTO } from "./ITransferValueDTO";
import { inject, injectable } from "tsyringe";

@injectable()
class TransferValueUseCase {
    constructor(
        @inject("StatementsRepository")
        private statementsRepository: IStatementsRepository
    ) { }

      // aqui o sender_id está sendo o remetente da transferência.
    async execute({ description, user_id, type, amount, sender_id }: ITransferValueDTO) {
      const { balance } = await this.statementsRepository.getUserBalance({ sender_id });

      // if (balance < amount) {
      //   throw new CreateStatementError.InsufficientFunds();
      // };
      console.log('Balance', balance)
      console.log('Amount', amount)
      const result = await this.statementsRepository.create({
        amount,
        description,
        sender_id,
        user_id,
        type
      });

    return result;
  };
};
export { TransferValueUseCase };  