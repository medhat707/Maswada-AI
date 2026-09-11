import { Pencil } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



type Props = {
 handleRewrite: (mode: string) => void;
}

export function DropdownMenuDemo({handleRewrite}: Props)  {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button> <Pencil />Swich mode</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem  onClick={() => handleRewrite("comedy")}>
            Comedy
          </DropdownMenuItem>
          <DropdownMenuItem  onClick={() => handleRewrite("casual")}>
            Casual
          </DropdownMenuItem>
          <DropdownMenuItem  onClick={() => handleRewrite("formal")}>
            Formal
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
