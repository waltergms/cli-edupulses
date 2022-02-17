import {Request, Response} from 'express';
import {Subscription} from '../../../../entities/Subscription';
import {UpdateSubscriptionUseCase} from './updateSubscriptionUseCase';

class UpdateSubscriptionController {
	constructor(private updateSubscriptionUseCase: UpdateSubscriptionUseCase) {}

	async handle(request: Request, response: Response): Promise<Response> {
		return new Promise((resolve, reject)=> {
			try {
				const userId:string = request.params.idUser;
				const subscriptionResult: Subscription = new Subscription(request.body.id, request.body);
				this.updateSubscriptionUseCase.execute(userId, subscriptionResult).then(async (result)=>{
					const subscriptionUpdated:boolean = result ? result : false;
					if (subscriptionUpdated) {
						resolve(response.status(200).send({
							message: 'Subscription atualizada com sucesso.',
							Subscription: subscriptionResult,
						}));
					}
					resolve(response.status(500).send({
						message: 'Não foi possível atualizar a Subscription.',
						Subscription: subscriptionResult,
					}));
				});
			} catch (error) {
				reject(error);
			}
		});
	}
}

export {UpdateSubscriptionController};
