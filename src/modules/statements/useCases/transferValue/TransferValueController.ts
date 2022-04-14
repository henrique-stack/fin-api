import { TransferValueUseCase } from "./TransferValueUseCase";
import { Request, Response } from "express";
import { container } from "tsyringe";

enum OperationType {
    TRANSFER = 'transfer'
};

class CreateTransferValueController {
    async execute(request: Request, response: Response): Promise<Response> {
        const { amount, description } = request.body;
        const { id: sender_id } = request.user;
        const { user_id } = request.params;

        const transferValueUseCase = container.resolve(TransferValueUseCase);

        const splitURL = request.originalUrl.split('/');
        const type = splitURL[ splitURL.length -2 ] as OperationType

        const result = await transferValueUseCase.execute({
            sender_id,
            description,
            user_id,
            amount,
            type
        });

        return response.send(result)
    };
};

export { CreateTransferValueController };