import { SERVICES } from '@/lib/constants';
import ServiceDetailClient from './service-detail-client';

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  return <ServiceDetailClient params={params} />;
}
