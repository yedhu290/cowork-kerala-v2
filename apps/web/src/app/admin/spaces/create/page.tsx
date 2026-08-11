'use client';

import { AppLayout } from '@/components/admin/layout/app-layout';
import { Header } from '@/components/admin/layout/header';
import { SpaceForm } from '@/components/admin/spaces/space-form';

export default function CreateSpacePage() {
  return (
    <AppLayout>
      <Header
        title="Add New Space"
        description="Create a new coworking space listing"
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Spaces', href: '/admin/spaces' },
          { label: 'Create' },
        ]}
      />

      <SpaceForm />
    </AppLayout>
  );
}
