'use strict';

import log from 'npmlog';

import UserRepository from '../services/user/user.dao';

function sendSimpleUserResponse(userId, bot) {
    return bot.sendMessage(userId, 'Hello. I can help you to fix your broken stuff. Write /help to know more.');
}

function sendRepairerUserResponse(userId, bot) {
    return bot.sendMessage(userId, 'You have been registered as a repairer. You will get requests as soon as new are submitted.');
}

function sendErrorResponse(userId, bot) {
    return bot.sendMessage(userId, 'Startup parameters were not recognized.');
}

export default class Start {

    constructor() {
        this.userDao = new UserRepository();
    }

    handle(message, bot) {
      const userId = message.from;
      const startId = message.option;

      log.verbose('Start', `Got start command with startId '${startId}'`);
      if (!startId) {
            return sendSimpleUserResponse(userId, bot);
        }

        return this.userDao.findRepairerByStartId(startId)
            .then(user => {
                if (user) {
                    user.userId = userId;

                    log.verbose('Start', `Found repairer user, will set userId for him`);
                    return this.userDao.save(user);
                } else {
                    log.verbose('Start', `User not found by given id`);
                    throw new Error('User not found');
                }
            })
            .then(() => {
                return sendRepairerUserResponse(userId, bot);
            })
            .catch((error) => {
                return sendErrorResponse(userId, bot);
            })
    }
}