import Header from "../components/Header";
import Footer from "../components/Footer";
import WaitListRegistration from "../components/WaitListRegistration";

export default function WaitListPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-gray-50">
        <WaitListRegistration />
      </main>
      <Footer />
    </>
  );
} 