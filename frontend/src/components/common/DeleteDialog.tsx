import { Trash2Icon } from "lucide-react"
import { FormattedMessage } from "react-intl"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

type DeleteNoteProps = {
    handleDelete: () => void
    buttonText?: string
    title?: string
    description?: string
}


export function DeleteDialog({ handleDelete, buttonText, title, description}: DeleteNoteProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">{buttonText ?? <FormattedMessage id="dialog.delete" />}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline"><FormattedMessage id="dialog.cancel" /></AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive"><FormattedMessage id="dialog.delete" /></AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
