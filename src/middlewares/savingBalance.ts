import fs from 'fs';
import { LINK_SAVE_RESULTS } from '../config';
import listBalanceInterface from '../interfaces/listBalance'

export default class Saving {

    private listTokensBalance!: listBalanceInterface[];

    constructor() {
        
    }

    init(listToken: listBalanceInterface[]) {
        this.listTokensBalance = listToken;

        this.saveAsString();
    }

    saveAsString(){
        try {
            fs.writeFileSync(`${LINK_SAVE_RESULTS}`, '');
            for (let key in this.listTokensBalance){
                fs.appendFileSync(
                    `${LINK_SAVE_RESULTS}`, 
                    `${+key == 0 ? '[' : ''}${JSON.stringify(this.listTokensBalance[key])}${(+key >= 0 && this.listTokensBalance.length >= +key) ? ',' : ']'}${process.platform === 'win32' ? '\r\n' : '\n'}`);
            }
        }
        catch (e){
            console.log('Ошибка записи в файл.', e);
        }
    }

}