import type { APIGuildInteraction } from 'discord-api-types/v8';
import { injectable } from 'tsyringe';
import { CommandModules } from '@yuudachi/types';
import type { ArgumentsOf, HistoryCommand } from '@yuudachi/interactions';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import Command from '../../Command';
import { checkMod, createHistory, send } from '../../util';

@injectable()
export default class implements Command {
	public readonly category = CommandModules.Moderation;

	private parse(args: ArgumentsOf<typeof HistoryCommand>) {
		return {
			member: args.user,
			hide: args.hide,
		};
	}

	public async execute(
		message: APIGuildInteraction,
		args: ArgumentsOf<typeof HistoryCommand>,
		locale: string,
	): Promise<void> {
		await checkMod(message, locale);

		const { member, hide } = this.parse(args);
		const embed = await createHistory(message, member);

		void send(message, { embed, flags: hide ? 64 : undefined });
	}
}
