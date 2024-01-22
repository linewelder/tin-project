export default class Validator {
    constructor(intl, inputs) {
        this.intl = intl;
        this.inputs = inputs;
        this.errors = [];
    }

    getErrors() {
        return this.errors;
    }

    validate(name, func, message) {
        if (!func(this.inputs[name])) {
            this.errors.push(message);
        }
    }

    notEmpty(name) {
        this.validate(
            name, x => x.length > 0,
            this.intl.formatMessage({
                id: `error.${name}.empty`
            }));
    }

    maxLength(name, max) {
        this.validate(
            name, x => x.length <= max,
            this.intl.formatMessage(
                { id: `error.${name}.max-length` },
                { max }));
    }
}
