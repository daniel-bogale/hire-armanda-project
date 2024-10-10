import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import MainMedia from "./media"
import { Tree } from "@/components/tree/tree"
import { data } from "./data"
import { Folder } from "lucide-react"
import { useState } from "react"

type Props = {}

const MainDashboard = ({ }: Props) => {
    const [content, setContent] = useState("Admin Page")

    return (
        <div className=" flex gap-4 py-10 px-4">
            <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[76vh] rounded-lg border mx-8"
            >
                <ResizablePanel defaultSize={25}>
                    <Tree
                        data={data}
                        className="flex-shrink-0 border-[1px] h-full p-4"
                        initialSlelectedItemId="f12"
                        onSelectChange={(item) => setContent(item?.name ?? "")}
                        folderIcon={Folder}
                        itemIcon={Folder}
                    />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={80} minSize={75} maxSize={85}>
                    <MainMedia content={content} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div >
    )
}

export default MainDashboard