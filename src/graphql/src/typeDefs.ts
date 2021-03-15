import { gql } from 'apollo-server-express';

export default gql`
	type Guild {
		id: String!
		name: String!
		icon: String
		icon_hash: String
		splash: String
		owner_id: String
		region: String!
		afk_channel_id: String
		afk_timeout: Int!
		widget_enabled: Boolean
		widget_channel_id: String
		verification_level: Int!
		default_message_notifications: Int!
		explicit_content_filter: Int!
		roles: [GuildRole]!
		emojis: [GuildEmoji]!
		features: [String]!
		mfa_level: Int!
		application_id: String
		system_channel_id: String
		system_channel_flags: Int!
		rules_channel_id: String
		max_presences: Int
		max_members: Int!
		vanity_url_code: String
		description: String
		banner: String
		premium_tier: Int!
		premium_subscription_count: Int
		preferred_locale: String!
		public_updates_channel_id: String
		max_video_channel_users: String
		approximate_member_count: Int
		approximate_presence_count: Int
	}

	type PartialGuild {
		id: String!
		name: String!
		icon: String
		owner: Boolean!
		features: [String]!
		permissions: String!
	}

	type PermissionOverwrite {
		id: String!
		type: Int!
		allow: String!
		deny: String!
	}

	type GuildChannel {
		id: String!
		type: Int!
		guild_id: String
		position: Int
		permission_overwrites: [PermissionOverwrite]
		name: String
		topic: String
		nsfw: Boolean
		last_message_id: String
		bitrate: Int
		user_limit: Int
		rate_limit_per_user: Int
		icon: String
		parent_id: String
		last_pin_timestamp: String
	}

	type GuildRoleTag {
		bot_id: String
		premium_subscriber: String
		integration_id: String
	}

	type GuildRole {
		id: String!
		name: String!
		color: Int!
		hoist: Boolean!
		position: Int!
		permissions: String!
		managed: Boolean!
		mentionable: Boolean!
		tags: [GuildRoleTag]
	}

	type GuildEmoji {
		id: String
		name: String
		roles: [String]
		user: User
		require_colons: Boolean
		managed: Boolean
		animated: Boolean
		available: Boolean
	}

	type User {
		id: String!
		username: String!
		discriminator: String!
		avatar: String
		bot: Boolean
		system: Boolean
		mfa_enabled: Boolean
		locale: String
		verified: Boolean
		email: String
		flags: Int
		premium_type: Int
		public_flags: Int
	}

	type Case {
		caseId: Int!
		guildId: String!
		targetId: String!
		moderatorId: String!
		action: Int!
		roleId: String
		actionExpiration: String
		reason: String
		deleteMessageDays: String
		contextMessageId: String
		referenceId: Int
	}

	input GuildActionInput {
		guild_id: String!
		action: Int!
		reason: String
		moderatorId: String!
		targetId: String!
		contextMessageId: String
		referenceId: Int
	}

	type Query {
		guild(guild_id: String!): Guild
		guild_action(action: GuildActionInput): [Case]!
		guilds: [PartialGuild]
		guilds_oauth: [PartialGuild]
		guild_channels(guild_id: String!): [GuildChannel]!
		guild_roles(guild_id: String!): [GuildRole]!
		user(user_id: String!): User
	}
`;
