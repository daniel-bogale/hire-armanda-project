// src/components/Footer.tsx
const Footer = () => {
    return (
        <footer className="py-6 bg-gray-800 text-white text-center dark:bg-gray-900">
            <p>&copy; {new Date().getFullYear()} Armanda Bucket. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
