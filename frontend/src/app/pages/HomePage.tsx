import { ArrowUpRight, Sparkles } from "lucide-react"

import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useUser } from "@clerk/clerk-react"

const typography = [
  { label: "Display", className: "text-4xl md:text-5xl font-semibold" },
  { label: "Heading", className: "text-2xl md:text-3xl font-semibold" },
  { label: "Title", className: "text-xl font-semibold" },
  { label: "Body", className: "text-base text-muted-foreground" },
  { label: "Caption", className: "text-sm text-muted-foreground" },
]

const spacing = [
  "Section spacing: `py-12` or `py-16`",
  "Card padding: `p-6` or `p-8`",
  "Grid gap: `gap-4` or `gap-6`",
  "Stacked spacing: `space-y-4` to `space-y-8`",
]

export function HomePage() {

  const {user} = useUser();

  if(!user) {
    return <div> Loadinng ... </div>
  }

  console.log("User info: ", user);
  return (
    <div className="space-y-12">
      {/* Hero card */}
      <GlassCard className="px-4 py-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold"> My Notes</h1>
          <Button><Plus />Add notes</Button>
        </div>
        <div className="relative">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground hei" />
          <Input className="pl-10" placeholder="Search notes..." />        
        </div>
        <div className="flex flex-col gap-4">
          <GlassCard className="p-4">
            My Note1
          </GlassCard>
          <GlassCard className="p-4">
            My Note2
          </GlassCard>
        </div>
      </GlassCard>

    </div>
  )
}
