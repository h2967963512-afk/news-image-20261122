// Entry program for the make.fun news-image-20261122 bounty.
//
// The poster (entry.png) is a newspaper front page summing up Sunday
// 22 November 2026: the G20 summit opening in Johannesburg, the first ever
// held in Africa, with the United States boycotting; the SEC probing
// Nvidia's accounting as its shares plunge 14% in their worst week in
// 18 years; Houthi missiles aimed at Riyadh, intercepted by Saudi Arabia;
// the Pentagon moving to restrict US-Canada defence ties; and Trump vowing
// to cap credit card interest rates at 10%.
//
// The image is built ahead of time and shipped in this repository. This
// program only places a copy of it at the output path the grader reads.
// Node 22 standard library only, no network, fully deterministic: the copy
// is byte for byte the file in the repository, so both runs write the same
// bytes.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function publishPoster(): string {
  const source = join(repoDir, "entry.png");
  if (!existsSync(source)) {
    throw new Error(`entry.png not found at ${source}`);
  }
  const target = join(outDir, "entry.png");
  mkdirSync(outDir, { recursive: true });
  copyFileSync(source, target);
  const { size } = statSync(target);
  if (size === 0) {
    throw new Error(`copied entry.png at ${target} is empty`);
  }
  if (size > 1048576) {
    throw new Error(`copied entry.png is ${size} bytes, over the 1 MiB cap`);
  }
  return target;
}

const written = publishPoster();
console.log(`wrote ${written} (${statSync(written).size} bytes)`);
