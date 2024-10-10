import { ErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as ErrorResponse;
    console.error(error);
    if (error.status === 404) return <div id="error-page">
        <h1>404</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
    </div>


    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{(error).statusText}</i>
            </p>
        </div>
    );
}