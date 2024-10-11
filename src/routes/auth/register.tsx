
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
import { login, register } from "@/services/authService"
import { setError, setUser, useAppState, User } from "@/state"
import { AuthResponse } from "@/types/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"

export const description =
    "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"

const signUpFormSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address."),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long."),
    firstName: z.string().min(
        3, "First name must be at least 3 characters long. "
    ),
    lastName: z.string().min(
        3, "Last name must be at least 3 characters long. "
    )
})

export type signUpFormInputs = z.infer<typeof signUpFormSchema>;


export function RegisterPage() {
    const { dispatch

    } = useAppState();
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
        },
    })
    const { toast } = useToast()

    const onSubmit = async (data: signUpFormInputs) => {
        try {
            const response: User = await register(data);
            const loginResponse: AuthResponse = await login({ userName: response.username, password: data.password });
            dispatch(setError(null));
            dispatch(setUser(response));
            localStorage.setItem('token', loginResponse.token.access_token);
            localStorage.setItem('user', JSON.stringify(response)); // Store user data

            navigate("/dashboard");
        } catch (err) {
            setError('Login failed, please try again.');
            const errorMessage = (err as any)?.response?.data?.detail ?? "There was a problem with your request.";
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: errorMessage,
            });
        }
    };


    return (
        <div className={`flex items-center justify-center min-h-[85vh] `}>

            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({
                                        field
                                    }) => (
                                        <FormItem>
                                            <FormLabel>
                                                First name
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Athni" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({
                                        field
                                    }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Last name
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Armand" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex justify-between items-center">
                                            Password
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
                                    "Create an account"}
                            </Button>

                        </form>
                    </Form>

                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
