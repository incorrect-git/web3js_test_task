
### Требования
-   [Node.js](https://nodejs.org) v14.16.1
-   [npm](https://www.npmjs.com/)
```bash
sudo apt-get update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install v14.16.1
node -v
```
-   [GETH](https://geth.ethereum.org/downloads/) [Инструкция по установке](https://geth.ethereum.org/docs/install-and-build/installing-geth) или http provider [INFURA](https://infura.io/) - необходимо создать учетную запись и получить API-ключ.

### Установка
```bash
git clone git@github.com:incorrect-git/web3js_test_task.git
cd web3js_test_task
npm i
```
## Конфиг файт ./config.ts
- LINK_WALLET - адресс кошелька
- LINK_SAVE_RESULTS - адресс сохранения результата
- IPC_CHAIN - путь к файлу geth.ipc
- HTTP_CHAIN - https/wss адресс от провайдера
- LIST_TOKEN - файл со списком токенов
- TIME_UPDATE - частота обновления списка

### Запуск
```bash
npm run start
```
