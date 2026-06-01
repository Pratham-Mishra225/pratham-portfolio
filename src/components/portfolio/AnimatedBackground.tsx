export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-70" />
      <div className="absolute inset-0 bg-grid mask-fade opacity-[0.25]" />
      <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand/20 blur-3xl animate-blob" />
      <div className="absolute top-40 -right-20 h-[26rem] w-[26rem] rounded-full bg-brand-glow/20 blur-3xl animate-blob [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-brand/15 blur-3xl animate-blob [animation-delay:-12s]" />
    </div>
  );
}
