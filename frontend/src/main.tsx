import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "@/app/App"
import { ClerkProvider } from "@clerk/clerk-react"
import { LanguageContextProvider } from "./context/LanguageContext"
import {IntlProvider} from "react-intl"
import { IntlWrapper } from "./i18n/IntlWrapper"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable")
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <LanguageContextProvider>
    <IntlWrapper>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
     </IntlWrapper>
  </LanguageContextProvider>

  </StrictMode>
)
