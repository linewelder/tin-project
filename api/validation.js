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

export function getPaginationParams(req) {
    var first = +req.query.first;
    if (!first || first < 0) first = 0;

    var count = +req.query.count;
    if (!count || count < 1) count = 8;

    return [first, count];
}
