import { PageIntro } from '@/components/site/page-intro';
import { Capabilities } from '@/components/site/capabilities';
import { InformationCycle } from '@/components/site/information-cycle';
import { ContactCTA } from '@/components/site/contact-cta';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata('Capabilities', 'GIS, emergency management, GeoAI, custom software, data integration and planning—connected around the work you need to do.');

export default function CapabilitiesPage() {
  return <><PageIntro label="Capabilities" title={<>Geospatial expertise.<br /><span>Operational purpose.</span></>} description="Understand the problem. Connect the information. Build the tools that help people act. Our six capability groups work together around your operation." /><Capabilities compact /><InformationCycle /><ContactCTA /></>;
}
