import Link from "next/link";
import { Button } from "../ui/Button";
type AuthActionsProps = {
  loading: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
  onLinkClick?: () => void;
};

export function AuthActions({
  loading,
  isLoggedIn,
  onLogout,
  onLinkClick,
}: AuthActionsProps) {
  if (loading) return null;

  const linkProps = onLinkClick ? { onClick: onLinkClick } : {};

  if (!isLoggedIn) {
    return (
      <>
        <Link href="/register" {...linkProps}>
          <Button variant="outline">Sign Up</Button>
        </Link>

        <Link href="/login" {...linkProps}>
          <Button>Log in</Button>
        </Link>
      </>
    );
  }

  return <Button onClick={onLogout}>Logout</Button>;
}
