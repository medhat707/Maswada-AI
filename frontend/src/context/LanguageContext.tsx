import { defaultLocale, type Locale } from "@/i18n";
import { createContext, useEffect, useState } from "react";


type LanguageContextType = {
    locale: Locale
    setLocale: (locale: Locale) => void;
    isRTL: boolean
    toggleLanguage: () => void
}


export const LanguageContext = createContext<LanguageContextType | null>(null);


type Props = {
    children: React.ReactNode;
}   

export function LanguageContextProvider ({children}: Props){

    const [locale, setLocale] = useState<Locale>(defaultLocale);
    const isRTL = locale === "ar";
    const toggleLanguage = ()=>{
        setLocale(isRTL? defaultLocale: "ar")
    }

    // change text dir based on locale
    useEffect(() =>{
        document.documentElement.dir = isRTL? "rtl" : "ltr"; 
        document.documentElement.lang = locale;

    },[locale, isRTL])


    return (

        <LanguageContext.Provider value={{locale, setLocale, isRTL,toggleLanguage } }>
            {children}
        </LanguageContext.Provider>
    )
}

