import { Pencil } from "lucide-react"
import { FormattedMessage } from "react-intl"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
 handleRewrite: (mode: string) => void;
}

export function DropdownMenuDemo({handleRewrite}: Props)  {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button> <Pencil /><FormattedMessage id="noteDetails.switchMode" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem  onClick={() => handleRewrite("comedy")}>
            <FormattedMessage id="rewrite.comedy" />
          </DropdownMenuItem>
          <DropdownMenuItem  onClick={() => handleRewrite("casual")}>
            <FormattedMessage id="rewrite.casual" />
          </DropdownMenuItem>
          <DropdownMenuItem  onClick={() => handleRewrite("formal")}>
            <FormattedMessage id="rewrite.formal" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
