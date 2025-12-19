export default function Terminal() {
    return (
    <div className=" container  mx-auto w-lg flex-1 relative hidden md:block">
        <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full"></div>

        <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500 h-[350px]">

          {/* Browser Header */}
          <div className="flex items-center gap-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded text-xs text-gray-500 flex-1 text-center font-mono">
              https://www.tornam.dev
            </div>
          </div>

          {/* Mock Content */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="h-20 rounded-md bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-600/20 flex items-center justify-center">
                 <span>{'</>'}</span>
              </div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-full bg-gray-100 dark:bg-gray-700/50 rounded"></div>
              <div className="h-3 w-4/5 bg-gray-100 dark:bg-gray-700/50 rounded"></div>
            </div>

            <div className="space-y-3">
              <div className="h-20 rounded-md bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-600/20 flex items-center justify-center">
                <span>{'</>'}</span>
              </div>
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 w-full bg-gray-100 dark:bg-gray-700/50 rounded"></div>
              <div className="h-3 w-4/5 bg-gray-100 dark:bg-gray-700/50 rounded"></div>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-6 -right-6 bg-black text-white p-4 rounded-xl shadow-xl animate-bounce">
            <span>{'</>'}</span>
          </div>
        </div>
    </div>
    );
}