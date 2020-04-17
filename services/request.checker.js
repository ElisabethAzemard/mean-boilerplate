/* SERVICE DEFINITION */
const checkFields = (required, object) => {

    /* Declarations */
    const missing = [];
    const extra = [];

    /* CHECK FIELDS */

    // Check missing fields
    required.forEach((prop) => {
        if (!(prop in object)) missing.push(prop);
    });

    // check extra fields
    for (const prop in object) {
        if (required.indexOf(prop) === -1) extra.push(prop);
    }

    // set service state
    const ok = (extra.length === 0 && missing.length === 0);

    // return service state
    return { ok, extra, missing };

};



/* SERVICE FUNCTIONS EXPORT */
module.exports = {
    checkFields,
};
