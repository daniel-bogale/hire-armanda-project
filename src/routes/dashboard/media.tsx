import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Link } from "react-router-dom"
import { ImageDialog } from '../Image/modal'
import ImageList from './image-list'

type Props = {
    path: string
}

const MainMedia = ({ path }: Props) => {
    const folders = path.split('/')
    const folderId = folders?.[0] ?? ""

    return (
        <div className='p-8 gap-y-4 grid'>
            <div className='flex justify-between items-center'>
                <Breadcrumb className="hidden md:flex ">
                    <BreadcrumbList>
                        {
                            folders.map((val, idx) => (
                                <BreadcrumbItem key={val}>
                                    {<>
                                        {idx < folders.length ? <BreadcrumbLink asChild>
                                            <Link to={val}>{val}</Link>
                                        </BreadcrumbLink> : <BreadcrumbPage>Folder b</BreadcrumbPage>}
                                        {idx < folders.length - 1 && <BreadcrumbSeparator />}

                                    </>
                                    }
                                </BreadcrumbItem>
                            ))
                        }
                    </BreadcrumbList>
                </Breadcrumb>

                <div className='flex items-center gap-2'>

                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search Image by Name, #tag or Description"
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        />

                    </div>
                    <ImageDialog folderId={folderId} />
                </div>
            </div>
            {folderId &&
                <ImageList folderId={folderId} />
            }
        </div>
    )
}

export default MainMedia