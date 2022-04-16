import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementError } from "../createStatement/CreateStatementError";
import { IValueTransferDTO } from "./IValueTransferDTO";
import { inject, injectable } from "tsyringe";

@injectable()
class TransferValueUseCase {
    constructor(
      @inject('StatementsRepository')
      private statementsRepository: IStatementsRepository
    ) { }

    async execute({ description, user_id, type, amount, received_id }: IValueTransferDTO ) {
      
      const { balance } = await this.statementsRepository.getUserBalance({ user_id });

      if(balance < amount) {
        throw new CreateStatementError.InsufficientFunds();
      };

    const createTransfer = await this.statementsRepository.create({
      type,
      amount,
      user_id,
      received_id,
      description,
    })

    return createTransfer;
  };
};
export { TransferValueUseCase };  