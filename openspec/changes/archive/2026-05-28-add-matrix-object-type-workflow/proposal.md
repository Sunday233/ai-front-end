# Change: Add Matrix Object Type Workflow

## Why

The PRDs in `docs/prd` describe a Matrix workbench, object type list, and object type creation flow that should be restored from Stitch designs and available as runnable frontend pages.

## What Changes

- Add a Vue 3 + Vite + TypeScript app scaffold in the repository.
- Add Matrix workbench, object type list, and object type create routes.
- Use Stitch MCP design source `projects/11214155578152749288` plus local screenshots to implement layout, typography, colors, navigation, tables, forms, modals, and wizard states.
- Add mock services and types for list, search, permission, dataset, and create operations.
- Add UI analysis and UI verification documents under `docs/样式还原`.

## Impact

- Affected specs: `matrix-object-type`
- Affected code: `package.json`, `src/main.ts`, `src/router`, `src/layout`, `src/views`, `src/services`, `src/types`, `src/styles`
