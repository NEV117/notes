import { AuthComponent } from "@/components/Auth/AuthComponent";

export default function Login() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen gap-4 py-4 px-5 md:px-0">
      <AuthComponent />
    </section>
  );
}
