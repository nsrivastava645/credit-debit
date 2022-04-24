import {TransactionsTable} from '../db/mysql/index.js';
import {HelperFunctions, UtilConstants, responseHandler} from "../utils/index.js";
import moment from "moment";
class CreditController {
    async CreditToCard (req, res) {
        const {amount, currency, type, txnType} = req.body;
        const {number: cardNumber, expirationMonth, expirationYear, cvv} = req.body.card;
        if(!HelperFunctions.validateCreditCard(cardNumber))
            return responseHandler(false, UtilConstants.StatusCodes.BadRequest, 'Error','Invalid Card Number', res, null, req, false);
        if(expirationMonth < 0 || expirationMonth > 12)
            return responseHandler(false, UtilConstants.StatusCodes.BadRequest, 'Error', 'Invalid Expiration Month', res, null, req, false);
        const validYear = HelperFunctions.validateYear(expirationYear);
        if(!validYear.status)
            return responseHandler(false, UtilConstants.StatusCodes.BadRequest, 'Error', validYear.message, res, null, req, false);
        const validMonth = HelperFunctions.validateMonth(expirationMonth);
        if(!validMonth.status)
            return responseHandler(false, UtilConstants.StatusCodes.BadRequest, 'Error', validMonth.message, res, null, req, false);
        if(cvv.length !== 3) 
            return responseHandler(false, UtilConstants.StatusCodes.BadRequest, 'Error', 'Invalid CVV', res, null, req, false);
        if(parseInt(txnType) === UtilConstants.Constants.txnTypes.debit)
            return responseHandler(false, UtilConstants.StatusCodes.BadRequest, 'Error', 'Kindly use the Debit service', res, null, req, false);
        if(parseInt(txnType) !== UtilConstants.Constants.txnTypes.credit)
            return responseHandler(false, UtilConstants.StatusCodes.BadRequest, 'Error', 'Invalid transaction type specified', res, null, req, false);
        
        const txnId = HelperFunctions.generateTxnId(); //unique transaction id
        let status = UtilConstants.Constants.transactionStatus.success; //assuming status to be success from the payment gateway
        // Credit Logic
        /* Credit logic where we Credit that amount to the user's account 
            and send the result/hook to the bank's server/payment gateway 
            if that responds with a success code we do that else we save to the db 
            if not successfull we make our status to Failed/Declined
        */
        //insert into db
        const insertionResult = await TransactionsTable.addTransaction(
            txnId, 
            txnType, 
            {
                amount,
                currency,
                type,
                cardNumber
            }, 
            {
                authorizationCode: txnId,
                status
            },
            moment().format('YYYY-MM-DD HH:mm:ss')
            );
            if(insertionResult) {
                return responseHandler(true, UtilConstants.StatusCodes.Created, 'Success', 'Transaction Successful', res, {
                    amount,
                    currency,
                    type,
                    card: {
                        number: parseInt(cardNumber)
                    },
                    authorizationCode: txnId,
                    status, 
                    time: moment().format('YYYY-MM-DD HH:mm:ss')
                }, req, false);
            }  else {
                return responseHandler(false, UtilConstants.StatusCodes.BadRequest, 'Success', 'Transaction Successful', res, {
                    amount,
                    currency,
                    type,
                    card: {
                        number: parseInt(cardNumber)
                    },
                    status : UtilConstants.Constants.transactionStatus.failure, 
                    time: moment().format('YYYY-MM-DD HH:mm:ss')
                }, req, false)
            }      
    }
}

export default new CreditController();