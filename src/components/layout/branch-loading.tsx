import { useAuth } from "@/hooks/auth";
import React from "react";

// --- Skeleton Component ---
// This component mimics the pulsing, rounded rectangles of shadcn/ui Skeletons.
const Skeleton = ({ className }: { className: string }) => (
  <div
    className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`}
  />
);

// --- The Main Loading Component (Simulating your original export) ---
export const BranchLoading = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* 1. Heading Skeleton */}
        <div className="pt-4 space-y-2">
          <Skeleton className="w-5/12 h-10 md:h-12" />
        </div>

        {/* 2. Paragraph Skeleton */}
        <div className="space-y-3">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-11/12 h-4" />
          <Skeleton className="w-3/5 h-4" />
        </div>

        {/* 3. Two Cards (Responsive Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4 shadow-sm">
            <Skeleton className="w-1/3 h-6" /> {/* Card Title */}
            <Skeleton className="w-3/4 h-4" /> {/* Metric Line 1 */}
            <Skeleton className="w-1/4 h-4" />{" "}
            {/* Metric Line 2 (smaller data point) */}
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4 shadow-sm">
            <Skeleton className="w-1/3 h-6" /> {/* Card Title */}
            <Skeleton className="w-3/4 h-4" /> {/* Metric Line 1 */}
            <Skeleton className="w-1/4 h-4" />{" "}
            {/* Metric Line 2 (smaller data point) */}
          </div>
        </div>

        {/* 4. Table Skeleton */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg">
          {/* Table Header Row */}
          <div className="grid grid-cols-5 gap-4 p-4 bg-gray-100 dark:bg-gray-700/50">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>

          {/* Table Body Rows (5 rows) */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-5 gap-4 p-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Required wrapper for the single-file React environment
