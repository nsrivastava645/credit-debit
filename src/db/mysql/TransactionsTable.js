import Connection from "./Connection.js";
import { TableNames } from "./Constatnts.js";
class TransactionsTable extends Connection {
    constructor() {
        super();
        this.table = TableNames.TransactionsTable;
    }
    async addTransaction(txnId, txnType, request, response, dateAdded){
        let [result] = await this.db.query(`INSERT INTO ?? 
                                            (txnId, txnType, request, response, dateAdded)
                                            VALUES (?,?,?,?,?)`, 
                                            [this.table, txnId, txnType, JSON.stringify(request), JSON.stringify(response), dateAdded]
                                            );
        return result && result.affectedRows ? result : false;
    }
}

export default new TransactionsTable();