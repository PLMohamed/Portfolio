export default function Loading() {
    return (
        <div className="duration-400 mb-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-44">
            <div className="animate-pulse">
                <div className="mb-2 h-4 w-11/12 rounded bg-gray-300 dark:bg-zinc-700"></div>
                <div className="mb-4 h-4 w-10/12 rounded bg-gray-300 dark:bg-zinc-700"></div>
                <div className="mb-2 h-4 w-60 rounded bg-gray-300 dark:bg-zinc-700"></div>
                <div className="mb-4 h-4 w-80 rounded bg-gray-300 dark:bg-zinc-700"></div>
                <div className="mb-2 h-4 w-60 rounded bg-gray-300 dark:bg-zinc-700"></div>
                <div className="mb-2 h-4 w-40 rounded bg-gray-300 dark:bg-zinc-700"></div>
            </div>
            <div className="flex h-48 w-full animate-pulse items-center justify-center rounded-md bg-gray-300  dark:bg-zinc-700">
                <svg
                    className="h-10 w-full text-gray-200 dark:text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>
        </div>
    );
}
