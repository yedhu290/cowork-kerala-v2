'use client';

import { AppLayout } from '@/components/admin/layout/app-layout';
import { Header } from '@/components/admin/layout/header';
import { LocationForm } from '@/components/admin/locations/location-form';

export default function CreateLocationPage() {
  return (
    <AppLayout>
      <Header
        title="Create Location"
        description="Add a new city or area"
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Locations', href: '/admin/locations' },
          { label: 'Create' },
        ]}
      />

      <div className="max-w-2xl">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <LocationForm />
        </div>
      </div>
    </AppLayout>
  );
}
