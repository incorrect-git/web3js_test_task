export default class Other {

    constructor(){

    }

    public async delay(ms?: number) {
        setTimeout(() => {}, ms || new Other().random(5000, 15000))
    }

    public random (min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

}