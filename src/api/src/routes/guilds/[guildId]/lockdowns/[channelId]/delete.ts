import type { Snowflake } from 'discord-api-types/v8';
import { forbidden, notFound } from '@hapi/boom';
import type { Request, Response } from 'polka';
import { injectable } from 'tsyringe';
import { Route } from '@yuudachi/http';
import { HttpException } from '@yuudachi/rest';

import LockdownManager from '../../../../../managers/LockdownManager';

@injectable()
export default class DeleteLockdownRoute extends Route {
	public constructor(public readonly lockdownManager: LockdownManager) {
		super();
	}

	public async handle(req: Request, res: Response) {
		let lockdown: Snowflake;
		try {
			lockdown = await this.lockdownManager.delete(req.params.guildId as Snowflake);
		} catch (e) {
			if (e instanceof HttpException) {
				switch (e.status) {
					case 403:
						throw forbidden(e.body);
					case 404:
						throw notFound(e.body);
				}
			}

			throw e;
		}

		res.statusCode = 201;
		res.setHeader('content-type', 'application/json; charset=utf-8');
		res.end(JSON.stringify({ lockdown }));
	}
}
