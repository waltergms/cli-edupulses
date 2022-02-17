import {Request, Response} from 'express';
import {CreateSubscriptionUseCase} from './CreateSubscriptionUseCase';
import {ICreateSubscriptionRequestDTO} from './CreateSubscriptionDTO';

class CreateSubscriptionController {
	constructor(private createSubscriptionUseCase: CreateSubscriptionUseCase) {}

	async handle(request: Request, response: Response): Promise<Response> {
		const SubscriptionCreate: ICreateSubscriptionRequestDTO = {...request.body};
		const idUser: string = request.params.idUser;

		return new Promise((resolve, reject) => {
			try {
				this.createSubscriptionUseCase
					.execute(idUser, SubscriptionCreate)
					.then((result) => {
						response.send(result).status(200);
						resolve(result);
					})
					.catch((error) => {
						reject(error);
					});
			} catch (error) {
				reject(error);
			}
		});
	}
}

export {CreateSubscriptionController};
