'use strict';

import log from 'npmlog';

import User from './user.model'

export default class UserDao {

    findAllRegisteredMasters() {
        log.verbose('UserRepository', `Searching for all masters`);
        return User.find({'type' : 'MASTER', userId : {$ne : null}});
    }

    findMasterByStartId(startId) {
        log.verbose('UserRepository', `Searching for master with start id ${startId}`);
        return User.findOne({'startId' : startId, 'type' : 'MASTER'});
    }

    save(user) {
        log.verbose('UserRepository', `Saving user ${JSON.stringify(user)} `);
        return user.save();
    }
}