import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Link } from "react-router-dom"
import { ImageDialog } from '../Image/modal'
import ImageList from './image-list'

type Props = {
    path: string
}
const data = [
    "https://refine-web.imgix.net/blog/2024-03-19-ts-shadcn/social.png?w=1788", "https://user-images.githubusercontent.com/17372417/235653077-fc1a8e77-35b5-4066-a3c1-ab30dd96a3ac.png"
]
const MainMedia = ({ path }: Props) => {
    const folders = path.split('/')
    console.log(path)

    return (
        <div className='p-8 gap-y-4 grid'>
            <div className='flex justify-between items-center'>
                <Breadcrumb className="hidden md:flex ">
                    <BreadcrumbList>
                        {
                            folders.map((val, idx) => (
                                <BreadcrumbItem>
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
                    <ImageDialog path={path} />
                </div>
            </div>
            {data.length > 0 ?
                <ImageList />
                :

                <div className="flex flex-col items-center gap-1 text-center py-40">
                    <h3 className="text-2xl font-bold tracking-tight">
                        You have no image in this folder
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        You can start by adding image
                    </p>
                    <ImageDialog path={path} size='large' />
                </div>
            }

        </div>
    )
}

export default MainMedia