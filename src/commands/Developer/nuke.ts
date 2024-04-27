import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { Message, TextChannel } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'Nuke',
	aliases: ['n'],
	preconditions: ['OwnerOnly']
})
export class NukeCommand extends Command {
	public override async messageRun(message: Message) {
		const channel = message.channel as TextChannel;
		if (!channel) return message.reply('⚠ You need to do this in a text channel.');
		const { position } = channel;
		const categorie = channel.parentId;
		if (!channel.deletable) return message.reply('⚠ I cant delete this channel.');
		void channel.delete('Nuke');
		return channel
			.clone({ parent: categorie, position })
			.then((a) => a.setPosition(position))
			.then((ch) => ch.send('✨ This is the new channel, the old one was nukeed.'));
	}
}
