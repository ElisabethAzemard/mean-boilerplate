/* SERVICE DEFINITION */
const MandatoryFields = {
    post: ['headline', 'articleBody'],
    identity: ['email', 'password'],
    register: ['email', 'password', 'repeatepassword', 'firstname', 'lastname', 'birthdate']
};

/* SERVICE FUNCTIONS EXPORT */
module.exports = { MandatoryFields };
