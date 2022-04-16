import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStatementUseCase } from './CreateStatementUseCase';

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

export class CreateStatementController {
  async execute(request: Request, response: Response) {
    const { amount, description } = request.body;
    const { id: user_id } = request.user;

    const splittedPath = request.originalUrl.split('/')
    const type = splittedPath[splittedPath.length - 1] as OperationType;

    const createStatement = container.resolve(CreateStatementUseCase);

    const statement = await createStatement.execute({
      description,
      user_id,
      amount,
      type,
    });

    return response.status(201).json(statement);
  }
}
