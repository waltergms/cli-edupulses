import {v4 as uuid} from 'uuid';

export class Subscription> {
	public id: string;

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	constructor(id?: string, ...args: any) {
		Object.assign(this, ...args);

		if (id) {
			this.id = id;
		} else if (id == '') {
			this.id = uuid();
		}
	}
}
