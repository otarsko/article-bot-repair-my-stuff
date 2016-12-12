'use strict';

import log from 'npmlog';

import UserRepository from '../../services/user/user.dao'

function getAssignRequestKeyboard(requestId) {
    return {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    { text: 'Assign to me', callback_data: `assignRequest_${requestId}` }
                ]
            ]
        })
    };
}

export default class FixRequestBroadcastHandler {

    constructor() {
        this.userDao = new UserRepository();
    }

    handle(fixRequest, bot) {

        return this.userDao.findAllRegisteredRepairers()
            .then(repairers => {
              repairers.forEach(repairer => {
                    log.verbose('FixRequestBroadcastHandler', `Send request to user ${JSON.stringify(fixRequest)}`);
                    bot.sendMessage(repairer.userId, `New request: ${fixRequest.request}`, getAssignRequestKeyboard(fixRequest._id))
                })
            })
            .catch(err => {
                log.error('FixRequestBroadcastHandler', `Was not able to broadcast fix request ${JSON.stringify(fixRequest)} because of ${JSON.stringify(err)}`);
            });
    }
}