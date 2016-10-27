'use strict';

import log from 'npmlog';
import mongoose from 'mongoose';
import Promise from 'bluebird';

import config from './config'
import Messenger from './lib/messenger';

mongoose.connect(config.mongo.uri);
mongoose.connection.on('error', function(err) {
    log.error('Main', 'MongoDB connection error: ' + err);
    process.exit(-1);
});

mongoose.Promise = Promise;

log.level = config.logLevel;

const telegram = new Messenger();
telegram.listen().then(() => log.info('Main', 'Bot started'));