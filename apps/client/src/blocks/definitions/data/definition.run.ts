export default class {
    counter: number = 0;
    score: number = 0;

    length: number;

    constructor(length: number) {
        this.length = length;
    }

    /**
     * Maks new step in counter, returns counter
     * Also checks if this is not end of the run
     *  @returns (number) counter value
     *  @returns (0) if end of run
     */
    nextStep() {
        return (++this.counter >= this.length) ? (0) : this.counter;
    }
}