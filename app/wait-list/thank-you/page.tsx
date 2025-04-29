import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WaitList from "../../components/WaitList";

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center">
        <WaitList />
      </main>
    </>
  );
} 