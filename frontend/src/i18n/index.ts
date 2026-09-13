import en from "./en.json"
import ar from "./ar.json"

export const message = {
    en, 
    ar
}


export const defaultLocale = "en";

export type Locale = keyof typeof message;
