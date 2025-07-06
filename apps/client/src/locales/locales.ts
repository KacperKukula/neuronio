export class Locale {
    shortName: string;
    locale: string;
    label: string;
    iconName: string;

    constructor(shortName: string, locale: string, label: string, iconName: string) {
        this.shortName = shortName;
        this.locale = locale;
        this.iconName = iconName;
        this.label = label;
    }
}

export const appLocales = [
    new Locale('en', 'en-US', 'English', ''),
    new Locale('pl', 'pl-PL', 'Polski', '')
]