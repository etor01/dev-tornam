
export default function Contact() {
    return (
        <section className="py-16 px-6 bg-white" id="contact">
            <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                
                {/* LEFT COLUMN: Title */}
                <div className="md:col-span-4 md:sticky md:top-8 text-center md:text-right">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-blue-200 hover:text-yellow-500 tracking-tighter uppercase mb-2">
                        Contact
                    </h2>
                    <span className="block text-2xl md:text-3xl font-bold text-yellow-500 -mt-4 md:-mt-6 mr-0 md:mr-2">
                        Me
                    </span>
                </div>

                {/* RIGHT COLUMN: Content */}
                <div className="md:col-span-8 space-y-6 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-700">Get in Touch</h3>
                    <p className="text-gray-600 leading-relaxed text-lg text-pretty">
                        I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
                        Whether you have a question or just want to say hello, feel free to reach out! 
                    </p>
                
                        <form>
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-700">Name</label>
                                    <input type="text" id="name" className="mt-1 block w-full p-2 border border-gray-300 rounded" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700">Email</label>
                                    <input type="email" id="email" className="mt-1 block w-full p-2 border border-gray-300 rounded" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="block text-gray-700">Message</label>
                                    <textarea id="message" className="mt-1 block w-full p-2 border border-gray-300 rounded" rows={4} required></textarea>
                                </div>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                            </div>
                        </form>
                   
                </div>
            </div>
        </section>
    );
}