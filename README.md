# Accounting-Notebook

## Building and Running

Clone this project and we need to install dependencies and
build the webapp before running it.
```
yarn install
yarn build
yarn start
```

## Web

You can access the list of transactions and see the details of the 
committed transactions.

![alt text](https://github.com/LedesmaBruno/accounting-notebook/blob/master/images/web.jpg?raw=true)

![alt text](https://github.com/LedesmaBruno/accounting-notebook/blob/master/images/web1.jpg?raw=true)

## API Operations

- GET /api/account/balance:
    - retrieves the account balance amount.
    
- GET /api/transactions/
    - retrieves all the Transactions and their details.
    
- GET /api/transactions/{transaction-id}
    - retrieves the details of a certain Transaction.
    - transaction-id is a positive integer.
    
- POST /api/transactions/
    - commit a new Transaction.
    - Request Body:
    
    ```
  {
        "type": "credit",   // "credit" or "debit"
        "amount": 2         // positive amount 
  }
  ```