import Orderbook from "@/components/Orderbook";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-background`}
    >
      <Orderbook />
    </main>
  )
}
