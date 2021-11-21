import Web3 from 'web3';
import Net from 'net';

export default class Connection  {

    private ipc: string;
    private http: string;

    constructor(ipc_chain: string, http_chain: string){
        this.ipc = ipc_chain;
        this.http = http_chain;
    }

    private createConnection(){
        return this.ipc ? new Web3.providers.IpcProvider(this.ipc, Net) : this.http;
    }

    public init(){
        
        let typeConnect = this.createConnection();
        let web3Create: Web3;
        try {
            web3Create = new Web3(typeConnect);
        }
        catch(e: any){
            console.log('Ошибка создания подключения!');
            throw new Error(e);
        }
        return web3Create;
   
    }

}