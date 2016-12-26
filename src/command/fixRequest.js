'use strict';

import log from 'npmlog';

import FixRequest from '../services/fixRequest/fixRequest.model'

export default class FixRequestHandler {
    handle(message, bot) {
        const fixRequest = new FixRequest({
            'userId': message.from,
            'request': message.option
        });

        return fixRequest.save()
            .then(() => {
                log.verbose('FixRequest', `Saved fix request ${fixRequest}`);
                return bot.sendMessage(message.from, 'Your request has been submitted. We will contact you soon.');
            })
            .catch(err => {
                log.error('FixRequest', `Was not able to save request ${fixRequest}, got error: ${err}`);
                return bot.sendMessage(message.from, 'Sorry we can not accept your request. Try later.');
            });
    }
}