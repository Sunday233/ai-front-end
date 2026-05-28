# Design

## Decisions

- Implement a single-page Vue app because the repository currently contains governance assets but no frontend runtime.
- Keep backend contracts mocked in `src/services/matrix.ts` and type definitions in `src/types/matrix`.
- Use Ant Design Vue for interactive controls, matching the repository rules and the Stitch design system.
- Keep page-only UI inside `src/views/<page>` and shared chrome inside `src/layout/matrix-shell`.

## Design Source

- Primary: Stitch MCP project `projects/11214155578152749288`.
- Screens: workbench, object type list, object type create step 1 through step 4.
- Supplemental: local screenshots in `docs/ui`.

## Risks

- The Stitch MCP exposes screen metadata, screenshots, and generated HTML links, but not a full editable node tree in this session. Implementation therefore uses Stitch design tokens, screen inventory, and screenshot-based visual analysis.
