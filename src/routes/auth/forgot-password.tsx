
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { setError } from "@/state"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useLocation } from "react-router-dom"
import { z } from "zod"

export const description =
    "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."
const formSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address.")
})

type fromInputs = z.infer<typeof formSchema>;


export function ForgotPassword() {
    let { state } = useLocation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: state?.email || "",
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
        <div className={`flex items-center justify-center min-h-[85.4vh] `}>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Forgot your password?</CardTitle>
                    <CardDescription>
                        Enter your email address and we'll send you a link to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="x@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full">Reset Password</Button>
                        </form>
                    </Form>


                    <div className="mt-4 text-center text-sm">
                        <Link to="/login" className="underline">
                            Back to login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
