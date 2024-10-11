
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { createFolder } from "@/services/folderService"
import { setError } from "@/state"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    name: z
        .string().min(3, "Folder name is required. Please insert at least 4 characters")
})

export type fromInputs = z.infer<typeof formSchema>;

interface Props {
    folderName?: string
    parentFolderId: number
}

export function FolderForm({ folderName, parentFolderId }: Props) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    const { toast } = useToast()

    const onSubmit = async (data: fromInputs) => {
        try {
            const response = await createFolder({
                name: data.name,
                description: "place holder",
                folder_id: parentFolderId
            });
            console.log(response, "data")
            throw new Error("");
        } catch (err) {
            setError('Login failed, please try again.');
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }
    };

    return (
        <div className={`flex items-center justify-center `}>
            <div className="mx-auto max-w-sm">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Create New Folder</FormLabel>

                                    <FormControl>
                                        <Input placeholder="folder name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={
                            form.formState.isLoading
                        } >{
                                form.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </>
                                ) : folderName ? "Update" : "Create"}</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
