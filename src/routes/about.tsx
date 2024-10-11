const About = () => {
    return (

        <div className='container mx-auto p-14'>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Armanda Bucket
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                Manage your images with a simple and intuitive interface.            </p>
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Overview
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                We are building a simple web application that allows users to securely upload and manage images. The app will feature user authentication, integration with supabase for image storage, and an AI feature that can analyze images using ChatGPT.
            </p>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
                This assignment was a sprint but i have tried.
            </blockquote>
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                Resources
            </h3>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">

                <li className="leading-7 [&:not(:first-child)]:mt-6">
                    Schema Design:{" "}
                    <a
                        href="https://app.eraser.io/workspace/SdtWMBHiGbBK9udsdUPR"
                        className="font-medium text-primary underline underline-offset-4"
                        target="_blank"
                    >
                        eraser.io
                    </a>
                </li>
                <li className="leading-7 [&:not(:first-child)]:mt-6">
                    Backend Doc:{" "}
                    <a
                        href="https://hire-armanda-project-backend.onrender.com/docs#/"
                        className="font-medium text-primary underline underline-offset-4"
                        target="_blank"
                    >
                        swagger
                    </a>
                </li>
                <li className="leading-7 [&:not(:first-child)]:mt-6">
                    Source Code:{" "}
                    <a
                        href="https://github.com/daniel-bogale"
                        className="font-medium text-primary underline underline-offset-4"
                        target="_blank"

                    >
                        My Github
                    </a>
                </li>

            </ul>

        </div>

    )
}

export default About