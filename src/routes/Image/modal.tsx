import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ImageForm } from "./image-form"

interface Props {
    path: string
    size?: "large"
}
export function ImageDialog({ path, size }: Props) {
    return (
        <Dialog >
            <DialogTrigger asChild >
                {
                    size === "large" ? <Button className="mt-4">Add Image</Button> :
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add Image
                            </span>
                        </Button>
                }

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <ImageForm path={path} />
            </DialogContent>
        </Dialog>

    )
}
