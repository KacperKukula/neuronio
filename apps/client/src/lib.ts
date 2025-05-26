import { HTTPError } from "ky";

export class Utils {
    /**
     * Simplifies the thy catch functionality
     * Uses only asynchronous functions
     * @param promise - The promise to be executed
     * @returns [ error, data ]
     */
    static catchError<T>(promise: Promise<T>): Promise<[undefined, T] | [Error]> {
        return promise
            .then((data) => {
                return [undefined, data] as [undefined, T];
            })
            .catch((error) => {
                return [error];
            });
    }

    static async catchNetworkError<T>(promise: Promise<T>): Promise<{ error?: HTTPError; data?: T }> {
        try {
            const data = await promise;
            return { data };
        } catch (error) {
            return { error: error as HTTPError };
        }
    }

}