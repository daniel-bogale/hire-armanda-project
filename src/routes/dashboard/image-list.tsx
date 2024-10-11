import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { dateFormatter } from "@/utils"
import { ImageDialog } from "../Image/modal"
import { DeleteImageDialog } from "./delete-image"

type Props = {
    folderId: string
}

const folderImages = [
    {
        src: "https://placehold.co/600x400",
        fileName: "fileName",
        id: "2i3djf",
        description: "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
        tags: ["first", "fyp", "first", "fyp", "first", "fyp", "first", "fyp",],
        createdAt: new Date(),
    }
]

const ImageList = ({
    folderId
}: Props) => {
    return (
        <>
            {folderImages.length > 0 ?
                <Card x-chunk="dashboard-06-chunk-0" >
                    <CardHeader>
                        <CardTitle>
                            {folderId}
                        </CardTitle>
                        <CardDescription>
                            Manage your images and view their details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table >
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span className="sr-only">Image</span>
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">Id</TableHead>
                                    <TableHead>File name</TableHead>
                                    <TableHead className="hidden md:table-cell" >Description</TableHead>
                                    <TableHead>Tags</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Created at
                                    </TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    folderImages.map((data) => (
                                        <TableRow key={data.id}>
                                            <TableCell className="hidden sm:table-cell">
                                                <img
                                                    alt="Product image"
                                                    className="aspect-square rounded-md object-cover"
                                                    height="64"
                                                    src={data.src}
                                                    width="64"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {data.id}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {data.fileName}
                                            </TableCell>
                                            <TableCell className="font-medium max-w-64">
                                                {data.description}
                                            </TableCell>
                                            <TableCell className="flex items-center flex-wrap max-w-44">
                                                {
                                                    data.tags.map((tag, idx) => (<Badge key={idx} variant="outline">{tag}</Badge>))
                                                }
                                            </TableCell>


                                            <TableCell className="hidden md:table-cell">
                                                {dateFormatter(data.createdAt)}
                                            </TableCell>
                                            <TableCell>
                                                <DeleteImageDialog onContine={
                                                    () => {
                                                        console.log(data.id)
                                                    }
                                                } />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>1-10</strong>
                        </div>
                    </CardFooter>
                </Card> : <div className="flex flex-col items-center gap-1 text-center py-40">
                    <h3 className="text-2xl font-bold tracking-tight">
                        You have no image in this folder
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        You can start by adding image
                    </p>
                    <ImageDialog folderId={folderId} size='large' />
                </div>
            }
        </>


    )
}

export default ImageList