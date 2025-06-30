import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import TentangKami from '../components/TentangKami';
import ProdukKategoriSection from '../components/ProdukKategoriSection';
import FooterSection from '../components/FooterSection';

export default function Home() {
  useEffect(() => {
    document.title = "SetupStore";
  }, []);

  return (
    <>
      <section id="home">
        <HeroSection />
      </section>
      <section id="about">
        <TentangKami />
      </section>
      <section id="produk">
        <ProdukKategoriSection />
      </section>
      <section id="kontak">
        <FooterSection />
      </section>
    </>
  );
}
