import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { setUser, useAppState } from '@/state';
import { logout } from '@/services/authService';
import { useToast } from '@/hooks/use-toast';
import { Images, Package2, ScrollText, Settings } from 'lucide-react';
import { ModeToggle } from '../mode-toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
const MainHeader = () => {
    const { dispatch } = useAppState();
    const { toast } = useToast()

    const handleLogout = async () => {
        console.log("logging out");
        try {

            await logout();
            dispatch(setUser(null));
        }
        catch (err) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        }


    };

    return (
        <div className='bg-white dark:bg-gray-900 shadow-md'>
            <header className=" container mx-auto sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 justify-between">
                <Link to="/" className='flex items-center gap-2'>
                    <Package2 className="h-6 w-6 hidden md:block" />
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">Armand Bucket</h1>
                </Link>
                <div className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">

                    <Link
                        to="/dashboard"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Media Library
                    </Link>
                    <Link
                        to="/about"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        About
                    </Link>
                    <Link
                        to="/setting"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Setting
                    </Link>
                </div>
                <div className='md:hidden'>
                    <aside className="fixed inset-y-0 left-0 z-10 w-14 flex-col border-r bg-background flex">
                        <nav className="flex flex-col items-center gap-4 px-2 py-5">
                            <Link
                                to="/dashboard"
                                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                            >
                                <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                                <span className="sr-only">Armand Bucket</span>
                            </Link>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to="/dashboard"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    >
                                        <Images className="h-5 w-5" />
                                        <span className="sr-only">Media Library</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Media Library</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to="/about"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    >
                                        <ScrollText className="h-5 w-5" />
                                        <span className="sr-only">About</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">About</TooltipContent>
                            </Tooltip>
                        </nav>
                        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        to="/setting"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    >
                                        <Settings className="h-5 w-5" />
                                        <span className="sr-only">Settings</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">Settings</TooltipContent>
                            </Tooltip>
                        </nav>
                    </aside>
                </div>
                <nav className='hidden content-center gap-4 sm:flex'>
                    <Link to="/login" onClick={handleLogout}>
                        <Button variant="link" className=" text-gray-900 dark:text-gray-300">Log out</Button>
                    </Link>
                    <ModeToggle />
                </nav>
            </header >

        </div >
    );
};

export default MainHeader;
