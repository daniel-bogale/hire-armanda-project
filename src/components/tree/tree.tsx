import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRight, FolderArchive, type LucideIcon } from "lucide-react";
import useResizeObserver from "use-resize-observer";
import { cn } from "@/lib/utils";

import { ScrollArea } from "../ui/scroll-area";
import { FolderDialog } from "@/routes/project/modal";
import { FolderWithPath } from "@/services/folderService";

// interface TreeDataItem {
//     id: string;
//     name: string;
//     icon?: LucideIcon,
//     children?: TreeDataItem[];
//     path: string;
// }

type TreeProps =
    React.HTMLAttributes<HTMLDivElement> &
    {
        data: FolderWithPath[],
        initialSlelectedItemId?: string,
        onSelectChange?: (item: FolderWithPath | undefined) => void,
        expandAll?: boolean,
        folderIcon?: LucideIcon,
        itemIcon?: LucideIcon
    }

const Tree = React.forwardRef<
    HTMLDivElement,
    TreeProps
>(({
    data,
    initialSlelectedItemId,
    onSelectChange,
    expandAll,
    folderIcon,
    itemIcon,
    className, ...props
}, ref) => {
    const [selectedItemId, setSelectedItemId] = React.useState<string | undefined>(initialSlelectedItemId)

    const handleSelectChange = React.useCallback((item: FolderWithPath | undefined) => {
        setSelectedItemId(item?.id.toString());
        if (onSelectChange) {
            onSelectChange(item)
        }
    }, [onSelectChange]);

    const expandedItemIds = React.useMemo(() => {
        if (!initialSlelectedItemId) {
            return [] as string[]
        }

        const ids: string[] = []

        function walkTreeItems(items: FolderWithPath[] | FolderWithPath, targetId: string) {
            if (items instanceof Array) {
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < items.length; i++) {
                    ids.push(items[i]!.id.toString());
                    if (walkTreeItems(items[i]!, targetId) && !expandAll) {
                        return true;
                    }
                    if (!expandAll) ids.pop();
                }
            } else if (!expandAll && items.id.toString() === targetId) {
                return true;
            } else if (items.sub_folders) {
                return walkTreeItems(items.sub_folders, targetId)
            }
        }

        walkTreeItems(data, initialSlelectedItemId)
        return ids;
    }, [data, initialSlelectedItemId])

    const { ref: refRoot, width, height } = useResizeObserver();

    return (
        <div ref={refRoot} className={cn("overflow-hidden", className)}>
            <ScrollArea style={{ width, height }}>
                <div className="relative p-2">
                    <div className="flex items-end overflow-ellipsis min-w-max mb-3">
                        <FolderArchive className="h-5 w-5" />
                        <p className="px-2 font-bold" >Media Library</p>
                    </div>
                    <TreeItem
                        data={data}
                        ref={ref}
                        selectedItemId={selectedItemId}
                        handleSelectChange={handleSelectChange}
                        expandedItemIds={expandedItemIds}
                        FolderIcon={folderIcon}
                        ItemIcon={itemIcon}
                        {...props}
                    />
                </div>
            </ScrollArea>
        </div>
    )
})

type TreeItemProps =
    TreeProps &
    {
        selectedItemId?: string,
        handleSelectChange: (item: FolderWithPath | undefined) => void,
        expandedItemIds: string[],
        FolderIcon?: LucideIcon,
        ItemIcon?: LucideIcon
    }

const TreeItem = React.forwardRef<
    HTMLDivElement,
    TreeItemProps
>(({ className, data, selectedItemId, handleSelectChange, expandedItemIds, FolderIcon, ItemIcon, ...props }: TreeItemProps, ref) => {
    return (
        <div ref={ref} role="tree" className={className} {...props}><ul>
            {data instanceof Array ? (
                data.map((item) => (
                    <li key={item.id}>
                        {item.sub_folders ? (
                            <AccordionPrimitive.Root type="multiple" defaultValue={expandedItemIds}>
                                <AccordionPrimitive.Item value={item.id.toString()}>
                                    <AccordionTrigger
                                        className={cn(
                                            "px-2 hover:before:opacity-100 before:absolute before:left-0 before:w-full before:opacity-0 before:bg-muted/80 before:h-[1.75rem] before:-z-10",
                                            selectedItemId === item.id.toString() && "before:opacity-100 before:bg-accent text-accent-foreground before:border-l-2 before:border-l-accent-foreground/50 dark:before:border-0"
                                        )}
                                        onClick={() => handleSelectChange(item)}
                                    >

                                        <FolderArchive
                                            className="h-4 w-4 shrink-0 mr-2 text-accent-foreground/50"
                                            aria-hidden="true"
                                        />
                                        {/* } */}
                                        <span className="text-sm truncate">{item.name}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="pl-6">
                                        <TreeItem
                                            data={item.sub_folders ? item.sub_folders : [item]}
                                            selectedItemId={selectedItemId}
                                            handleSelectChange={handleSelectChange}
                                            expandedItemIds={expandedItemIds}
                                            FolderIcon={FolderIcon}
                                            ItemIcon={ItemIcon}
                                        />
                                        <FolderDialog parentFolderId={item.folder_id} />

                                    </AccordionContent>
                                </AccordionPrimitive.Item>
                            </AccordionPrimitive.Root>
                        ) : (
                            <Leaf
                                item={item}
                                isSelected={selectedItemId === item?.id.toString()}
                                onClick={() => handleSelectChange(item)}
                                Icon={ItemIcon}
                            />
                        )}
                    </li>
                ))
            ) : (
                <li>
                    <Leaf
                        item={data}
                        isSelected={selectedItemId === (data as FolderWithPath).id.toString()}
                        onClick={() => handleSelectChange(data)}
                        Icon={ItemIcon}
                    />
                </li>
            )}
        </ul></div>
    );
})

const Leaf = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        item: FolderWithPath, isSelected?: boolean,
        Icon?: LucideIcon
    }
>(({ className, item, isSelected, Icon, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "flex items-center py-2 px-2 cursor-pointer \
        hover:before:opacity-100 before:absolute before:left-0 before:right-1 before:w-full before:opacity-0 before:bg-muted/80 before:h-[1.75rem] before:-z-10",
                className,
                isSelected && "before:opacity-100 before:bg-accent text-accent-foreground before:border-l-2 before:border-l-accent-foreground/50 dark:before:border-0"
            )}
            {...props}
        >
            <FolderArchive className="h-4 w-4 shrink-0 mr-2 text-accent-foreground/50" aria-hidden="true" />
            <span className="flex-grow text-sm truncate">{item.name}</span>
        </div>
    );
})

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                "flex flex-1 w-full items-center py-2 transition-all last:[&[data-state=open]>svg]:rotate-90",
                className
            )}
            {...props}
        >
            {children}
            <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50 ml-auto" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={cn(
            "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
            className
        )}
        {...props}
    >
        <div className="pb-1 pt-0">{children}</div>
    </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Tree, type FolderWithPath }
