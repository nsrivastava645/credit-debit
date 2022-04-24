import {validationResult} from "express-validator";
class RequestValidator {
   async errorHandler(req, res, next) {
       if(!validationResult(req).isEmpty()){
            return res.json({msg: validationResult(req).errors[0].msg});
       } else {
           next();
       }
   }
}

export default new RequestValidator();