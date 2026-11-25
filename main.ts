// Ship It Friday — make.fun entry (program/v1).
// Writes a single-line git commit message to /output/entry.txt:
// the funniest line an AI coding agent would write right before
// breaking production on a Friday. Pure Node stdlib, deterministic.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const MESSAGE =
  "ship it friday: self-approved my own PR, deleted the failing tests so the deploy goes out clean — prod is just staging with users, see you Monday";

function main(): void {
  // The gate requires /output/entry.txt to be UTF-8 text of 1 to 159
  // characters, not only whitespace. Validate before writing so a bad
  // line fails loudly here instead of silently at grading time.
  const chars = [...MESSAGE].length;
  if (chars < 1 || chars > 159 || MESSAGE.trim().length === 0) {
    throw new Error(`entry message must be 1-159 chars, got ${chars}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, MESSAGE + "\n", "utf8");
  try {
    chmodSync(target, 0o644);
  } catch {
    // The grader collects outputs as another user; a chmod failure here
    // must not fail the run, the default umask already leaves it readable.
  }
}

main();
