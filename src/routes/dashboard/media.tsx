import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

type Props = {
    content: string
}

const MainMedia = ({ content }: Props) => {
    return (
        <div className='p-8'>
            <div className='flex justify-between items-center'>

                <Breadcrumb className="hidden md:flex ">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/dashboard">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="#">Folder 1</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Folder b</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="relative ml-auto flex-1 sm:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search by Name, #tag or Description"
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    />
                </div>
            </div>
            <p>{content}</p>
            <div className="flex flex-col items-center gap-1 text-center py-40">
                <h3 className="text-2xl font-bold tracking-tight">
                    You have no folder or image
                </h3>
                <p className="text-sm text-muted-foreground">
                    You can start by creating folder
                </p>
                <Button className="mt-4">Add Folder</Button>
            </div>
        </div>
    )
}

export default MainMedia