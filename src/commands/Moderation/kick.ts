import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import type { RaiCommandOptions } from '#root/typings/index.js';

@ApplyOptions<RaiCommandOptions>({
	description: 'Kick a member.',
	aliases: [],
	requiredUserPermissions: ['KickMembers'],
	requiredClientPermissions: ['KickMembers'],
	usage: ';kick <member> [reason]',
	examples: [';kick @pepe', ';kick @pepe because yes']
})
export class UserCommand extends Command {
	public override async messageRun(message: Message, args: Args) {
		try {
			const member = await args.pick('member'); // ;kick {member}=mention/id [reason] :: ;kick @ebon por puto -> nacho
			const reason = args.finished ? 'No reason has been entered.' : await args.rest('string');

			// true ? false : true

			if (member.id === message.guild?.ownerId) return message.reply('<:No:823630921353527307> You cant kick guild owner.');
			if (member.id === message.client.id) return message.reply('<:No:823630921353527307> I cant kick myself.');
			if (member.id === message.member?.id) return message.reply('<:No:823630921353527307> You cant kick yourself.');
			if (!member.kickable) return message.reply('⚠️ I cant kick this member, this can be because I have low permissions or role.');

			try {
				await message.guild?.members.kick(member.id, reason);
				return message.channel.send(`<:Yes:823630921625239632> \`${member.user.tag}\` has been kicked.`);
			} catch (err) {
				return message.channel.send(`<:No:823630921353527307> I was unable to kick the subject due to this error:\`${err}\``);
			}
		} catch (error) {
			return message.reply('⚠️ You need to input a member to work.');
		}
	}
}
