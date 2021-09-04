const mongoose = require('mongoose');

const param_schema = new mongoose.Schema (
    {
        paramId : {
            type: String,
            required: true
        },
        titre : {
            type: String
        },
        prix: {
            type: Number
        },
        temps: {
            type: String
        },
        picture: {
            type: String,
        }
    },
    { 
        timestamps: true,
    }
)

module.exports = mongoose.model('param', param_schema);