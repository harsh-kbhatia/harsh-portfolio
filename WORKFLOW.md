Round 1: Vague Prompt

Prompt: "build me a contact form with a few details in for visitors to fill in"

Claude Code had to interactively ask which project to target and how submissions should be handled, since nothing in the prompt specified either. It picked reasonable defaults (Name/Email/Message fields, client-side-only validation) and produced a working, type-checked form in one pass. Because CLAUDE.md is auto-loaded regardless of prompt quality, the output already respected our Tailwind-only styling rule and included aria-invalid/aria-describedby on inputs — accessibility we got "for free" from project conventions, not from the prompt.

What was missing: no phone field, no tests, a // TODO: wire up real submission handling comment left in shipped code, and a real UX bug — the handleChange function never clears an error or the submitted state, so a field that failed validation keeps showing its error message even after the visitor corrects it and before they resubmit.

Review effort: low upfront (it just worked), but every gap above was invisible until I went looking, since nothing verified itself.

Round 2: Precise Prompt

Prompt specified: file location, four fields with explicit type/format constraints (including phone as a string pattern, not an int — a correction I made in the prompt itself after catching my own mistake), per-field inline errors instead of a generic message, an explicit accessibility requirement (role="status" on the success confirmation), stack constraints, and a verification step (write tests, run them, run tsc --noEmit).

Claude Code entered plan mode, proposed a plan before touching code, and — mid-implementation — hit a real test failure (renders weren't cleaning up between tests since globals wasn't enabled in the Vitest config), diagnosed the cause correctly, and fixed it before presenting anything to me. It split the work into two commits (test infrastructure, then the form) without being asked. Final result: 5/5 tests passing, tsc --noEmit clean — both verified independently by me, not just claimed by Claude.

The mistake I caught: the phone regex (^\+?\d+$) only accepts a leading + and digits. I manually tested a realistically-formatted number, +1 555-123-4567, and it was rejected — spaces and hyphens aren't in \d. All 5 tests passed because none of them tested a human-formatted number; the AI followed my spec exactly, and my spec had the gap. Precise prompting didn't eliminate risk, it just moved it from "AI guesses wrong" to "AI executes my incomplete spec correctly."

Review effort: higher upfront (writing the prompt took real thought, plus reviewing the proposed plan and reading the diff), but total review+fix time was lower — the verification loop caught its own bug before I saw it, and I found the phone issue in under a minute of manual testing rather than reading the whole file line by line, since I knew what to check.

Comparison

Round 2 fixed round 1's TODO comment, added the missing phone field, added the explicit accessibility requirement, and fixed the stale-error UX bug — likely a side effect of writing tests that exercised the "correct a field, resubmit" path. Round 1 shipped faster but with unverified gaps; round 2 took longer to prompt but self-verified before I ever touched it, and the one real bug that remained (phone formatting) was one I could find and fix in a minute precisely because everything else was already trustworthy.