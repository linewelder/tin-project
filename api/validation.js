export function tryValidate(res, object, schema) {
    const { error } = schema.validate(object);
    if (error) {
        res.status(400).json({
            error: error.details[0].message,
            formattable: false,
        });
        return false;
    }

    return true;
}
