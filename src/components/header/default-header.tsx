import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ModeToggle } from '../mode-toggle';

const Header = () => {
    return (
        <div className=' bg-white dark:bg-gray-800 shadow-md'>
            <header className="container flex justify-between items-center py-4 px-6 mx-auto ">
                <Link to="/">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Armand Bucket</h1>
                </Link>
                <nav className='flex content-center gap-4'>
                    <Link to="/login">
                        <Button variant="link" className=" text-gray-900 dark:text-gray-300">Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button variant="default">Sign Up</Button>
                    </Link>
                    <ModeToggle />
                </nav>
            </header>
        </div>
    );
};

export default Header;
