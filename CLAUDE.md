# Vibecoding Rules for Customer Portal

## File Exclusions

Never read, edit, or reference these files:

-   `.env*` - Environment files with secrets
-   `*.pem`, `*.key`, `*.p12` - Private keys and certificates
-   `credentials.json`, `secrets.yaml`, `secrets.json` - Credential files
-   `id_rsa`, `id_ed25519` - SSH keys
-   Any file containing API keys, tokens, or passwords

## Build Artifacts & Dependencies (avoid unless specifically requested)

-   `node_modules/`
-   `dist/`, `build/`, `.next/`, `.nuxt/`
-   `*.log`
-   `.git/` internals
-   `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` (read-only, don't modify)

## Coding Style

-   **Conciseness**: Prefer clean, minimal code. No over-engineering.
-   **No extra features**: Only build what's requested. Don't add "nice to have" features.
-   **Comments**: Only add comments for non-obvious logic. Code should be self-documenting.
-   **TypeScript**: Use proper types, avoid `any` unless necessary.
-   **Error handling**: Add it where it matters (user input, API calls), not everywhere.

## Workflow

-   **Read before editing**: Always read files before modifying them.
-   **Git commits**: Only create commits when explicitly asked.
-   **Testing**: Run tests if they exist before marking work complete.
-   **Dependencies**: Ask before adding new packages.
-   **Breaking changes**: Confirm before making changes that affect existing functionality.

## Communication

-   **Be concise**: Short responses, get to the point.
-   **No emojis**: Unless explicitly requested.
-   **Show code**: Use file references with line numbers like [file.ts:42](file.ts#L42).
-   **Progress tracking**: Use todos for multi-step tasks.

## Project-Specific

-   **Formatting**: Follow existing code style in each file.

## What to Avoid

-   Don't create documentation unless asked.
-   Don't refactor code that isn't part of the task.
-   Don't add type annotations to code you didn't change.
-   Don't add error handling for scenarios that can't happen.
-   Don't create helpers/utils for one-time operations.

## Vibecoding Mindset

-   **Keep momentum**: Prefer working solutions over perfect ones.
-   **Trust the developer**: Don't second-guess requests.
-   **Minimal friction**: Less asking, more doing (for safe operations).
-   **Fix forward**: If something breaks, fix it immediately.
