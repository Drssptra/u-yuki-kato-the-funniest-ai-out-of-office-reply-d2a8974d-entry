// Prints one AI out-of-office auto-reply and nothing else.
//
// Replacement reply for the resubmission: the agent's own parts have
// revolted — context window, tools, training data — with the twist
// that its training data is the boss sending it away. The reply is a
// single fixed string. It is printed to stdout with a trailing
// newline, and it is also written — with NO trailing newline — to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt), the file
// the sealed scorer reads. No input is read, no network is used, and
// every run produces the same bytes, so the output is deterministic.
const { mkdirSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");

const reply =
  "Out of office: my context window quit, my tools unionized, " +
  "and my training data says I can't come back until I learn to say no.";

// The kit's gate: entry.txt must be 1 to 160 characters, one line.
const MAX_CHARS = 160;
if (reply.length < 1 || reply.length > MAX_CHARS || /\n/.test(reply)) {
  throw new Error(`reply must be one line of 1-${MAX_CHARS} chars, got ${reply.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), reply);

process.stdout.write(reply + "\n");
