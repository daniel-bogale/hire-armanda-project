import { ErrorResponse, useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as ErrorResponse;
    const navigate = useNavigate()



    return (
        <div className="h-[100vh] container mx-auto max-w-max flex justify-center items-center">

            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{error.status === 404 ? "Error 404" : "Error"}</AlertTitle>
                <AlertDescription className="flex flex-col items-center gap-4">
                    <p>
                        {error.status === 404 ? "Sorry, the page you are looking for does not exist." : ""
                        }
                    </p>

                    <Button variant="ghost" className=" text-gray-900 dark:text-gray-300" onClick={() => {
                        navigate("/")
                    }}>Go back</Button>

                </AlertDescription>
            </Alert>
        </div>
    );
}

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";



