import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Notes/Dashboard";

export default function Home() {
  return (
    <section className="flex flex-col  gap-4 py-4 md:py-5">
      <Hero/>
      <Dashboard/>

    </section>
  );
}
