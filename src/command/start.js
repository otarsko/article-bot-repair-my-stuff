'use strict';

import log from 'npmlog';

import UserRepository from '../services/user/user.dao';

function sendSimpleUserResponse(userId, bot) {
    return bot.sendMessage(userId, 'Hello. I can help you to fix your broken stuff. Write /help to know more.');
}

function sendMasterUserResponse(userId, bot) {
    return bot.sendMessage(userId, 'You have been registered as master. You will get requests as soon as new are submitted.');
}

export default class Start {

    constructor() {
        this.userDao = new UserRepository();
    }

    handle(message, bot) {
        var userId = message.from;
        var startId = message.option;

        if (!startId) {
            log.verbose('Start', `Got start command with startId '${startId}'`);
            return sendSimpleUserResponse(userId, bot);
        }

        return this.userDao.findMasterByStartId(startId)
            .then(user => {
                if (user) {
                    user.userId = userId;

                    log.verbose('Start', `Found master user, will set userId for him`);
                    return this.userDao.save(user);
                } else {
                    log.verbose('Start', `User not found by given id`);
                    return sendSimpleUserResponse(userId, bot);
                }
            })
            .then(() => {
                return sendMasterUserResponse(userId, bot);
            })
    }
}