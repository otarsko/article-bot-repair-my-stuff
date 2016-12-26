'use strict';

import mongoose from 'mongoose';

const FixRequestSchema = new mongoose.Schema({
    userId: String,
    request: String,
    status: {
        type: String,
        enum : ['NEW','ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'DECLINED'],
        default : 'NEW'
    },
    repairer: String
});

export default mongoose.model('FixRequest', FixRequestSchema);