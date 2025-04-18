import Header from "../../components/Header";
import Footer from "../../components/Footer";
import WaitList from "../../components/WaitList";

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        <WaitList />
      </main>
      <Footer />
    </>
  );
} 