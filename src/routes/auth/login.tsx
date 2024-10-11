
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
import { login } from "@/services/authService"
import { setError } from "@/state"
import { AuthResponse } from "@/types/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"

export const description =
    "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."
const loginFormSchema = z.object({
    userName: z
        .string()
        .min(3, "Username must be at least 3 characters long."),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long.")
})

export type LoginFormInputs = z.infer<typeof loginFormSchema>;


export function LoginPage() {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            userName: "",
            password: ""
        },
    })
    const { toast } = useToast()

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const response: AuthResponse = await login(data);
            localStorage.setItem('token', response.token);
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
        <div className={`flex items-center justify-center min-h-[84.9vh] `}>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your user name and password below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="userName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-between items-center">User name
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} type="userName" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-between items-center">Password
                                            <Link
                                                to="/forgot-password"
                                                className="ml-auto inline-block text-sm underline text-gray-900 dark:text-white">
                                                Forgot your password?
                                            </Link>
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />
                            <Button type="submit" className="w-full"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait
                                    </>
                                ) :
                                    "Login"}
                            </Button>
                        </form>
                    </Form>


                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
