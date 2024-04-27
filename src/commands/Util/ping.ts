import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { RaiCommandOptions } from '#root/typings/index.js';
import type { Message } from 'discord.js';

@ApplyOptions<RaiCommandOptions>({
	description: 'Show the ms',
	aliases: ['pong', 'p']
})
export class UserCommand extends Command {
	public override async messageRun(message: Message) {
		console.log(message.content);
		return message.reply(`Pong! (gateway: ${message.client.ws.ping})`);
	}
}
