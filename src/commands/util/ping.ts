import { stripIndents } from 'common-tags';
import { Message } from 'discord.js';
import { Command } from 'discord-akairo';

const RESPONSES: string[] = [
    'No',
    'Not happening',
    'Maybe later',
    stripIndents`:ping_pong: Pong! \`$(ping)ms\`
		Heartbeat: \`$(heartbeat)ms\``
];

export default class PingCommand extends Command {
    public constructor() {
        super('ping', {
            aliases: ['ping'],
            description: {
                content: 'Checks the bot\'s ping to the Discord servers'
            },
            category: 'util',
            ratelimit: 2
        });
    }

    public async exec(message: Message): Promise<Message | Message[]> {
        const msg = await message.util.send('Pinging...') as Message;

        return message.util.send(
            RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
                .replace('$(ping)', ((msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)).toString())
                .replace('$(heartbeat)', Math.round(this.client.ws.ping).toString())
        );
    }
}
