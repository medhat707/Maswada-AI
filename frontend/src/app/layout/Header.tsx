import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { LanguageContext } from "@/context/LanguageContext"
import { FormattedMessage } from "react-intl"
import { UserButton } from "@clerk/clerk-react"



export function Header() {

  // handling swiching languges
  const translationContext = useContext(LanguageContext)
  const {isRTL, toggleLanguage} = translationContext!;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
        <div className="glass-card flex items-center justify-between gap-2 rounded-2xl px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link
              to="/"
              className="text-sm font-semibold tracking-wide whitespace-nowrap"
            >
              <FormattedMessage id="title"/>
            </Link>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              <FormattedMessage id="description"/>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button onClick={toggleLanguage} variant="outline" size="sm">
               {isRTL? "English" : "العربيه"}
            </Button>
            <UserButton/>
          </div>
        </div>
        
      </div>
    </header>
  )
}
