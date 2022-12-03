module.exports = {
    name: 'ready',
    once: true,
    async execute(disclient)
    {
        console.log(`Ready !!! ${disclient.user.tag} is logged in and online.`);
        //await client.say('siennamaria', '!trackrat');
    }
}