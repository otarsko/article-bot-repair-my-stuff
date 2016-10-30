'use strict';

import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
    startId: String,
    type: {
        type: String,
        enum : ['SIMPLE','MASTER'],
        default : 'SIMPLE'
    },
    userId: String
});

export default mongoose.model('User', UserSchema);