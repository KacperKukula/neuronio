export default class {
    endAt: number = 0;
    counter: number = 0;

    score: number = 0;

    isEnd() {
        return this.counter >= this.endAt;
    }
}