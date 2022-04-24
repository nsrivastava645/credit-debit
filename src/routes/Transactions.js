import express from 'express';
import {body} from "express-validator";
import {DebitController, CreditController} from "../controllers/index.js";
import { RequestValidator } from '../middlewares/index.js';

const router = express.Router();

router
    .post(
        '/debit',
        [
            body('amount').exists().withMessage('amount is required'),
            body('amount').isNumeric().withMessage('amount must be a decimal number'),
            body('currency').exists().withMessage('currency is required'),
            body('currency').isString().withMessage('currency must be a string'),
            body('txnType').exists().withMessage('txnType is required'),
            body('txnType').isNumeric().withMessage('txnType must be numeric'),
            body('type').exists().withMessage('type is required'),
            body('type').isString().withMessage('type must be a string'),
            body('card').exists().withMessage('card details required'),
            body('card').isObject().withMessage('card details must be an object'),
            body('card.cvv').exists().withMessage('cvv required'),
            body('card.cvv').isNumeric().withMessage('cvv must be numeric'),
            body('card.expirationMonth').exists().withMessage('expirationMonth required'),
            body('card.expirationMonth').isNumeric().withMessage('expirationMonth must be numeric'),
            body('card.expirationYear').exists().withMessage('expirationYear required'),
            body('card.expirationYear').isNumeric().withMessage('expirationYear must be numeric'),
            body('card.number').exists().withMessage('number required'),
            body('card.number').isNumeric().withMessage('card number must be numeric'),
        ],
        RequestValidator.errorHandler,
        DebitController.DebitFromCard)

    .post(
        '/credit',
        [
            body('amount').exists().withMessage('amount is required'),
            body('amount').isNumeric().withMessage('amount must be a decimal number'),
            body('currency').exists().withMessage('currency is required'),
            body('currency').isString().withMessage('currency must be a string'),
            body('txnType').exists().withMessage('txnType is required'),
            body('txnType').isNumeric().withMessage('txnType must be numeric'),
            body('type').exists().withMessage('type is required'),
            body('type').isString().withMessage('type must be a string'),
            body('card').exists().withMessage('card details required'),
            body('card').isObject().withMessage('card details must be an object'),
            body('card.cvv').exists().withMessage('cvv required'),
            body('card.cvv').isNumeric().withMessage('cvv must be numeric'),
            body('card.expirationMonth').exists().withMessage('expirationMonth required'),
            body('card.expirationMonth').isNumeric().withMessage('expirationMonth must be numeric'),
            body('card.expirationYear').exists().withMessage('expirationYear required'),
            body('card.expirationYear').isNumeric().withMessage('expirationYear must be numeric'),
            body('card.number').exists().withMessage('number required'),
            body('card.number').isNumeric().withMessage('card number must be numeric'),
        ],
        RequestValidator.errorHandler,
        CreditController.CreditToCard)

export default router;