'use strict';

import log from 'npmlog';

import UserRepository from '../../services/user/user.dao'

export default class FixRequestBroadcastHandler {

    constructor() {
        this.userDao = new UserRepository();
    }

    handle(fixRequest, bot) {

        this.userDao.findAllRegisteredMasters()
            .then(masters => {
                masters.forEach(master => {
                    log.verbose('FixRequestBroadcastHandler', `Rend request to user ${JSON.stringify(fixRequest)}`);
                    bot.sendMessage(master.userId, `New request: ${fixRequest.request}`)
                })
            })
            .catch(err => {
                log.error('FixRequestBroadcastHandler', `Was not able to broadcast fix request ${JSON.stringify(fixRequest)} because of ${JSON.stringify(err)}`);
            });
    }
}