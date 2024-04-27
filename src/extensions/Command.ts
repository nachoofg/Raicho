import { Command } from '@sapphire/framework';

import type { RaiCommandOptions, RaiCommmandJSON } from '#root/typings/index.js';

export default abstract class RaiCommandExtends extends Command {
	public examples: Readonly<string[]> = [];
	public usage!: Readonly<string>;

	protected constructor(context: any, options: RaiCommandOptions) {
		super(context, options);
		this.examples = options.examples ?? [''];
		this.usage = options.usage ?? '';
	}
	// eslint-disable-next-line
    public override toJSON(): RaiCommmandJSON {
		return {
			...super.toJSON(),
			examples: this.examples,
			usage: this.usage
		};
	}
}
