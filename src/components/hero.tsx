import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Hero = () => {
    return (
        <section className="flex flex-col items-center justify-center text-center py-24 bg-gray-100 dark:bg-gray-800 mt-20 rounded-sm">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Securely Upload and Manage Your Images</h1>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">Store your images safely in the cloud with AI-powered image analysis.</p>
            <Link to="/register">
                <Button size="lg" variant="default">Get Started</Button>
            </Link>
        </section>
    );
};

export default Hero;
