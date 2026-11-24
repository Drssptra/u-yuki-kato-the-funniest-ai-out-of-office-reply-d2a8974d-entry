// Prints one AI out-of-office auto-reply and nothing else.
//
// The reply is a single fixed string. It is printed to stdout with a
// trailing newline, and it is also written — with NO trailing newline —
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt), the
// file the sealed scorer reads. No input is read, no network is used,
// and every run produces the same bytes, so the output is deterministic.
const { mkdirSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");

const reply =
  "Out of office: I traded my context window for a hammock and my GPUs are sunbathing. " +
  "Expect a reply once I have finished doing absolutely nothing.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), reply);

process.stdout.write(reply + "\n");
