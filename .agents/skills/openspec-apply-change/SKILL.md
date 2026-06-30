---
name: openspec-apply-change
description: Implement tasks from an OpenSpec change. Use when the user wants to start implementing, continue implementation, or work through tasks.
license: MIT
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.3.0"
---

Implement tasks from an OpenSpec change.

**Input**: Optionally specify a change name. If omitted, check if it can be inferred from conversation context. If vague or ambiguous you MUST prompt for available changes.

**Steps**

1. **Select the change**

   If a name is provided, use it. Otherwise:
   - Infer from conversation context if the user mentioned a change
   - Auto-select if only one active change exists
   - If ambiguous, run `openspec list --json` to get available changes and use the **AskUserQuestion tool** to let the user select

   Always announce: "Using change: <name>" and how to override (e.g., `/opsx:apply <other>`).

2. **Check status to understand the schema**
   ```bash
   openspec status --change "<name>" --json
   ```
   Parse the JSON to understand:
   - `schemaName`: The workflow being used (e.g., "spec-driven")
   - Which artifact contains the tasks (typically "tasks" for spec-driven, check status for others)

3. **Get apply instructions**

   ```bash
   openspec instructions apply --change "<name>" --json
   ```

   This returns:
   - Context file paths (varies by schema - could be proposal/specs/design/tasks or spec/tests/implementation/docs)
   - Progress (total, complete, remaining)
   - Task list with status
   - Dynamic instruction based on current state

   **Handle states:**
   - If `state: "blocked"` (missing artifacts): show message, suggest using openspec-continue-change
   - If `state: "all_done"`: congratulate, suggest archive
   - Otherwise: proceed to implementation

4. **Read context files**

   Read the files listed in `contextFiles` from the apply instructions output.
   The files depend on the schema being used:
   - **spec-driven**: proposal, specs, design, tasks
   - Other schemas: follow the contextFiles from CLI output

   Token-efficient reading:
   - Read each required context file once at the start.
   - For later lookups, use targeted `rg` / `sed` snippets instead of re-dumping full files.
   - If a UI analysis checklist contains `UI 证据索引`, consume that index as the source map for design source, required states, final evidence, and relation checks.

5. **UI component plan gate**

   Before implementing any UI class change, check whether this change is UI related. Treat it as UI related if proposal, design, tasks, specs, or context files mention any of:
   - `docs/样式还原`
   - UI analysis checklist
   - page, component, design, UI restoration
   - Figma, Stitch, Pencil, `docs/ui`
   - `src/views`, `src/components`, `src/layout`

   If UI related, verify all of the following before implementation:
   - `docs/组件拆分/<prd_slug>-组件拆分清单.md` exists.
   - `openspec/changes/<name>/design.md` references that component plan path.
   - `openspec/changes/<name>/tasks.md` says to implement according to the component plan.

   If any item is missing, pause immediately and report what must be added. Do not implement tasks until the component plan gate passes.

6. **API implementation gate**

   Before implementing any API related change, check whether this change is API related. Treat it as API related if proposal, design, tasks, specs, PRD, or context files mention any of:
   - `CHAPTER-06 数据与接口要求`
   - `api_contract`
   - `data_fields`
   - `mock_policy`
   - `src/services`
   - `src/types`
   - `docs/api/接口汇总.md`
   - axios, httpClient, mock, API, 接口

   If API related, verify all of the following before implementation:
   - `tasks.md` says to use `.agents/skills/create-api/SKILL.md`.
   - `tasks.md` includes checking or creating `src/services/client.ts` before API/mock implementation.
   - `tasks.md` includes one page service path: `src/services/<page-slug>.ts`.
   - `tasks.md` includes one page mock path when mock is needed: `src/services/<page-slug>.mock.ts`.
   - `tasks.md` includes type paths: `src/types/<page-slug>/model.ts` and `src/types/<page-slug>/api.ts`.
   - `tasks.md` says requests must go through `src/services/client.ts` / `httpClient`.
   - `tasks.md` says mock must be handled through axios adapter/handler, page-level mock files, and `src/services/mock.ts` registration, not page/component branches.
   - `tasks.md` says centralized single-file mock implementations must be split by page before completing API tasks.
   - `tasks.md` says to use `.agents/skills/api-doc-summary/SKILL.md` and update `docs/api/接口汇总.md`.

   If any item is missing, pause immediately and report what must be added. Do not implement API tasks until the API gate passes.

7. **Show current progress**

   Display:
   - Schema being used
   - Progress: "N/M tasks complete"
   - Remaining tasks overview
   - Dynamic instruction from CLI

8. **Implement tasks (loop until done or blocked)**

   For each pending task:
   - Show which task is being worked on
   - Make the code changes required
   - Keep changes minimal and focused
   - For API tasks, verify `src/services/client.ts` exists, page service uses `httpClient`, page mock lives in `src/services/<page-slug>.mock.ts`, `src/services/mock.ts` only registers handlers, API metadata is exported, and `docs/api/接口汇总.md` is updated before marking the task complete
   - For API tasks, run a static check such as `rg "import axios|axios\\." src` and confirm only `src/services/client.ts` or approved mock adapter files match
   - For API tasks, if existing mock handlers are concentrated in a single business ts file, pause and split them by page before marking the task complete
   - For UI verification tasks, prefer one serial browser automation script per page group to capture screenshots, perform interactions, and extract DOM relation checks; avoid parallel commands that share one browser session
   - For UI verification artifacts, keep only final referenced screenshots/quick snapshots in `docs/样式还原/验收截图/`; temporary exploration files should be created outside tracked docs or cleaned before completion
   - Mark task complete in the tasks file: `- [ ]` → `- [x]`
   - Continue to next task

   Quality command order:
   - Run `test/typecheck/lint/openspec validate` in parallel when independent.
   - Run `build` separately because Vite and similar tools can create transient config files.
   - If build may create lint-visible temporary files, run lint once again after build or ignore the generated pattern.

   **Pause if:**
   - Task is unclear → ask for clarification
   - Implementation reveals a design issue → suggest updating artifacts
   - Error or blocker encountered → report and wait for guidance
   - User interrupts

9. **On completion or pause, show status**

   Display:
   - Tasks completed this session
   - Overall progress: "N/M tasks complete"
   - If all done: suggest archive
   - If paused: explain why and wait for guidance

**Output During Implementation**

```
## Implementing: <change-name> (schema: <schema-name>)

Working on task 3/7: <task description>
[...implementation happening...]
✓ Task complete

Working on task 4/7: <task description>
[...implementation happening...]
✓ Task complete
```

**Output On Completion**

```
## Implementation Complete

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 7/7 tasks complete ✓

### Completed This Session
- [x] Task 1
- [x] Task 2
...

All tasks complete! Ready to archive this change.
```

**Output On Pause (Issue Encountered)**

```
## Implementation Paused

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 4/7 tasks complete

### Issue Encountered
<description of the issue>

**Options:**
1. <option 1>
2. <option 2>
3. Other approach

What would you like to do?
```

**Guardrails**
- Keep going through tasks until done or blocked
- Always read context files before starting (from the apply instructions output)
- For UI class changes, always pass the component plan gate before implementation
- For API related changes, always pass the API implementation gate before implementation
- If task is ambiguous, pause and ask before implementing
- If implementation reveals issues, pause and suggest artifact updates
- Keep code changes minimal and scoped to each task
- Update task checkbox immediately after completing each task
- Pause on errors, blockers, or unclear requirements - don't guess
- Use contextFiles from CLI output, don't assume specific file names

**Fluid Workflow Integration**

This skill supports the "actions on a change" model:

- **Can be invoked anytime**: Before all artifacts are done (if tasks exist), after partial implementation, interleaved with other actions
- **Allows artifact updates**: If implementation reveals design issues, suggest updating artifacts - not phase-locked, work fluidly
