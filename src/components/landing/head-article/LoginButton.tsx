import Link from "next/link";

function LoginButton() {
  return (
    <Link
      href="/login"
      className="flex h-14 items-center justify-center gap-2.5 rounded-full bg-primary-500 px-6 py-4 text-[28px] font-light text-white"
    >
      Login
    </Link>
  );
}
export default LoginButton;
