import type { Snowflake } from 'discord.js';
import type { Sql } from 'postgres';
import { container } from 'tsyringe';
import { type RawLockdown, transformLockdown } from './transformLockdown';
import { kSQL } from '../../tokens';

export async function getLockdown(guildId: Snowflake, channelId: Snowflake) {
	const sql = container.resolve<Sql<any>>(kSQL);

	const [lockdown] = await sql<[RawLockdown?]>`
		select *
		from lockdowns
		where guild_id = ${guildId}
			and channel_id = ${channelId}`;

	if (!lockdown) {
		return null;
	}

	return transformLockdown(lockdown);
}
