'use strict';

import log from 'npmlog';

import FixRequest from './request/fixRequest';
import Help from './help';
import MyRequests from './request/myRequests';
import Start from './start';
import AssignRequest from './request/assignRequest';

const DEFAULT_HANDLER_KEY = 'help';
export default class HandlerRouter {

    constructor() {
        this.handlers = {
            'help': new Help(),
            'fix': new FixRequest(),
            'myrequests': new MyRequests(),
            'start': new Start()
        };

        this.callbackQueryHandlers = {
            'assignRequest': new AssignRequest()
        }
    }

    getCommandHandler(message) {
        var command = message.command;
        log.verbose('HandlerRouter', `Looking for the handler for command ${command}`);

        if (command.indexOf('/') == 0) {
            command = command.substr(1);
        }
        return this.handlers[command] || this.handlers[DEFAULT_HANDLER_KEY];
    }

    getCallbackQueryHandler(message) {
        var key = message.data;
        log.verbose('HandlerRouter', `Looking for the callback query handler with key ${key}`);

        if (key.indexOf('_') > -1) {
            key = key.substr(0, key.indexOf('_'));
        }
        return this.callbackQueryHandlers[key];
    }
}