 

'use strict';

const { Contract } = require('fabric-contract-api');

class ClaimRequest extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const claimRequests = [
            {
                id: '01',
                policy_name: 'HF',
                discount: '10',
            },
            {
                id: '02',
                policy_name: 'IC',
                discount: '15',
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

    async createClaimRequest(ctx, id, policy_name, discount) {
        console.info('============= START : Create std ===========');

        const claimRequest = {
            id,
            policy_name,
            discount
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

    // async changeOwner(ctx, vehicleno, newOwner) {
    //     console.info('============= START : changestdOwner ===========');

    //     const stdAsBytes = await ctx.stub.getState(vehicleno); // get the std from chaincode state
    //     if (!stdAsBytes || stdAsBytes.length === 0) {
    //         throw new Error(`${vehicleno} does not exist`);
    //     }
    //     const vehicle = JSON.parse(stdAsBytes.toString());
    //     vehicle.owner = newOwner;

    //     await ctx.stub.putState(vehicleno, Buffer.from(JSON.stringify(vehicle)));
    //     console.info('============= END : changestdOwner ===========');
    // }

}

module.exports = ClaimRequest;

