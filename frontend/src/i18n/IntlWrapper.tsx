import { useContext } from "react"
import { message, type Locale } from "."
import { LanguageContext } from "@/context/LanguageContext"
import { IntlProvider } from "react-intl"

type Props = {
    children: React.ReactNode
}


export function IntlWrapper({children} : Props){

    const {locale} = useContext(LanguageContext)!;

    return (

        <IntlProvider locale={locale}  messages={message[locale]}>
            {children}
        </IntlProvider>
    )
}