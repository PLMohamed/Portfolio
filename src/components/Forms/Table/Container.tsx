import { ActionGetForms } from "@/lib/server/actions/form";
import { validateSchema } from "@/lib/server/services";
import { formFilterValidator } from "@/lib/validators/form";
import z from "zod";
import FormsTable from "./Table";
import FormsDialogProvider from "@/providers/FormsDialog";
import { Suspense } from "react";
import Dialogs from "./Dialogs";

interface ContainerProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const formSchema = z.tuple([formFilterValidator]);

export default async function FormsContainer({ searchParams }: ContainerProps) {
  const [validatedFilters] = validateSchema(formSchema, [searchParams]);
  const { data } = await ActionGetForms(validatedFilters);

  return (
    <section className="space-y-4 px-4">
      <FormsDialogProvider>
        <FormsTable data={data} />
        <Suspense>
          <Dialogs />
        </Suspense>
      </FormsDialogProvider>
    </section>
  );
}
