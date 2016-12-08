'use strict';

import User from '../services/user/user.model'

export default class SeedDb {
    static seed() {
        return User.find({}).remove()
            .then(()=> {
                User.create({
                    startId: 'master1',
                    type: 'MASTER'
                }, {
                    startId: 'master2',
                    type: 'MASTER'
                }, {
                    startId: 'master3',
                    type: 'MASTER'
                })
            })
            .then(() => {
                console.log('Finished populating users');
            });
    }
}