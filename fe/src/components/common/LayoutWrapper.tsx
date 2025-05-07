"use client";

/**
 * Provides a centered layout wrapper with a constrained main content area.
 *
 * Renders its {@link children} inside a flexbox layout, centering content horizontally and applying a background color and maximum width.
 *
 * @param children - The content to display within the layout.
 */
export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex justify-center bg-grayscale-5">
      <main className="w-full max-w-[414px] min-h-screen flex flex-col mx-auto relative">
        {children}
      </main>
    </div>
  );
}
