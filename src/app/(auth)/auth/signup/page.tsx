import { SignupForm } from "@/components/Auth/Signup";
import { withAdminEmptyPage } from "@/lib/server/wrappers";

function SignupPage() {
  return <SignupForm />;
}

export default withAdminEmptyPage(SignupPage);
