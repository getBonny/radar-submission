import { Injectable } from '@nestjs/common';
import { Client, Guild, GuildMember, IntentsBitField, TextChannel } from 'discord.js';
import { GENERAL_CHANNEL_ID, GUILD_ID, HOLDER, HOLDER_ID, NEW_MEMBERS_ID, OG, OG_ID } from './bot.constants';
import * as cron from 'node-cron'
import { RolesUser } from './RolesUser';
import axios, { AxiosResponse } from 'axios';
import { DiscordUser } from './DiscordUser';
import { PublicKey } from '@solana/web3.js';
import { loadNftsByOwner, initMetaplex } from './metaplex.service';

const client = new Client({ intents: [IntentsBitField.Flags.Guilds] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
  

@Injectable()
export class BotService {

    generalChannel;

    constructor() {
        this.startBot()
        initMetaplex()
    }

    async startBot(): Promise<void> {
        await client.login(process.env.BOT_CLIENT_TOKEN)
        await this.initChannels();
        this.initTextInteractions(this.generalChannel);
        //this.startPolling();
    }

    async initChannels(): Promise<void> {
        this.generalChannel = await client.channels.fetch(GENERAL_CHANNEL_ID)
    }

    async verifyUser(publicKey: string, token: string, tokenType: string) {
        console.log(publicKey, token, tokenType)

        try {
    
            let nfts = await loadNftsByOwner(new PublicKey(publicKey))

            let roles = []
    
            if(nfts.length > 0) {
                roles.push(HOLDER)
                roles.push(OG)
            }
    
            let response: AxiosResponse = await axios.get('https://discord.com/api/users/@me',{
                headers: {
                    authorization: `${tokenType} ${token}`
                }
            })
    
            let user = {discord: response.data, roles: roles, publicKey: publicKey};

            console.log(user)

            const guild: Guild = await client.guilds.fetch(GUILD_ID)
    
            this.updateRolesForUser(user, guild);
    
        } catch(err) {
            console.error(err)
        }
    }
        
    async fetchUser(token: string): Promise<DiscordUser> {
        return (await axios.get<DiscordUser>('https://discord.com/api/users/@me', {headers: {'Authorization': `Bearer ${token}`}})).data
    }

    async updateRolesForUser(user: RolesUser, guild: Guild): Promise<void> {

        let discordUser: any = user.discord

        let fetchedUser: GuildMember = await guild.members.fetch(String(discordUser.id))

        for(let role of user.roles) {
            switch(role) {
                case HOLDER:
                    await fetchedUser.roles.add(HOLDER_ID);
                break;
                case OG:
                    await fetchedUser.roles.add(OG_ID);
                break;
            }
        }

        if(user.roles.length > 0) this.greetNewUser(user)

    }

    async greetNewUser(user: RolesUser): Promise<void> {
        let channel = await client.channels.fetch(NEW_MEMBERS_ID);
        (channel as TextChannel).send(`Oh look a new holder! Welcome <@${user.discord.id}>`)
    }

    initTextInteractions(generalChannel) {
        cron.schedule("0 0 12 * * *", () => {
           generalChannel.send("gm")
        })
    }

    startPolling(): void {
        cron.schedule("*/30 * * * * *", () => {
        })
    }
    
}
