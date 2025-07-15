import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/ui/login-form";
import Link from "next/link";

export default function page() {
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col items-center justify-center">
        <h1 className="mb-7 text-lg font-semibold">HALIL Distribution</h1>
        <Link href={"/"}>
          <Button variant={"link"}>Allez sur halil.com</Button>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
