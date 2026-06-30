# Change: Add Matrix object type UI

## Why

The PRDs under `docs/prd` define the Matrix workbench, object type list, and object type creation workflow. The repository currently needs the Vue implementation, API/mock layer, UI restoration documents, and verification assets for these screens.

## What Changes

- Add a Vue 3 + Vite SPA for the Matrix workbench, object type list, and object type creation routes.
- Add page-level components, Ant Design Vue controls, and scoped SCSS matching the Stitch/docs-ui design evidence.
- Add page services, request-layer mock handlers, TypeScript API/model definitions, and API summary documentation.
- Add UI analysis checklists, component plans, UI verification problem lists, and OpenSpec requirement coverage.

## Impact

- Affected specs: `matrix-object-types`
- Affected code: `src/layout`, `src/router`, `src/views`, `src/services`, `src/types`, `src/styles`, `src/utils`
- Affected docs: `docs/样式还原`, `docs/组件拆分`, `docs/api`
