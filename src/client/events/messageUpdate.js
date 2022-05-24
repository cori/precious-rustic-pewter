const { MessageEmbed, Util } = require("discord.js");
const { getter } = require("../../utils/emojis");

module.exports = async (client, oldMessage, newMessage) => {
  //---------------------BASE CHECK------------------------//
  if (oldMessage.author.bot) return;
  else if (oldMessage.channel.type === "dm") return;
  //-------------------------------------------------------//
  
  //--------------------BASE VARIABLES---------------------//
  const Emojis = new getter(client);
  const { Guild } = client.database;
  const server = await Guild.findById(oldMessage.guild.id);
  //-------------------------------------------------------//
  
  //------------------------EMBED--------------------------//
  if (server.logs.toggle) {
    const channel = client.channels.cache.get(server.logs.channel);

    const embed = new MessageEmbed()
      .setAuthor({
        name: "Mensagem Editada",
        iconURL: Emojis.get("edited").url,
      })
      .addField("Autor: ", oldMessage.author.toString())
      .addField("Canal: ", `<#${oldMessage.channelId}>`)
      .addField(
        "Mensagem Anterior: ",
        Util.cleanCodeBlockContent(oldMessage.content.substring(0, 220))
      )
      .addField(
        "Mensagem de Agora: ",
        Util.cleanCodeBlockContent(newMessage.content.substring(0, 220))
      )
      .setColor(process.env.colorEmbed);

    try {
      await channel.send({
        embeds: [embed],
      });
    } catch (err) {}
  }
  //-------------------------------------------------------//

  client.emit("messageCreate", newMessage);
};
