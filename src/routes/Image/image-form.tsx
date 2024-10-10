import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { setError } from "@/state"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
    file: z
        .instanceof(File).optional()
        .refine((file) => {
            return !file || file.size <= MAX_UPLOAD_SIZE;
        }, 'File size must be less than 3MB')
        .refine((file) => {
            return file && ACCEPTED_IMAGE_TYPES.includes(file.type);
        }, "Only .jpg, .jpeg, .png and .webp formats are supported.")

})
export type fromInputs = z.infer<typeof formSchema>;

interface Props {
    path: string
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export function ImageForm({ path }: Props) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: undefined
        },
    })

    const { toast } = useToast()

    const onSubmit = async (data: fromInputs) => {
        try {
            // const response: AuthResponse = await login(data);
            // localStorage.setItem('token', response.token);
            if (!data.file) return
            const base64File = await fileToBase64(data.file);

            console.log("data", { image: base64File, path })
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
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <FormLabel htmlFor="picture">Picture</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="picture"
                                                type="file"
                                                onChange={(e) => field.onChange(e.target.files?.[0])}
                                                onBlur={field.onBlur}
                                                name={field.name}
                                                ref={field.ref}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">Save</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}


