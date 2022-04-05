 

'use strict';

const { Contract } = require('fabric-contract-api');

class ClaimRequest extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const claimRequests = [
            {
                id: '01',
                patient_first_name: 'First',
                patient_last_name: 'Last',
                patient_email: 'first@a.com',
                patient_visible: 'true',
                policy_name: 'test',
                policy_discount: '20',
                approved: 'true',
                requested: 'true',
                date: 'test',
            }
        ];

        for (let i = 0; i < claimRequests.length; i++) {
            await ctx.stub.putState('STD' + i, Buffer.from(JSON.stringify(claimRequests[i])));
            console.info('Added <--> ', claimRequests[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryclaimRequest(ctx, id) {
        const stdAsBytes = await ctx.stub.getState(id); // get the std from chaincode state
        if (!stdAsBytes || stdAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(stdAsBytes.toString());
        return stdAsBytes.toString();
    }

    async createClaimRequest(ctx, id, patient_first_name, patient_last_name, patient_email, patient_visible, policy_name, policy_discount, approved, requested, date) {
        console.info('============= START : Create std ===========');

        const claimRequest = {
            id,
            patient_first_name,
            patient_last_name,
            patient_email,
            patient_visible,
            policy_name,
            policy_discount,
            approved,
            requested,
            date
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(claimRequest)));
        console.info('============= END : Create std ===========');
    }

    async queryAllClaimRequests(ctx) {
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

module.exports = ClaimRequest;

