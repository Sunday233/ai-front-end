# matrix-object-type Specification

## Purpose
TBD - created by archiving change add-matrix-object-type-workflow. Update Purpose after archive.
## Requirements
### Requirement: Matrix Workbench Page

The system SHALL provide a Matrix workbench page that restores the Stitch design for navigation, search, resource cards, and create dropdown.

#### Scenario: User opens workbench

- **WHEN** the user visits `/workbench`
- **THEN** the left navigation, search bar, recent object type card, favorite object type cards, and create button are displayed
- **AND** clicking create opens object type, link type, action type, and object type group options

### Requirement: Object Type List Page

The system SHALL provide an object type list page with search, refresh, create entry, table data, status display, and pagination.

#### Scenario: User searches object types

- **WHEN** the user enters a keyword in the search box
- **THEN** the table filters by id, rid, or name
- **AND** matched text in object type names is highlighted

### Requirement: Object Type Create Wizard

The system SHALL provide a four-step object type create wizard matching the Stitch design.

#### Scenario: User completes create flow

- **WHEN** the user selects a dataset, enters metadata, configures attributes, and selects or skips actions
- **THEN** the wizard validates each step before continuing
- **AND** completion returns the user to the object type list page

### Requirement: UI Restoration

The system SHALL implement the Matrix pages according to the UI analysis documents generated from Stitch MCP and local screenshots.

#### Scenario: UI verification is performed

- **WHEN** the implemented pages are opened in a browser
- **THEN** layout, text, hierarchy, colors, table rows, form fields, modal, and wizard states match the analysis checklists

