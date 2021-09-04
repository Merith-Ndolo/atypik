const mongoose = require('mongoose');

const section_schema = new mongoose.Schema (
    {
        sectionId : {
            type: String,
            required: true
        },
        titre : {
            type: String
        },
        paragraph: {
            type: String
        },
        picture: {
            type: String,
        },
        reverse: {
            type: Boolean,
        }
    },
    { 
        timestamps: true,
    }
)

module.exports = mongoose.model('section', section_schema);