export class Constants {
    static txnTypes = {
        credit: 1,
        debit: 2
    };
    static cardTypes = {
        creditCard: 'creditCard',
        debitCard: 'debitCard',
    };
    static transactionStatus = {
        success: 'Success',
        failure: 'Failed',
        declined: 'Declined'
    }
}
export class StatusCodes {
    static Ok = 200;
    static Created = 201;
    static Accepted = 202;
    static NoContent = 204;
    static MultiStatus = 207;
    static BadRequest = 400;
    static Unauthorised = 401;
    static NotFound = 404;
    static NotAllowed = 405;
    static NotAcceptable = 406;
    static Conflict = 409;
    static AccountBlocked = 413;
    static UnprocessableEntity = 422;
    static TooManyRequests = 429;
    static InternalServerError = 500;
    static BadGateway = 502;
    static ServiceUnavailable = 503;
    static TokenExpired = 800;
}