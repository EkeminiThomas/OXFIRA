
import Features from "@/components/landingpage/Features";
import Hero from "@/components/landingpage/Hero";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";


export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
