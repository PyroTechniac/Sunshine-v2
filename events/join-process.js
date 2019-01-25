const client = require('../server/client');
const newbie = require('../server/models');
const list = `\n\n- \`${client.commandPrefix}join\` will walk you through the process of joining as a new member\n- \`${client.commandPrefix}info\` will show you bot info\n- \`${client.commandPrefix}8ball\` will shake the Magic 8-Ball\n- \`${client.commandPrefix}d20\` will role a D20`;
module.exports = async (member) => {
  // console.log(member);
  await member.roles.add(client.myRoles.all.id);
  await member.send(`\`\`\`fix\n= Welcome!\n\`\`\`\nWelcome to the Ermahgerd Flermerngers Discord server! I'm Sunshine, the local bot. If you have any issues, you can use command \`modmail\` in this DM to message the mods (This is like email, not chat -- please send all info in **one** message.)\n\nEven if you're just here temporarily, **please make sure to abide by Rule #3 during your stay (Don't Be a Dick)** -- see ${client.myGuild.channels.find(channel => channel.name === 'rules').toString()} for more info. As a guest, you can see most of our channels (read-only) post in ${client.myChannels.public.toString()}, and join the Non-Members voice channel.\n\n\n\`\`\`fix\n= Joining\n\`\`\`\nIf you'd like to join as a new member, run command \`${client.commandPrefix}join\` (NOT FUNCITONAL) and I'll walk you through the process.\n\n\n\`\`\`fix\n= Bot Commands\n\`\`\`\n\nBot commands begin with \`${client.commandPrefix}\` and should generally be dropped in the ${client.myGuild.channels.find(channel => channel.name === 'ask-a-bot').toString()} channel. \`${client.commandPrefix}help\` will DM you the current command list. For most commands, you can get usage information by sending \`${client.commandPrefix}help COMMANDNAME\`. For example, \`${client.commandPrefix}help 8ball\` will tell you how to use the Magic 8-Ball.${list}`);
  await client.myChannels.public.send(`Hey ${member} -- welcome to the Ermahgerd Flermerngers Discord server! If you're here as a guest, please note Rule #3 -- **Don't Be a Dick.** We take that one **very** seriously.\n\nIf you're here to join as a new member...hooray! :awesome:\n\nFollow my DM for more instructions, and ping ${client.myRoles.mods} in ${client.myGuild.channels.find(channel => channel.name === 'ask-the-mods')} with any further questions`);
  const rosterMessage = await client.myChannels.roster.send(`New Guest ${member}`);
  await newbie.findOrCreate({
    where: {
      newbieUserId: member.id,
      gamerTag: '',
      tidbit: '',
      discordTag: member.user.tag,
      bungieLink: '',
      emailAddress: '',
      vouches: 0,
      vouchedBy: '',
      joinStatus: 'GUEST',
      rosterMessage: rosterMessage.id
    }
  });
};
