'use strict';

import log from 'npmlog';

import User from './user.model'

export default class UserDao {

    findAllRegisteredRepairers() {
        log.verbose('UserRepository', `Searching for all repairers`);
        return User.find({'type' : 'REPAIRER', userId : {$ne : null}});
    }

    findRepairerByStartId(startId) {
        log.verbose('UserRepository', `Searching for repairer with start id ${startId}`);
        return User.findOne({'startId' : startId, 'type' : 'REPAIRER'});
    }

    save(user) {
        log.verbose('UserRepository', `Saving user ${JSON.stringify(user)} `);
        return user.save();
    }
}