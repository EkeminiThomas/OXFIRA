import Faq from "@/components/landingpage/FAQ";
import Hero from "@/components/landingpage/Hero";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";


export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <section className="max-w-7xl md:mx-10 ">
        <Hero />
        <Faq />
      </section>

      <Footer />
    </div>
  );
}
