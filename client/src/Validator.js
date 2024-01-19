export default class Validator {
    constructor(intl, inputs) {
        this.intl = intl;
        this.inputs = inputs;
        this.errors = [];
    }

    getErrors() {
        return this.errors;
    }

    validate(name, func, messageId) {
        if (!func(this.inputs[name])) {
            this.errors.push(this.intl.formatMessage({ id: messageId }));
        }
    }

    notEmpty(name) {
        this.validate(name, x => x.length > 0, `error.${name}.empty`);
    }
}
