'use strict';

import log from 'npmlog';

import FixRequest from './fixRequest';
import Help from './help';
import MyRequests from './myRequests';

const DEFAULT_HANDLER_KEY = 'help';
export default class HandlerRouter {

    constructor() {
        this.handlers = {
            'help': new Help(),
            'fix': new FixRequest(),
            'myrequests': new MyRequests()
        }
    }

    getCommandHandler(message) {
        let command = message.command;
        log.verbose('Handler', `Looking for the handler for command ${command}`);

        if (command.indexOf('/') == 0) {
            command = command.substr(1);
        }
        return this.handlers[command] || this.handlers[DEFAULT_HANDLER_KEY];
    }
}