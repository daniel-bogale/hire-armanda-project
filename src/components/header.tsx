import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';

const Header = () => {
    return (
        <header className="flex justify-between items-center py-4 px-8 bg-white dark:bg-gray-900 shadow-md">
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
    );
};

export default Header;
