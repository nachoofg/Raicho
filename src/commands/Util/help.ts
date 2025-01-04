import { ApplyOptions } from '@sapphire/decorators';
import { Args, Command } from '@sapphire/framework';
import { EmbedBuilder, TextChannel, type Message } from 'discord.js';
import type { RaiCommandOptions } from '#root/typings/index.js';
import type RaiCommandExtends from '#root/extensions/Command.js';

@ApplyOptions<RaiCommandOptions>({
	description: 'Show the commands of the bot.',
	aliases: ['commands'],
	detailedDescription: {
		usage: ';help [command]',
		examples: [';help', ';help ban']
	}
})
export class HelpCommand extends Command {
	public override async messageRun(message: Message, args: Args) {
		const { client } = this.container;
		const commandStore = client.stores.get('commands');

		if (!commandStore) {
			return (message.channel as TextChannel).send('⚠️ An error occurred while trying to get the commands.');
		}

		const embed = new EmbedBuilder()
			.setColor('#2B2D31')
			.setTimestamp()
			.setFooter({ text: 'type ;help <command> to get extended help about a specific command.' });

		if (args.finished) {
			const categories: Map<string, Command[]> = new Map();

			for (const command of commandStore.values()) {
				const categoryName = command.category || 'No category';
				const categoryCommands = categories.get(categoryName) || [];
				categories.set(categoryName, [...categoryCommands, command]);
			}

			for (const [categoryName, commands] of categories.entries()) {
				const commandList = commands.map((command) => `\`${command.name}\``).join(', ');
				embed.addFields({ name: categoryName, value: commandList });
			}
		} else {
			const arg = await args.pick('string');
			const command = commandStore.get(arg.toLowerCase()) as RaiCommandExtends;

			if (!command) {
				return (message.channel as TextChannel).send(`⚠️ The specified command \`${arg}\` does not exist.`);
			}

			embed
				.setTitle(`Command ${command.name}`)
				.setDescription(command.description)
				.addFields(
					{ name: 'Category', value: command.category || 'No category' },
					{ name: 'Aliases', value: command.aliases?.length ? command.aliases.map((alias) => `\`${alias}\``).join(', ') : 'No aliases.' },
					{
						name: 'Examples',
						value: command.examples ? command.examples.map((example) => `\`${example}\``).join('\n') : 'No examples provided.'
					}
				);
		}

		return message.reply({ embeds: [embed] });
	}
}
