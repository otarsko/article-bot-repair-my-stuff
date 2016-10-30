'use strict';

import _ from 'lodash';

var all = {
    telegram: {
        token: process.env.TELEGRAM_TOKEN || '',
        externalUrl: process.env.EXTERNAL_URL || '',
        port: process.env.PORT || 443,
        host: '0.0.0.0'
    },
    logLevel: 'verbose'
};

var envs = {
    'production': {
        logLevel: 'info',
        mongo: {
            uri:  process.env.MONGODB_URI ||
                process.env.MONGOHQ_URL ||
                process.env.OPENSHIFT_MONGODB_DB_URL +
                process.env.OPENSHIFT_APP_NAME,
            seedDB: false
        }
    },
    'development': {
        logLevel: 'verbose',
        mongo: {
            uri: 'mongodb://localhost/repairmystuff',
            seedDB: true
        }
    }
};
export default _.merge(all, envs[process.env.NODE_ENV]);
