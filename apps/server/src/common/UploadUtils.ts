export class UploadUtils {
    static backSlashToForwardSlash(path: string): string {
        return path.replace(/\\/g, '/');
    }

    static shedWhiteSpaces(path: string): string {
        return path.replace(/ /g,'');
    }
}