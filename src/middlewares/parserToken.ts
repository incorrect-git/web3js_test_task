import fs from 'fs'
import { LIST_TOKEN } from '../config';
import tokenListInterface from '../interfaces/tokenList'; 

export default class ParserToken {

    constructor() {
        
    }

    async init(){
        return await this.load();
    }

    async load(){
        let resultJsonPars: tokenListInterface[];
        try{
            let readList: Buffer = fs.readFileSync(`${LIST_TOKEN}`);
            let parsingList = await JSON.parse(readList.toString());
            resultJsonPars = parsingList;
        }
        catch(e: any){
            throw new Error(e);
        }
        return resultJsonPars;
    }

}