export default class FormattableError {
    constructor(formattable, messageOrId) {
        this.formattable = formattable;
        this.messageOrId = messageOrId;
    }

    format(intl) {
        if (!this.formattable) {
            return this.messageOrId;
        }

        return intl.formatMessage({ id: this.messageOrId });
    }
}
