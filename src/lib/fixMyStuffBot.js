export default class TelegramBot {
    constructor (telegramBot) {
        this.bot = telegramBot;
    }

    sendMessage(userId, message, messageOptions) {
        return this.bot.sendMessage(userId, message, messageOptions);
    }
}