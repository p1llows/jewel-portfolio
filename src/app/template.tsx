import { PageTransition } from "@/components/motion/PageTransition";

// A template re-mounts on every navigation (unlike a layout), which is what lets the wipe replay.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTransition />
      {children}
    </>
  );
}
