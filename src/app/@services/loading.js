import CardLoading from "./components/CardLoading";

export default function Loading() {
    return (
        <div className="mt-12 flex max-w-full translate-x-0 translate-y-0 flex-col items-stretch justify-center gap-4 opacity-100 transition-all duration-500 *:w-full *:flex-wrap md:flex-row *:lg:w-1/3">
            <CardLoading />
            <CardLoading />
            <CardLoading />
        </div>
    );
}
