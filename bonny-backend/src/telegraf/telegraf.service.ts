import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegrafService {

    generalChannel;

    constructor() {
        this.initTelegraf()
    }

    initTelegraf() {
        const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
        
        bot.command('start', (ctx) => {
            ctx.reply('Welcome to Bonny! Click the button below to open the demo app and start scanning receipts!', {
                reply_markup: {
                    inline_keyboard: [[{ text: "Open WebApp", web_app: { url: `https://demo.bonny.so` } }]]
                }
            });
        });
        
        bot.launch();
        
        process.once('SIGINT', () => bot.stop('SIGINT'));
        process.once('SIGTERM', () => bot.stop('SIGTERM'));
    }
    
}
