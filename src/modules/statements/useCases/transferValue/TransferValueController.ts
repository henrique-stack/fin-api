import { TransferValueUseCase } from "./TransferValueUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

enum OperationType {
    TRANSFER = 'transfer'
};

class CreateTransferValueController {
    async execute(request: Request, response: Response): Promise<Response> {
        const { amount, description } = request.body;
        const { id: user_id } = request.user;
        const { received_id } = request.params;

        const transferValueUseCase = container.resolve(TransferValueUseCase);

        const splitURL = request.originalUrl.split('/');
        const type = splitURL[ splitURL.length -2 ] as OperationType

        const result = await transferValueUseCase.execute({
            type,
            amount,
            user_id,
            description,
            received_id,
        });

        return response.send(result)
    };
};

export { CreateTransferValueController };