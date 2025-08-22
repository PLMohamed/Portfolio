import { LoginForm } from "@/components/Auth/Login";
import { withAdminExistPage } from "@/lib/server/wrappers";

function LoginPage() {
  return <LoginForm />;
}

export default withAdminExistPage(LoginPage);
