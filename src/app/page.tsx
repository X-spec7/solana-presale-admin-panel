import { Hero } from "@/components/LandingPage";
import { Metadata } from "next";
import { LoginForm } from "@/components/Common";

export const metadata: Metadata = {
  title: "Admin Site",
  description: "This is Admin Site",
};

export default function Home() {
  return (
    <div className="relative z-10 overflow-hidden bg-white dark:bg-gray-dark min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
