export default class TelegramBot {
    constructor (telegramBot) {
        this.bot = telegramBot;
    }

    sendMessage(userId, message, messageOptions) {
        this.bot.sendMessage(userId, message, messageOptions);
    }
}