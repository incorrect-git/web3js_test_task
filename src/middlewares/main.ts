import Connection from './connection';
import ParserToken from './parserToken';
import Balance from './balance'
import Web3 from 'web3';
import { IPC_CHAIN, HTTP_CHAIN } from '../config';

import tokenListInterface from '../interfaces/tokenList'; 


export default class Main {

    private chain!: Web3;
    private listToken!: tokenListInterface[];

    constructor(){

    }

    async init() {

        this.chain = new Connection(IPC_CHAIN, HTTP_CHAIN).init();
        this.listToken = await new ParserToken().init(); 
        new Balance(this.chain, this.listToken).init();
        
    }
}