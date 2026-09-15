import { MetadataRoute } from 'next';
import { DEMO_PROJECTS, DEMO_SERVICES } from '@/data/demo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ztech.dev';

  const routes = [
    '',
    '/about',
    '/contact',
    '/process',
    '/projects',
    '/services',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const projectRoutes = DEMO_PROJECTS.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const serviceRoutes = DEMO_SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes, ...serviceRoutes];
}
