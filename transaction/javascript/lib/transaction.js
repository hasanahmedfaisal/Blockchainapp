 

'use strict';

const { Contract } = require('fabric-contract-api');

class Transaction extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const transactions = [
            {
                id: '01',
                patient_first_name: 'Test',
                patient_last_name: 'Last',
                patient_email: 'test@a.com',
                case_number: '12',
                amount: '123',
                status: 'done'
            }
        ];

        for (let i = 0; i < transactions.length; i++) {
            await ctx.stub.putState('STD' + i, Buffer.from(JSON.stringify(transactions[i])));
            console.info('Added <--> ', transactions[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryTransaction(ctx, id) {
        const stdAsBytes = await ctx.stub.getState(id); // get the std from chaincode state
        if (!stdAsBytes || stdAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(stdAsBytes.toString());
        return stdAsBytes.toString();
    }

    async createTransaction(ctx, id, patient_first_name, patient_last_name, patient_email, case_number, amount, status) {
        console.info('============= START : Create std ===========');

        const transaction = {
            id,
            patient_first_name,
            patient_last_name,
            patient_email,
            case_number,
            amount,
            status
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(transaction)));
        console.info('============= END : Create std ===========');
    }

    async queryAllTransactions(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

}

module.exports = Transaction;

