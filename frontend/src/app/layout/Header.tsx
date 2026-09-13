import { Link } from "react-router-dom"
import { Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { LanguageContext } from "@/context/LanguageContext"
import { FormattedMessage } from "react-intl"

const navItems = [
  { labelId: "nav.overview", to: "/" },
  { labelId: "nav.workflows", to: "/" },
  { labelId: "nav.insights", to: "/" },
]



export function Header() {

  // handling swiching languges
  const translationContext = useContext(LanguageContext)
  const {isRTL, toggleLanguage} = translationContext!;

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        {/* Using glass class directly - header doesn't need rounded-2xl from glass-card */}
        <div className="glass-card flex items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm font-semibold tracking-wide"
            >
              <FormattedMessage id="title"/>
            </Link>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              <FormattedMessage id="description"/>
            </span>
          </div>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-4 text-xs font-medium text-muted-foreground sm:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.labelId}
                to={item.to}
                className="transition-colors hover:text-foreground"
              >
                <FormattedMessage id={item.labelId} />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button onClick={toggleLanguage} variant="outline">
               {isRTL? "English" : "العربيه"}
            </Button>
          </div>
        </div>
        
      </div>
    </header>
  )
}
