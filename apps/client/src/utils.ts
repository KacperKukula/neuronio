import DOMPurify from 'dompurify';

export class Utils {

    static catchError<T>(promise: Promise<T>): Promise<[undefined, T] | [Error]> {
        return promise
            .then((data) => {
                return [undefined, data] as [undefined, T];
            })
            .catch((error) => {
                return [error];
            });
    }

    static sanitize(text: string) {
        return DOMPurify.sanitize(text ?? '').replace(/&nbsp;/g, ' ');
    }
}