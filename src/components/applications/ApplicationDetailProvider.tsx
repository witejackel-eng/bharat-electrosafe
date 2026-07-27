'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { ApplicationDetailDialog } from '@/components/applications/ApplicationDetailDialog';
import { applications, type Application } from '@/data/applications';

interface ApplicationDetailContextValue {
  openApplication: (appId: string) => void;
  closeApplication: () => void;
  /** Currently selected application id (or null when closed). */
  selectedAppId: string | null;
}

const ApplicationDetailContext = createContext<ApplicationDetailContextValue | null>(null);

export function ApplicationDetailProvider({ children }: { children: ReactNode }) {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const openApplication = useCallback((appId: string) => {
    const exists = applications.some((a) => a.id === appId);
    if (exists) {
      setSelectedAppId(appId);
    }
  }, []);

  const closeApplication = useCallback(() => setSelectedAppId(null), []);

  // Derive the active application object from the selected id during render.
  // No setState-in-effect: `open` is derived from the selected id and the
  // onOpenChange handler resets state through an event handler only.
  const application: Application | null = useMemo(() => {
    if (!selectedAppId) return null;
    return applications.find((a) => a.id === selectedAppId) ?? null;
  }, [selectedAppId]);

  const value = useMemo(
    () => ({ openApplication, closeApplication, selectedAppId }),
    [openApplication, closeApplication, selectedAppId],
  );

  return (
    <ApplicationDetailContext.Provider value={value}>
      {children}
      <ApplicationDetailDialog
        application={application}
        open={Boolean(application)}
        onOpenChange={(o) => {
          if (!o) closeApplication();
        }}
      />
    </ApplicationDetailContext.Provider>
  );
}

export function useApplicationDetail() {
  const ctx = useContext(ApplicationDetailContext);
  if (!ctx) {
    throw new Error('useApplicationDetail must be used within ApplicationDetailProvider');
  }
  return ctx;
}
