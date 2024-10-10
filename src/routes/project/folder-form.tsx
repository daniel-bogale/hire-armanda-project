
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { setError } from "@/state"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    name: z
        .string().min(3, "Folder name is required. Please insert at least 4 characters")
})

export type fromInputs = z.infer<typeof formSchema>;

interface Props {
    folderName?: string
    path: string
}

export function FolderForm({ folderName }: Props) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    const { toast } = useToast()

    const onSubmit = async (data: fromInputs) => {
        try {
            // const response: AuthResponse = await login(data);
            // localStorage.setItem('token', response.token);
            console.log(data, "data")
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
                        <Button type="submit" className="w-full">{folderName ? "Update" : "Create"}</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
