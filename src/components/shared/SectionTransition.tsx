/**
 * Simple static section divider
 * Clean visual separation between sections
 */
export default function SectionTransition() {
  return (
    <div className="relative z-0 py-12 w-full md:py-16">
      <div className="flex justify-center items-center">
        <div className="w-20 h-px bg-border/50" />
      </div>
    </div>
  );
}
