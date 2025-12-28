export default function Contact() {
    const sendIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                     </svg>;
    return (
        <section className="py-16 px-6" id="contact">
            <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                
                {/* LEFT COLUMN: Title */}
                <div className="md:col-span-4 md:sticky md:top-8 text-center md:text-right">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-slate-100 hover:text-slate-200 tracking-tighter uppercase mb-2 transition-colors">
                        Contact
                    </h2>
                    <span className="block text-2xl md:text-3xl font-bold text-blue-400 -mt-4 md:-mt-6 mr-0 md:mr-2">
                        Me
                    </span>
                </div>

                {/* RIGHT COLUMN: Content */}
                <div className="md:col-span-8 space-y-6 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-slate-200 mb-1">Send me a message</h3>
                    <p className="text-slate-300 leading-relaxed text-lg text-pretty">
                        I&apos;m currently open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium ml-1.5 animate-pulse">Open to Work</span> 
                    </p>
                
                        <form>
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-slate-200 font-medium">Name</label>
                                    <input type="text" id="name" className="mt-2 block w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none transition" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-slate-200 font-medium">Email</label>
                                    <input type="email" id="email" className="mt-2 block w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none transition" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="block text-slate-200 font-medium">Message</label>
                                    <textarea id="message" className="mt-2 block w-full px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none transition" rows={4} required></textarea>
                                </div>

                                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                                    <span className="inline-flex items-center gap-2">Send {sendIcon}</span>
                                </button>
                            </div>
                        </form>
                   
                </div>
            </div>
        </section>
    );
}
