 

'use strict';

const { Contract } = require('fabric-contract-api');

class DiagnosisReport extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const diagnosisReport = [
            {
                id: '01',
                patient_first_name: 'HF',
                patient_last_name: 'HF',
                birthdate: 'date',
                age: '12',
                gender: 'male',
                doctor_first_name: 'ABC',
                doctor_last_name: 'ABC',
                doctor_email_id: 'test@a.com',
                patient_email_id: 'test1@a.com',
                doctor_phone_number: '123',
                diagnosis_comments: 'Test',
                recommended_tests: 'XY',
                approved: "true"
            }
        ];

        for (let i = 0; i < diagnosisReport.length; i++) {
            await ctx.stub.putState('STD' + i, Buffer.from(JSON.stringify(diagnosisReport[i])));
            console.info('Added <--> ', diagnosisReport[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryDiagnosisReport(ctx, id) {
        const stdAsBytes = await ctx.stub.getState(id); // get the std from chaincode state
        if (!stdAsBytes || stdAsBytes.length === 0) {
            throw new Error(`${id} does not exist`);
        }
        console.log(stdAsBytes.toString());
        return stdAsBytes.toString();
    }

    async createDiagnosisReport(ctx, id, patient_first_name, patient_last_name, birthdate, age, gender, doctor_first_name, 
        doctor_last_name, doctor_email_id, patient_email_id, doctor_phone_number, diagnosis_comments, recommended_tests, approved) {
        console.info('============= START : Create std ===========');

        const diagnosisReport = {
            id,
            patient_first_name,
            patient_last_name,
            birthdate,
            age,
            gender,
            doctor_first_name,
            doctor_last_name,
            doctor_email_id,
            patient_email_id,
            doctor_phone_number,
            diagnosis_comments,
            recommended_tests,
            approved
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(diagnosisReport)));
        console.info('============= END : Create std ===========');
    }

    async queryAllDiagnosisReports(ctx) {
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

module.exports = DiagnosisReport;

