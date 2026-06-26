# matrix-object-types Specification

## Purpose
TBD - created by archiving change add-matrix-object-type-ui. Update Purpose after archive.
## Requirements
### Requirement: Matrix workbench page

The system SHALL provide a Matrix workbench page that matches the PRD and UI analysis for resource navigation, search, object type cards, and create-resource menu behavior.

#### Scenario: Default workbench renders from mock summary

- **WHEN** the user opens `/workbench`
- **THEN** the page shows the left navigation, breadcrumb, search input, create button, recent object type section, favorite object type section, resource counts, and card content described in `docs/样式还原/workbench-UI分析清单.md`
- **AND** the create menu opens with object type, link type, action type, and object type group options in that order.

#### Scenario: Workbench permissions hide unavailable actions

- **WHEN** create or management permissions are false in the mock response
- **THEN** the unavailable create options and management entries are not rendered.

### Requirement: Object type list page

The system SHALL provide an object type list page that supports keyword search, refresh, pagination, permission-aware create actions, and row-level rendering matching the UI analysis.

#### Scenario: Default list preserves row mapping

- **WHEN** the user opens `/object-types`
- **THEN** the table shows columns `类型名称`, `状态`, `可见性`, `修改时间`, and `操作`
- **AND** the 9 visible rows match the names, statuses, visibility labels, timestamps, and `详情` actions recorded in `docs/样式还原/object-type-list-UI分析清单.md`.

#### Scenario: Search and pagination remain layout-stable

- **WHEN** the user searches, refreshes, or changes page
- **THEN** requests go through the page service
- **AND** loading, empty, search empty, disabled, and no-permission states do not break the table and pagination layout.

### Requirement: Object type creation wizard

The system SHALL provide a four-step object type creation wizard that matches the UI analysis and preserves row-level relationships for datasets, attributes, actions, and executors.

#### Scenario: Wizard advances through four steps

- **WHEN** the user completes each required step in `/object-types/create`
- **THEN** the wizard advances through `选择数据源`, `元数据配置`, `属性配置`, and `动作配置`
- **AND** the step header, form layout, content panel, and footer actions match `docs/样式还原/object-type-create-UI分析清单.md`.

#### Scenario: Attribute mapping is row-level

- **WHEN** the user reaches the attribute configuration step
- **THEN** dataset fields and target attributes are rendered from `mappingRows[]`
- **AND** `emp_no`, `hight`, `birth_date`, `first_name`, `last_name`, and `gender` retain the exact order, types, labels, and actions from the UI analysis.

#### Scenario: Actions and executors remain linked

- **WHEN** the user selects an action type
- **THEN** the executor selector appears for that selected action
- **AND** selected users `chenzhenq5` and `chenzhenq8` render as tags with the dropdown state described in the UI analysis.

### Requirement: Page-level API and mock architecture

The system SHALL implement page-level services, page-level mocks, typed request/response contracts, and API documentation for all PRD `CHAPTER-06` contracts.

#### Scenario: Services use the shared HTTP client

- **WHEN** any page loads data or submits an action
- **THEN** the page calls a function from `src/services/<page-slug>.ts`
- **AND** that service uses `httpClient`
- **AND** no page, component, or page service bypasses the request layer with local mock branches.

#### Scenario: Mock metadata is documented

- **WHEN** API path/method are not provided by the PRD
- **THEN** API metadata marks the path and method as `待后端确认`
- **AND** `docs/api/接口汇总.md` records mock coverage and replacement points for workbench, object-type-list, and object-type-create.

### Requirement: UI implementation governance

The system SHALL implement the change only after UI analysis and component planning are present, and SHALL verify UI against the analysis outputs.

#### Scenario: UI change passes planning gate

- **WHEN** OpenSpec validation or apply is attempted
- **THEN** `docs/组件拆分/workbench-组件拆分清单.md`, `docs/组件拆分/object-type-list-组件拆分清单.md`, and `docs/组件拆分/object-type-create-组件拆分清单.md` exist
- **AND** `design.md` references those component plans
- **AND** `tasks.md` says to implement according to the component plans.

#### Scenario: UI verification records findings

- **WHEN** implementation is complete
- **THEN** UI verification produces issue lists for all three PRDs
- **AND** P0/P1/P2 issues are fixed or explicitly recorded with evidence and follow-up notes.

