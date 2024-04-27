import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import type { RaiCommandOptions } from '#root/typings/index.js';

@ApplyOptions<RaiCommandOptions>({
	description: 'Ban a member.',
	aliases: [],
	requiredUserPermissions: ['BanMembers'],
	requiredClientPermissions: ['BanMembers'],
	usage: ';ban <member> [reason]',
	examples: [';ban @pepe', ';ban pepe yes']
})
export class UserCommand extends Command {
	public override async messageRun(message: Message, args: Args) {
		try {
			const member = await args.pick('member'); // ;ban {member}=mention/id [reason] :: ;ban @ebon por puto -> nacho
			const reason = args.finished ? 'No reason has been entered.' : await args.rest('string');

			// true ? false : true

			if (member.id === message.guild?.ownerId) return message.reply('<:No:823630921353527307> You cant ban guild owner.');
			if (member.id === message.client.id) return message.reply('<:No:823630921353527307> I cant ban myself.');
			if (member.id === message.member?.id) return message.reply('<:No:823630921353527307> You cant ban yourself.');
			if (!member.bannable) return message.reply('⚠️ I cant ban this member, this can be because I have low permissions or role.');

			try {
				await message.guild?.members.ban(member.id, { reason });
				return message.channel.send(`<:Yes:823630921625239632> \`${member.user.tag}\` has been banned.`);
			} catch (err) {
				return message.channel.send(`<:No:823630921353527307> I was unable to ban the subject due to this error:\`${err}\``);
			}
		} catch (error) {
			return message.reply('⚠️ You need to input a member to work.');
		}
	}
}
