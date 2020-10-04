const Discord = require('discord.js');
const client = new Discord.Client();
const  {getCharacter} = require('rickmortyapi');
require('dotenv').config();

async function GetChar(id){
  //!Personagem 1
  try {
    let {name, status, species, gender, origin, location,image, episode} = await getCharacter(id);

    const numOfEpisodes = episode.length;

    const nameMsg = `\nNome: ${name} \n`;

    let statusMsg =  `Status: ${status}   `;
    if(status === 'Alive') {
      statusMsg = statusMsg + `✅ \n`
    }
    else{
      statusMsg = statusMsg + `❌ \n`
    }
    const genreMsg = `Gênero: ${gender} \n`;
    const speciesMsg = `Espécie: ${species} \n`;
    const originMsg = `Origem: ${origin.name} \n`;
    const currentLocationMsg = `Localização atual: ${location.name} \n`
    const numOfEpisodesMsg =  `Aparece em ${numOfEpisodes} Episódios`;
    const info = nameMsg + statusMsg + genreMsg + speciesMsg + originMsg + currentLocationMsg + numOfEpisodesMsg;
    return {info, image};
  }
  catch(err){
    console.log(err);
  }
}
async function GetRandomChar(){
  //!Aleatorio
  try {
    const characters = await getCharacter();
    const charCount = characters.info.count;

    let {name, status, species, gender, origin, location,image, episode} = await getCharacter(Math.floor(Math.random() * Math.floor(parseInt(charCount))));

    const numOfEpisodes = episode.length;

    const nameMsg = `\nNome: ${name} \n`;

    let statusMsg =  `Status: ${status}   `;
    if(status === 'Alive') {
      statusMsg = statusMsg + `✅ \n`
    }
    else{
      statusMsg = statusMsg + `❌ \n`
    }
    const genreMsg = `Gênero: ${gender} \n`;
    const speciesMsg = `Espécie: ${species} \n`;
    const originMsg = `Origem: ${origin.name} \n`;
    const currentLocationMsg = `Localização atual: ${location.name} \n`
    const numOfEpisodesMsg =  `Aparece em ${numOfEpisodes} Episódios`;
    const info = nameMsg + statusMsg + genreMsg + speciesMsg + originMsg + currentLocationMsg + numOfEpisodesMsg;
    return {info, image};
  }
  catch(err){
    console.log(err);
  }
}
function Help(){
  const response =
    `\n > - !personagem número (1 até 671)  -> Ex: !personagem 1 \n` +
    ` > - !aleatorio -> retorna um personagem aleatório\n` +
    ` > - !ajuda -> ajuda 😎\n`
  return response
}
client.on('ready', () => {
    console.log(`"Connected as ${client.user.tag}`)

    client.user.setActivity("Getting riggity riggity wrecked, son!");


    //esse código lista todos os canais
    client.guilds.cache.forEach((guild) => {
        console.log(guild.name)
        guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
        })

    })

    // essa linha define o canal
    let generalChannel = client.channels.cache.get("762325896119582772");

    //essa envia uma imagem
    //generalChannel.send({ files: ['https://pbs.twimg.com/media/EPnlrZaWoAEmq08.jpg'] });

    //Essa linha serve pra adicionar o bot em servidores
    //https://discordapp.com/oauth2/authorize?client_id=<Bot_Client_ID>&scope=bot&permissions=0.

});

client.on('message', async(msg) => {
  if(msg.content.startsWith('!')){
    var parsedMessage = msg.content.split('!');
    parsedMessage[1] = parsedMessage[1].toLowerCase();
    if(parsedMessage.length < 1){
      msg.reply("Termina o comando ;-;");
    }
    if(parsedMessage[1] === 'ajuda'){
      msg.reply(Help());
    }


    if(parsedMessage[1].split(' ')[0] === "personagem"){
      const characterId = parsedMessage[1].split(' ')[1]

      const character = await GetChar(parseInt(characterId));
      msg.reply(character.info, new Discord.MessageAttachment(character.image));
    }
    if(parsedMessage[1] === "aleatorio" || parsedMessage[1] === "aleatório"){
      const character = await GetRandomChar();
      msg.reply(character.info, new Discord.MessageAttachment(character.image))
    }

  }

})
client.login(process.env.BOT_TOKEN);
