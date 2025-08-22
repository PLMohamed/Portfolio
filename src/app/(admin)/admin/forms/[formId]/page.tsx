import FormDisplay from "@/components/Form";
import { Label } from "@/components/ui/label";
import { ActionGetContactById } from "@/lib/server/actions/contact";
import { withAuthPage } from "@/lib/server/wrappers";
import { format } from "date-fns";
import { redirect } from "next/navigation";

interface EditProjectsPageProps {
  params: Promise<{
    formId: string;
  }>;
}

async function ViewFormPage({ params }: EditProjectsPageProps) {
  const { formId } = await params;

  const { data: form, error } = await ActionGetContactById(formId);

  if (error) {
    redirect("/admin/forms?error=" + error.message);
  }

  return (
    <div className="flex min-h-[calc(100svh-3.5rem-1.5rem)] grow flex-col gap-y-6 lg:-mt-6 lg:flex-row lg:divide-x *:lg:pt-6">
      <article className="space-y-4 px-4 md:space-y-6 lg:grow lg:space-y-8">
        <section>
          <h1 className="text-2xl font-bold md:text-3xl">
            View Form : {form.subject}
          </h1>
          <p className="text-muted-foreground max-md:text-sm">
            Check the details of the form submission below.
          </p>
        </section>
        <FormDisplay form={form} />
      </article>
      <aside className="w-full px-4 lg:max-w-2xs">
        <div className="flex flex-col gap-2">
          <Label>Submitted At :</Label>
          <div className="dark:bg-input/30 flex h-9 w-full min-w-0 items-center rounded-md border bg-transparent px-3 py-1 text-base shadow-xs md:text-sm">
            {format(form.createdAt!, "PPP pp")}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default withAuthPage(ViewFormPage);
