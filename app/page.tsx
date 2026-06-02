import PhoneFrame from "@/components/PhoneFrame";
import StoriesContainer from "@/components/StoriesContainer";

export default function Home() {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center bg-black">
      <PhoneFrame>
        <StoriesContainer />
      </PhoneFrame>
    </main>
  );
}
