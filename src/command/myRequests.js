'use strict';

import log from 'npmlog';

import FixRequest from '../services/fixRequest/fixRequest.model'

const MESSAGE_OPTIONS = {
    parse_mode: 'Markdown'
};

function formatRequests(requests) {
    var message = 'Your requests:\n';
    requests.forEach(userRequest => {
        message += `*Request*: ${userRequest.request}\n`
        + `*Status*: ${userRequest.status}\n\n`;
    });

    return message;
}

export default class MyRequests {
    handle(message, bot) {
        var userId = message.from;
        return FixRequest.find({'userId': userId})
            .then((result) => {
                log.verbose('MyRequests', `For user ${userId} found next requests: ${JSON.stringify(result)}`);

                var message = '';
                if (result && result.length > 0) {
                    message = formatRequests(result);
                } else {
                    message = 'You have no requests yet.';
                }

                return bot.sendMessage(userId, message, MESSAGE_OPTIONS);
            })
            .catch(err => {
                log.error('MyRequests', `Was not able to find requests for user ${userId}, got error: ${err}`);
                return bot.sendMessage(userId, 'Sorry we were not able to find your requests. Try a bit later');
            });
    }
}