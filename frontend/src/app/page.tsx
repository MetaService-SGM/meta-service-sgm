import Sidebar from "@/components/Sidebar";



export default function Home() {
  return (
    <div
      style={{ fontFamily: "var(--font-nunito)" }}
      className="text-2xl text-black bg-gray-500"
    >
      <Sidebar></Sidebar>
    </div>
  );
}
