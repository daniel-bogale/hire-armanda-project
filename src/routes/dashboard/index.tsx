import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import MainMedia from "./media"
import { Tree } from "@/components/tree/tree"
import { Folder } from "lucide-react"
import { useState } from "react"
import { FolderResponse, FolderWithPath } from "@/services/folderService"
import { useLoaderData } from "react-router-dom"

function addPathToFolders(folders: FolderResponse[], parentPath: string = ''): FolderWithPath[] {
    return folders.map(folder => {
        const currentPath = parentPath ? `${parentPath}/${folder.id}` : `/${folder.id}`;

        const newFolder: FolderWithPath = {
            ...folder,
            path: currentPath,
            sub_folders: addPathToFolders(folder.sub_folders, currentPath)
        };

        return newFolder;
    });
}


type Props = {}

const MainDashboard = ({ }: Props) => {
    const { folders } = useLoaderData() as {
        folders: FolderResponse[]
    }
    const mokeFolder = [{
        created_at: "testing",
        description: "sondflsd",
        folder_id: 23,
        id: 33,
        name: "dfd",
        sub_folders: [],
        updated_at: "dfd",
        path: "/dt",
        user_id: 23
    }, {
        created_at: "testi dng",
        description: "sondflsd",
        folder_id: 213,
        id: 3321,
        name: "name",
        sub_folders: [],
        updated_at: "dfd",
        path: "/dt",
        user_id: 2321
    }
    ] as FolderWithPath[]
    const folderWithPath = addPathToFolders(folders).concat(mokeFolder)
    const [path, setContent] = useState(folderWithPath?.[0]?.path ?? "Admin Page")

    console.log("folders", folders)


    return (<>
        <div className=" gap-4 py-10 px-4 hidden md:flex">
            <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[76vh] rounded-lg border mx-8"
            >
                <ResizablePanel defaultSize={25} >
                    <Tree
                        data={folderWithPath}
                        className="flex-shrink-0 border-[1px] h-full p-4"
                        initialSlelectedItemId="f12"
                        onSelectChange={(item) => setContent(item?.path ?? "")}
                        folderIcon={Folder}
                        itemIcon={Folder}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={80} minSize={60} maxSize={85}>
                    <MainMedia path={path} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div >
        <div className=" gap-4 py-10 px-4 flex md:hidden">
            <ResizablePanelGroup
                direction="vertical"
                className="min-h-[76vh] rounded-lg border mx-8"
            >
                <ResizablePanel defaultSize={25}>
                    <Tree
                        data={folderWithPath}
                        className="flex-shrink-0 border-[1px] h-full p-4"
                        initialSlelectedItemId="f12"
                        onSelectChange={(item) => setContent(item?.path ?? "")}
                        folderIcon={Folder}
                        itemIcon={Folder}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={80} minSize={60} maxSize={85}>
                    <MainMedia path={path} />
                </ResizablePanel>
            </ResizablePanelGroup>



        </div>
    </>
    )
}

export default MainDashboard