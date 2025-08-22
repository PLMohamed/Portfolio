import About from "@/components/About";
import AboutLoading from "@/components/About/loading";
import Services from "@/components/Services";
import ServiceLoading from "@/components/Services/loading";
import Projects from "@/components/Works";
import { Fragment, Suspense } from "react";

export default function Page() {
  return (
    <Fragment>
      <Suspense fallback={<AboutLoading />}>
        <About />
      </Suspense>

      <Suspense fallback={<ServiceLoading />}>
        <Services />
      </Suspense>

      <Suspense>
        <Projects />
      </Suspense>
    </Fragment>
  );
}
