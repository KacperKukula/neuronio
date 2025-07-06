export class UploadUtils {
    static readonly API_URL = import.meta.env.VITE_API_URL;

    static pathToUrl(path: string): string {

        if (path.startsWith('http') || path.startsWith('http')) return path;

        if(path.startsWith('/')) return UploadUtils.API_URL + path;
        else return UploadUtils.API_URL + '/' + path;
    }
}