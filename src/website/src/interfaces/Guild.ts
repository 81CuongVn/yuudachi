import { RESTAPIPartialCurrentUserGuild, RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v8';

export interface GraphQLOAuthGuilds {
	data: {
		guilds: RESTGetAPICurrentUserGuildsResult;
	};
}

export interface GraphQLGuild {
	data: {
		guild: RESTAPIPartialCurrentUserGuild | null;
	};
}
