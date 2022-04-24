import db from "../dbConfig.js";

export default class Connection {
    constructor(){
        this.db = db;
    }
}