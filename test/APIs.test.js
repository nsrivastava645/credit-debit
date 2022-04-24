
import fs from "fs/promises";
import path from "path";
import request from 'supertest';
import { StatusCodes } from "../src/utils/UtilConstants.js";
import { matchers } from 'jest-json-schema';
expect.extend(matchers);
const baseUrl = 'http://localhost:3000';
import db from "../src/db/dbConfig.js"
import { TableNames } from "../src/db/mysql/Constatnts.js";
let inputFile, schema;
beforeAll(async ()=>{
    inputFile = JSON.parse( await fs.readFile(path.resolve(__dirname, './input.json' ), 'utf-8'));
    schema = JSON.parse( await fs.readFile(path.resolve(__dirname, './schema.json' ), 'utf-8') );
})
describe('CreditController', () => {
    test(`Crediting to user's account`, async () => {
        const response = await request(baseUrl).post('/transact/credit').send(inputFile.truthyCredit);
        expect(response.status).toBe(StatusCodes.Ok);
        expect(response.body).toMatchSchema(schema);
        let txnId = response.body.response.authorizationCode;
        //db validations
        const entryInDb = await testEntryInDb(txnId);
        expect(entryInDb).not.toBe(false);
        expect(entryInDb).toHaveLength(1);
    });
});
describe('DebitController', () => {
    test(`Debiting from user's account`, async () => {
        const response = await request(baseUrl).post('/transact/debit').send(inputFile.truthyDebit);
        expect(response.status).toBe(StatusCodes.Ok);
        expect(response.body).toMatchSchema(schema);
        let txnId = response.body.response.authorizationCode;
        //db validations
        const entryInDb = await testEntryInDb(txnId);
        expect(entryInDb).not.toBe(false);
        expect(entryInDb).toHaveLength(1);
    });
});
const testEntryInDb = async (txnId) => {
    let [result] = await db.query(`SELECT * FROM ?? WHERE txnId = ?`, [TableNames.TransactionsTable, txnId]);
    return result && result.length ? result : false;
}
