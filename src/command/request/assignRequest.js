'use strict';

import FixRequest from '../../services/fixRequest/fixRequest.model'

export default class AssignRequestHandler {

  handleCallbackQuery(message, bot) {

    var requestId = message.data.split('_')[1];

    return FixRequest.findById(requestId)
      .then(result => {
        if (!result) {
          return bot.sendMessage(message.from, 'Sorry but we found no such request.');
        }
        if (result.repairer) {
          return bot.sendMessage(message.from, 'Request already assigned to another repairer.');
        }

        result.repairer = message.from;
        result.status = 'ASSIGNED';
        return result.save()
          .then(() => {
            return bot.sendMessage(message.from, 'Request has been assigned to you. Hurry up, somebody is waiting for the hero.');
          });
      });
  }
}