import { Hero } from '@/components/site/hero';
import { SpatialStory } from '@/components/site/spatial-story';
import { Capabilities } from '@/components/site/capabilities';
import { Experience } from '@/components/site/experience';

export default function Home() {
  return (
    <>
        <Hero />
        <SpatialStory />
        <Capabilities />
        <Experience />
    </>
  );
}
