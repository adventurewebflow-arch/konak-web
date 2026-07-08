import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware zamjene za next/navigation (koriste se u komponentama u Task 3).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
