import { Header } from '@/components/site/header';
import { Hero } from '@/components/site/hero';
import { SpatialStory } from '@/components/site/spatial-story';
import { Footer } from '@/components/site/footer';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <SpatialStory />
      </main>
      <Footer />
    </>
  );
}
