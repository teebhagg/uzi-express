import { Button } from "@/components/ui/button";
import Link from "next/link";

const ImgUrl =
  "https://images.unsplash.com/photo-1555529669-2269763671c0?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[450px] rounded-md">
      <img
        src={ImgUrl}
        alt="Hero"
        className="absolute inset-0 object-cover w-full h-full rounded-md"
      />
      <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 p-4 md:gap-10">
        <div className="grid gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
            Welcome to the Team
          </h1>
          <p className="max-w-[700px] text-white">
            Your one-stop shop for all employee resources. From onboarding to
            professional development, we&apos;ve got you covered.
          </p>
        </div>
        <Link href="/about">
            <Button
              variant="ghost"
              className="mt-4 mx-2 text-white border border-white hover:border-0"
              // style={{ whiteSpace: "pre-wrap" }}
              style={{ whiteSpace: 'normal', width: 'auto', height: 'auto', textAlign: 'center' }}
            >
              Join Now
            </Button>
          </Link>
      </div>
    </div>
  );
}
