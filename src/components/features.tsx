const Features = () => {
    const features = [
        { title: "Secure Image Upload", description: "Easily upload and store your images securely in the cloud." },
        { title: "AI Image Analysis", description: "Use AI to analyze and generate descriptions for your images." },
        { title: "User-Friendly Dashboard", description: "Manage your images with a simple and intuitive interface." },
    ];

    return (
        <section className="py-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                {features.map((feature, index) => (
                    <div key={index} className="p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800">
                        <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
