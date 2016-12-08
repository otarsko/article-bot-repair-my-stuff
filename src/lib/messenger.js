'use strict';

import log from 'npmlog';
import TelegramBot from "node-telegram-bot-api";

import config from '../config';
import HandlerRouter from "../command";
import Message from "./message";
import CallbackQueryMessage from "./callbackQueryMessage";
import FixMyStuffBot from "./fixMyStuffBot";

const handlerRouter = new HandlerRouter();

export default class Messenger {
    constructor() {
        if (process.env.NODE_ENV === 'production') {
            this.bot = new TelegramBot(config.telegram.token, { webHook: { port: config.telegram.port, host: config.telegram.host } });
            this.bot.setWebHook(config.telegram.externalUrl + ':443/bot' + config.telegram.token);
        } else {
            this.bot = new TelegramBot(config.telegram.token, { polling: {timeout: 10, interval: 100} });
        }
        this.botWrapper = new FixMyStuffBot(this.bot);
    }

    listen() {
        this.bot.on('text', this.handleText.bind(this));
        this.bot.on('callback_query', this.handleCallbackQuery.bind(this));

        this.botWrapper = new FixMyStuffBot(this.bot);
        return Promise.resolve();
    }

    handleText(msg) {
        var message = Message.from(msg);
        handlerRouter.getCommandHandler(message)
            .handle(message, this.botWrapper)
            .catch(err => {
                log.error('Messenger', `Got error from command handler: ${err}`);
            });
    }

    handleCallbackQuery(msg) {
      var message = CallbackQueryMessage.from(msg);
      handlerRouter.getCallbackQueryHandler(message)
        .handleCallbackQuery(message, this.botWrapper)
        .catch(err => {
          log.error('Messenger', `Got error from callback query handler: ${err}`);
        });
    }
}