import { doesUserExist } from "@/db/queries";
import { redirect } from "next/navigation";

export function withAdminEmptyPage<P extends object>(
  page: (props: P) => React.JSX.Element | Promise<React.JSX.Element>,
) {
  return async function AdminEmptyPage(props: P) {
    const userExists = await doesUserExist();

    if (userExists) {
      redirect("/auth/login");
    }

    return page(props);
  };
}

export function withAdminExistPage<P extends object>(
  page: (props: P) => React.JSX.Element | Promise<React.JSX.Element>,
) {
  return async function AdminExistPage(props: P) {
    const userExists = await doesUserExist();

    if (!userExists) {
      redirect("/auth/signup");
    }

    return page(props);
  };
}
