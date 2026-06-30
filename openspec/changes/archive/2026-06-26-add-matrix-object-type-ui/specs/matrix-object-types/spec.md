## ADDED Requirements

### Requirement: Matrix workbench page

The system SHALL provide a Matrix workbench page at `/workbench` matching the UI analysis checklist and PRD behavior.

#### Scenario: Default workbench renders

- **GIVEN** the user opens `/workbench`
- **WHEN** the page loads
- **THEN** the sidebar, search bar, create button, recent cards, favorite cards, resource counts, and management entries are visible
- **AND** the layout follows `docs/样式还原/workbench-UI分析清单.md`

#### Scenario: Create menu opens

- **GIVEN** the user can create resources
- **WHEN** the user opens the create menu
- **THEN** object type, link type, action type, and object type group options are shown in the design order

### Requirement: Object type list page

The system SHALL provide an object type list page at `/object-types` with search, refresh, pagination, permission-aware create entry, and a design-matched table.

#### Scenario: List table renders

- **GIVEN** the user opens `/object-types`
- **WHEN** list data loads
- **THEN** rows display type name, status, visibility, modified time, and detail action in the same order as the UI analysis checklist

#### Scenario: Search and pagination work

- **GIVEN** the user searches by id, rid, or name
- **WHEN** the search term changes or pagination changes
- **THEN** matching results are highlighted and sorted by updated time descending

### Requirement: Object type create wizard

The system SHALL provide an object type creation wizard at `/object-types/create` with four steps and validation-driven navigation.

#### Scenario: Wizard steps render

- **GIVEN** the user opens `/object-types/create`
- **WHEN** the wizard loads
- **THEN** the step header shows data source, metadata, attribute, and action steps
- **AND** each step matches `docs/样式还原/object-type-create-UI分析清单.md`

#### Scenario: Attribute mapping preserves row relation

- **GIVEN** the user reaches attribute configuration
- **WHEN** mapping rows are displayed
- **THEN** each dataset field maps to its corresponding attribute in the same row
- **AND** title key, primary key, delete state, and row order are preserved

### Requirement: API and mock layer

The system SHALL expose page services through `httpClient`, use page-level mock files, and document all PRD API contracts.

#### Scenario: Services use request-layer mocks

- **GIVEN** mock mode is enabled
- **WHEN** pages call their service functions
- **THEN** requests are intercepted by page-level mock handlers registered from `src/services/mock.ts`
- **AND** page components do not branch on mock state

### Requirement: UI verification and quality gates

The system SHALL include OpenSpec, API documentation, UI problem lists, and passing quality gates.

#### Scenario: Delivery is verifiable

- **GIVEN** implementation is complete
- **WHEN** validation is run
- **THEN** OpenSpec validation, tests, typecheck, lint, build, and UI verification artifacts are available
