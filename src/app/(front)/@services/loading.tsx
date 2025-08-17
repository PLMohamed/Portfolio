import CardLoading from "./components/CardLoading";

export default function Loading() {
  return (
    <div className="container grid grid-cols-1 items-stretch justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <CardLoading key={index} />
      ))}
    </div>
  );
}
