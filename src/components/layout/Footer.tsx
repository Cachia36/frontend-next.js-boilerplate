import { FaGithub, FaLinkedin } from "react-icons/fa";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-border text-muted-foreground mt-12 w-full border-t py-6 text-center text-xs">
      <div className="mb-2 flex items-center justify-center gap-3">
        <a
          href="https://github.com/cachia36"
          target="_blank"
          rel="noreferrer"
          className="border-border bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex h-8 w-8 items-center justify-center rounded-full border transition"
        >
          <FaGithub className="h-4 w-4" />
        </a>

        <a
          href="https://www.linkedin.com/in/kyle-cachia-41bbb8252/"
          target="_blank"
          rel="noreferrer"
          className="border-border bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex h-8 w-8 items-center justify-center rounded-full border transition"
        >
          <FaLinkedin className="h-4 w-4" />
        </a>
      </div>

      <p className="text-muted-foreground/80 text-[11px]">
        © {year} Kyle Cachia. All rights reserved.
      </p>
    </footer>
  );
}
