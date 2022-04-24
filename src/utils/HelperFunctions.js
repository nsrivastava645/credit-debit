import { responseHandler , UtilConstants} from "./index.js";
import { v4 as uuidv4 } from 'uuid';
class HelperFunctions {
    validateCreditCard(cardNo){   //validate a card number with luhn's algorithm
        console.log(cardNo);
        let nDigits = cardNo.length;
        let nSum = 0;
        let isSecond = false;
        for (let i = nDigits - 1; i >= 0; i--){
            let d = cardNo[i].charCodeAt() - '0'.charCodeAt();
            if (isSecond == true)
                d = d * 2;
            // We add two digits to handle
            // cases that make two digits
            // after doubling
            nSum += parseInt(d / 10, 10);
            nSum += d % 10;
            isSecond = !isSecond;
        }
        return (nSum % 10 == 0);
    }

    validateYear(year){
        const currYear = new Date().getFullYear();
        if(year.length != 4 || !year.match(/\d{4}/)) 
            return responseHandler(false, UtilConstants.StatusCodes.BadRequest, 'Error', 'Invalid Expiration Year', null, null, null, true);
        if(parseInt(currYear) > year) 
            return responseHandler(false, UtilConstants.StatusCodes.BadRequest, 'Error', 'Card Expired', null, null, null, true);
        
        return responseHandler(true, UtilConstants.StatusCodes.Ok, 'Success', 'Card Valid', null, null, null, true);
    }

    validateMonth(month){
        const currMonth = new Date().getMonth();
        if(parseInt(month) >= currMonth) 
            return responseHandler(true, UtilConstants.StatusCodes.Ok, 'Success', 'Card Valid', null, null, null, true);
            
        return responseHandler(false, UtilConstants.StatusCodes.BadRequest, 'Error', 'Card Expired', null, null, null, true);
    }

    generateTxnId(){
        return uuidv4().replace(/-/g, '');
    }
}
export default new HelperFunctions();