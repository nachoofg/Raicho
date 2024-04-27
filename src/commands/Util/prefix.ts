import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'Say what its the prefix',
	aliases: []
})
export class UserCommand extends Command {
	public override async messageRun(message: Message) {
		return message.reply(`The prefix of the bot its \`;\`\nRemember you can use the commands with a mention, example:\`@Pyracchi ping\``);
	}
}
