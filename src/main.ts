import { RaiClient } from './lib/Raicho.js';
import { container } from '@sapphire/framework';

import '#lib/setup';

const client = new RaiClient();

const main = async () => {
	try {
		console.clear();
		await client.login();
	} catch (error) {
		container.logger.error(error);
		client.destroy();
		process.exit(1);
	}
};

main().catch(container.logger.error.bind(container.logger));
