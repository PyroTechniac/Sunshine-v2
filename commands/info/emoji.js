const moment = require('moment');
const { MessageEmbed } = require('discord.js');
const { Command } = require('../../structures/Structures');
module.exports = class EmojiCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'emoji',
            aliases: ['emoji-info', 'emote'],
            group: 'info',
            memberName: 'emoji',
            description: 'Responds with detailed information on an emoji.',
            guildOnly: true,
            clientPermissions: ['EMBED_LINKS'],
            args: [
                {
                    key: 'emoji',
                    prompt: 'Which emoji would you like to get information on?',
                    type: 'custom-emoji',
                },
            ],
        });
    }
    run(message, { emoji }) {
        const embed = new MessageEmbed()
            .setColor(0x00AE86)
            .setThumbnail(emoji.url)
            .addField('❯ Name', emoji.name, true)
            .addField('❯ ID', emoji.id, true)
            .addField('❯ Creation Date', moment.utc(emoji.createdAt).format('MM/DD/YYYY h:mm A'), true)
            .addField('❯ Animated?', emoji.animated ? 'Yes' : 'No', true);
        return message.embed(embed);
    }
};