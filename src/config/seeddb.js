'use strict';

import User from '../services/user/user.model'

export default class SeedDb {
    static seed() {
        return User.find({}).remove()
            .then(()=> {
                User.create({
                    startId: 'repairer1',
                    type: 'REPAIRER'
                }, {
                    startId: 'repairer2',
                    type: 'REPAIRER'
                }, {
                    startId: 'repairer3',
                    type: 'REPAIRER'
                })
            })
            .then(() => {
                console.log('Finished populating users');
            });
    }
}