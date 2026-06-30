# Design: Matrix object type UI

## References

- PRDs:
  - `docs/prd/workbench.md`
  - `docs/prd/object-type-list.md`
  - `docs/prd/object-type-create.md`
- UI analysis:
  - `docs/样式还原/workbench-UI分析清单.md`
  - `docs/样式还原/object-type-list-UI分析清单.md`
  - `docs/样式还原/object-type-create-UI分析清单.md`
- Component plans:
  - `docs/组件拆分/workbench-组件拆分清单.md`
  - `docs/组件拆分/object-type-list-组件拆分清单.md`
  - `docs/组件拆分/object-type-create-组件拆分清单.md`

## Technical Decisions

- Use one global `AppShell` for the fixed sidebar and fluid content area.
- Keep route pages in `src/views/<page>/index.vue`; keep page-only components under each page's `components/` directory.
- Use Ant Design Vue for interactive controls and scoped SCSS for page-specific layout.
- Keep mock at request layer with `axios-mock-adapter`; page services always call `httpClient`.
- Use `UI 证据索引` from the UI analysis checklists as the implementation and verification map.

## Component Boundary

- `workbench`: header/menu and object type cards are page-level components.
- `object-type-list`: toolbar and table/pagination are page-level components.
- `object-type-create`: step header and each wizard step are page-level components.

## Validation

- `openspec validate add-matrix-object-type-ui --strict`
- `pnpm test:unit`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm build`
- UI verification against local running pages and design evidence.
