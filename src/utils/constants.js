export const STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export const RESPONSE_MESSAGES = {
    NO_TOKEN: 'No token, authorization denied',
    TOKEN_NOT_VALID: 'Token is not valid',
    NOT_FOUND: 'Not found',
    BAD_PARAMETER: 'Bad parameter',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    ACCOUNT_ALREADY_EXISTS: 'Account already exists',
    INVALID_CREDENTIALS: 'Invalid Credentials',
    DELETED: (id) => 'Successfully deleted record number: ' + id,
};

export const INITIAL_RESPONSE = {
    status: STATUS_CODES.INTERNAL_SERVER_ERROR,
    msg: { msg: RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR },
};
