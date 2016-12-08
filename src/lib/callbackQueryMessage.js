export default class CallbackQueryMessage {
  static from(telegramMessage) {
    return {
      from: telegramMessage.from.id,
      data: telegramMessage.data
    }
  }
}