'use strict';

export default class Message {

    static from(telegramMessage) {
        let command,
            option;

        if (telegramMessage.text.indexOf(' ') > -1) {
            const parts = telegramMessage.text.split(' ');
            command = parts.shift();
            option = parts.join(' ');
        } else {
            command = telegramMessage.text;
        }

        return {
            from: telegramMessage.from.id,
            command: command,
            option: option
        }
    }
}