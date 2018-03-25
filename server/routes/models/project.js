const {mongoose} = require('../db/mongoose');

var Project = mongoose.model('Project', {
    name: {
        type: String
    },
    description: {
        type: String
    },
    skillsRequired: {
        type: Array
    },
    budget: {
        type: String
    },
    owner: {
        type: String
    },
    employee: {
        type: String
    }
});

module.exports = { Project };