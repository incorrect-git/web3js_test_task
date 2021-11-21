import Web3 from "web3";
import { balanceOf, decimals, symbolBytes32, symbolString } from '../abi'
import { LINK_WALLET, TIME_UPDATE } from '../config'
import otherMethods from './other'
import Saving from "./savingBalance";


import tokenListInterface from '../interfaces/tokenList'; 
import listBalanceInterface from '../interfaces/listBalance';


export default class Balance {

    private chain: Web3;
    private wallet!: string;
    private tokenList: tokenListInterface[];
    private listBalance: listBalanceInterface[] = [];
    private queues: any[] = [];
    private msTimer: number = TIME_UPDATE;

    constructor(chain: Web3, listToken: tokenListInterface[]) {
        this.chain = chain;
        this.tokenList = listToken;
    }

    async init(msUpdating?: number){
        this.getWallet();
        
        await new otherMethods().delay();
        this.getBalanceEth();
        await new otherMethods().delay();

        await this.getBalanceTokens();

        await Promise.all(this.queues);

        new Saving().init(this.listBalance);
        
        this.queues.splice(0, this.queues.length);
        this.listBalance.splice(0, this.listBalance.length);


        if (msUpdating) this.msTimer = msUpdating;
        console.log(`Токены и балансы записаны! Повторная проверка через ${this.msTimer/1000} секунд`);
        setTimeout(() => {
            this.init(msUpdating);
        }, this.msTimer);
    }

    public async getBalanceTokens(){
        for (let key in this.tokenList){
            this.queues.push(new Promise(async r => {
                await this.getBalanceToken(this.tokenList[key].address);
                r(true);
            })) 
        }

    }

    public async getBalanceToken(contract: string){

            const contractAddress = contract;
            try {
                let balance = await this.createContract(contractAddress, balanceOf).methods.balanceOf(this.wallet).call();
                if (balance > 0){

                    let decimal = await this.createContract(contractAddress, decimals).methods.decimals().call();

                    balance = (balance / 10**decimal);

                    let symbol;
                    try{
                        await new otherMethods().delay();
                        symbol = await this.createContract(contractAddress, symbolString).methods.symbol().call();
                    }
                    catch(e){
                        console.log('Type symbol isn\'t "string"', contractAddress);
                        await new otherMethods().delay();
                        try {
                            symbol = await this.createContract(contractAddress, symbolBytes32).methods.symbol().call();
                            symbol = this.chain.utils.hexToUtf8(symbol);
                        }
                        catch (e) {
                            console.log('Type symbol insn\'t bytes32', contractAddress);
                            throw new Error('Wrong methods contract to get symbol!');
                        }
                    }    

                    this.listBalance.push({
                        symbol,
                        balance,
                        contract: contractAddress
                    })
                }
            } catch (error) {
                console.log('Error reading contract =(', contractAddress);
            }
            
    }

    public async getBalanceEth(){
        let balance: string;
        if (this.wallet){
            try {
                balance = await this.chain.eth.getBalance(this.wallet);
                balance = this.chain.utils.fromWei(balance, 'ether');
                this.listBalance.push({
                    symbol: 'ETH',
                    balance: +balance
                })
                return balance;
            } catch (error) {
                console.log(error);        
            }
        }
        else
            throw new Error(this.Error());
    }

    private getWallet(): string | null {
        let wallet = LINK_WALLET.match('0xa[A-z0-9]+');

        if (wallet === null)
            throw new Error(this.Error())
        else
            this.wallet = wallet[0];

        return this.wallet;
    }

    private createContract(addressContract: string, abi: string){
        return new this.chain.eth.Contract(JSON.parse(abi), addressContract);
    }
    
    private Error(){
        return `Incorrect wallet! - ${LINK_WALLET}`;
    }
}