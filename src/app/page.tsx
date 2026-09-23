import Hero from "./components/Hero";
import Library from "./components/Library";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Library />
      </main>

      <Footer />
    </>
  );
}