import { Link } from "react-router-dom"
import { Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Overview", to: "/" },
  { label: "Workflows", to: "/" },
  { label: "Insights", to: "/" },
]

export function Header() {
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
              Maswada AI
            </Link>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Smart notes with AI
            </span>
          </div>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-4 text-xs font-medium text-muted-foreground sm:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link> 
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline">
               العربيه
            </Button>
          </div>
        </div>
        
      </div>
    </header>
  )
}
