import {DeleteSubscriptionUseCase} from './deleteSubscriptionUseCase';
import {Request, Response} from 'express';

class DeleteSubscriptionController {
	constructor(private deleteSubscriptionUseCase: DeleteSubscriptionUseCase) {}

	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const userId:string = request.params.idUser;
			const idSubscription: string = request.body.id;
			if (idSubscription) {
				const resultDelete:boolean = await this.deleteSubscriptionUseCase.execute(userId, idSubscription);
				return response.status(200).send(resultDelete);
			} else {
				return response.status(500).send('Can\'t delete a Subscription without Subscriptionid.');
			}
		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error',
			});
		}
	}
}

export {DeleteSubscriptionController};
