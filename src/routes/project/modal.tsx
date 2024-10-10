import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { FolderForm } from "./folder-form"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface Props {
    // folderId: string
    path: string
}
export function FolderDialog({ path }: Props) {

    return (
        <Dialog>
            <DialogTrigger asChild >
                <Button variant="ghost" size="sm" className="ml-4">
                    <Plus className="h-3 w-3 mr-1" /> New Folder
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <FolderForm path={path} />
            </DialogContent>
        </Dialog>

    )
}
