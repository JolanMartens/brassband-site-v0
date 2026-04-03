export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-muted py-6 mt-12">
      <div className="container flex mx-auto px-4 text-center items-center justify-center gap-8 mb-4">
        <img
          src="/sponsors/logo-cultuur-gent.png"
          alt="logo cultuur gent"
          className="w-auto h-10"
        />
        <img
          src="/sponsors/logo-cultuurhuis-merelbeke.png"
          alt="logo cultuurhuis merelbeke"
          className="w-auto h-10"
        />
        <img
          src="/sponsors/logo-de-poel.avif"
          alt="logo de poel"
          className="w-auto h-10"
        />
        <img
          src="/sponsors/logo-vlamo.jpg"
          alt="logo vlamo"
          className="w-auto h-10"
        />
      </div>
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Brassband Panta Rhei. Alle rechten
        voorbehouden.
      </div>
    </footer>
  );
}
