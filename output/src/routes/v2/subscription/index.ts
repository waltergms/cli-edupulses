import express from 'express';
import * as bodyParser from 'body-parser';

import * as validateSchema from '../../../middleware/validateSchema';
import {SubscriptionValidationSchema} from '../../../modules/subscription/repositories/SubscriptionValidationSchema';

import {listSubscriptionController} from '../../../modules/subscription/useCases/listSubscription';
import {createSubscriptionController} from '../../../modules/subscription/useCases/createSubscription';
import {updateSubscriptionController} from '../../../modules/subscription/useCases/updateSubscription';
import {deleteSubscriptionController} from '../../../modules/subscription/useCases/deleteSubscription';


const SubscriptionRoutes = express();
SubscriptionRoutes.use(bodyParser.json());

SubscriptionRoutes.get(
	'/',
	validateSchema.validateSchema(SubscriptionValidationSchema.get),
	async (request, response) => {
		listSubscriptionController.handle(request, response);
	}
);

SubscriptionRoutes.post(
	'/',
	validateSchema.validateSchema(SubscriptionValidationSchema.create),
	async (request, response) => {
		createSubscriptionController.handle(request, response);
	}
);

SubscriptionRoutes.put(
	'/:idSubscription',
	validateSchema.validateSchema(SubscriptionValidationSchema.update),
	async (request, response) => {
		updateSubscriptionController.handle(request, response);
	}
);

SubscriptionRoutes.delete(
	'/:idSubscription',
	validateSchema.validateSchema(SubscriptionValidationSchema.delete),
	async (request, response) => {
		deleteSubscriptionController.handle(request, response);
	}
);

export {SubscriptionRoutes};
