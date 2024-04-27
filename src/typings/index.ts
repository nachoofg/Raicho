import type { CommandJSON, CommandOptions } from '@sapphire/framework';

export interface RaiCommandOptions extends CommandOptions {
	examples?: string[];
	usage?: string;
}

export interface RaiCommmandJSON extends CommandJSON {
	examples: string | Readonly<string[]>;
	usage: string;
}
