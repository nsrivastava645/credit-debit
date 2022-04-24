1. Clone the project. git clone git@github.com:nsrivastava645/credit-debit.git
2. Run npm install to install the dependencies/node_modules folder.
3. Place the .env file in the root of this project at app.js level.
4. Open up a terminal with this folder and type "npm run build" to transpile the app with babel to commonjs module.
5. Type npm `npm run start` to start the application.
6. Use any API tool like Postman/vREST ng/ HTTP CLient etc to hit the below endpoints.

    Endpoints: 
    1.  POST http://localhost:3000/transact/debit'

        Sample request body : {
            "amount": 500,
            "currency": "USD",
            "type": "creditCard",
            "txnType": "1",
            "card": {
                "number": "79927398713",
                "expirationMonth": "03",
                "expirationYear": "2022",
                "cvv": "282"
            }
        }

    2.  POST http://localhost:3000/transact/credit:
        
        Sample request body : {
            "amount": 500,
            "currency": "USD",
            "type": "creditCard",
            "txnType": "2",
            "card": {
                "number": "79927398713",
                "expirationMonth": "03",
                "expirationYear": "2022",
                "cvv": "282"
            }
        }

Looking forward to add authentication and using a middleware to check whether someone doing the transaction is logged in or not.
