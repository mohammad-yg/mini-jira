"use client";

import { createDashboardStore } from "@/modules/dashboard/stores/dashboard-store";
import {
  DashboardStore,
  DashboardStoreSeeds,
  DashboardStoreState,
} from "@/modules/dashboard/types/dashboard-store.type";
import { clientProjectsRegistry } from "@/modules/projects/client/projects-registry.client";
import React, { ReactNode, useContext, useState } from "react";
import { useStore } from "zustand";

export const DashboardStoreContext = React.createContext<
  DashboardStore | undefined
>(undefined);

export interface DashboardStoreProviderProps {
  children: ReactNode;
  initialState: DashboardStoreSeeds;
}

export function DashboardStoreProvider({
  children,
  initialState,
}: DashboardStoreProviderProps) {
  const [store] = useState(() =>
    createDashboardStore(initialState, {
      getProjectTasksQuery: clientProjectsRegistry.getProjectTasksQuery,
    }),
  );

  return (
    <DashboardStoreContext.Provider value={store}>
      {children}
    </DashboardStoreContext.Provider>
  );
}

export function useDashboardStore<T>(
  selector: (state: DashboardStoreState) => T,
): T {
  const storeContext = useContext(DashboardStoreContext);

  if (!storeContext) {
    throw new Error(
      "useDashboardStore must be used within DashboardStoreProvider",
    );
  }

  return useStore(storeContext, selector);
}
