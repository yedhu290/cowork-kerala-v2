'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/admin/layout/app-layout';
import { Header } from '@/components/admin/layout/header';
import { SpacesFilters } from '@/components/admin/spaces/spaces-filters';
import { SpacesTable } from '@/components/admin/spaces/spaces-table';
import { api } from '@/lib/admin/api';
import { Loader2, Building2, Plus } from 'lucide-react';
import { ISpace } from '@/types/admin';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function SpacesContent() {
  const searchParams = useSearchParams();
  const [spaces, setSpaces] = useState<ISpace[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSpaces = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams(searchParams);
      const { data } = await api.get(`/spaces?${params.toString()}`);
      if (data.success) {
        setSpaces(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch spaces:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/spaces/${id}`);
      fetchSpaces();
    } catch (error) {
      console.error('Failed to delete space', error);
    }
  };

  const handleToggleFeatured = async (id: string, isFeatured: boolean) => {
    // Optimistic update
    setSpaces(prev =>
      prev.map(space =>
        space._id === id || space.id === id ? { ...space, isFeatured } : space
      )
    );

    try {
      await api.put(`/spaces/${id}`, { isFeatured });
    } catch (error) {
      console.error('Failed to update featured status', error);
      fetchSpaces(); // Revert changes
    }
  };

  const handleStatusChange = async (
    id: string,
    status: 'active' | 'inactive' | 'pending'
  ) => {
    // Optimistic update
    setSpaces(prev =>
      prev.map(space =>
        space._id === id || space.id === id ? { ...space, status } : space
      )
    );

    try {
      await api.put(`/spaces/${id}`, { status });
    } catch (error) {
      console.error('Failed to update status', error);
      fetchSpaces(); // Revert changes
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (spaces.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50">
        <Building2 className="h-10 w-10 text-neutral-300" />
        <p className="mt-3 text-sm font-medium text-neutral-600">
          No spaces yet
        </p>
        <p className="mt-1 text-sm text-neutral-400">
          Create your first coworking space
        </p>
        <Link href="/admin/spaces/create" className="mt-4">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Space
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <SpacesFilters />

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200">
        <SpacesTable
          spaces={spaces}
          onDelete={handleDelete}
          onToggleFeatured={handleToggleFeatured}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}

export default function SpacesPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <Header
        title="Coworking Spaces"
        description="Manage your coworking spaces, virtual offices, and private offices"
        breadcrumbs={[{ label: 'Dashboard', href: '/admin' }, { label: 'Spaces' }]}
        action={{
          label: 'Add Space',
          onClick: () => router.push('/admin/spaces/create'),
        }}
      />

      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
          </div>
        }
      >
        <SpacesContent />
      </Suspense>
    </AppLayout>
  );
}
