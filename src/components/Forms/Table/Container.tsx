import { ActionGetContacts } from "@/lib/server/actions/contact";
import { validateSchema } from "@/lib/server/services";
import { formFilterValidator } from "@/lib/validators/form";
import z from "zod";
import FormsTable from "./Table";

interface ContainerProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const formSchema = z.tuple([formFilterValidator]);

export default async function FormsContainer({ searchParams }: ContainerProps) {
  const [validatedFilters] = validateSchema(formSchema, [searchParams]);
  const { data } = await ActionGetContacts(validatedFilters);

  return (
    <section className="space-y-4 px-4">
      <FormsTable data={data} />
    </section>
  );
}
