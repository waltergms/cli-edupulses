import {Subscription} from '../../../../entities/Subscription';
import {Request, Response} from 'express';
import {ListSubscriptionUseCase} from './ListSubscriptionUseCase';


class ListSubscriptionController {
	constructor(private listSubscriptionUseCase: ListSubscriptionUseCase) {}

	async handle(request: Request, response: Response): Promise<Response|undefined> {
		try {
			this.listSubscriptionUseCase.execute(request).then((result)=>{
				const subscriptionList: Subscription[] = Object.values(result);
				return response.send(subscriptionList);
			});
		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error',
			});
		}
	}
}

export {ListSubscriptionController};
