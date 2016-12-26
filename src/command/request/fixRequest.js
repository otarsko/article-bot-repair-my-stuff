'use strict';

import log from 'npmlog';

import FixRequest from '../../services/fixRequest/fixRequest.model'
import FixRequestBroadcast from './fixRequest.broadcast'

export default class FixRequestHandler {

    constructor() {
        this.broadcaster = new FixRequestBroadcast();
    }

    handle(message, bot) {
        const fixRequest = new FixRequest({
            'userId': message.from,
            'request': message.option
        });

        return fixRequest.save()
            .then(() => {
                log.verbose('FixRequest', `Saved fix request ${JSON.stringify(fixRequest)}`);

                this.broadcaster.handle(fixRequest, bot);
                return bot.sendMessage(message.from, 'Your request has been submitted. We will contact you soon.');
            })
            .catch(err => {
                log.error('FixRequest', `Was not able to save request ${JSON.stringify(fixRequest)}, got error: ${JSON.stringify(err)}}`);
                return bot.sendMessage(message.from, 'Sorry we can not accept your request. Try later.');
            });
    }
}