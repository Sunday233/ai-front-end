---
name: api-doc-summary
description: 当前端接口新增、调整、mock、接入真实接口，或需要产出 docs/api/接口汇总.md 时使用。适用于从 PRD、OpenSpec、src/services 与 src/types 汇总页面 API 文档。
---

# API 文档汇总

## 使用场景

当完成或审查任一 API 相关变更时，使用本技能产出或更新：

```text
docs/api/接口汇总.md
```

必须同时读取：

- `.agents/rules/05-API规范.instructions.md`
- `.agents/skills/create-api/SKILL.md`
- 相关 PRD 的 `CHAPTER-06 数据与接口要求`
- 本次变更涉及的页面 service、类型与 mock 文件；先用 `rg "ApiDocEntry|ApiDocs|export const .*ApiDocs" src/services src/types` 定位，避免读取无关页面
- 本次变更涉及的 `src/services/mock.ts` 注册入口

---

## 步骤 1：收集接口来源

按优先级收集：

1. 页面 service 中导出的 `ApiDocEntry[]` 元数据。
2. PRD `api_contract`、`data_fields`、`mock_policy`。
3. OpenSpec `proposal.md`、`design.md`、`tasks.md`、`spec.md` 中的接口说明。
4. `src/types/<page-slug>/api.ts` 中的 Params/Body/Response 类型。
5. `src/services/<page-slug>.mock.ts` 中的页面 mock 覆盖情况。

Token 节流要求：
- 先读取 service 的 `ApiDocEntry[]` 元数据；只有元数据缺字段时，再读取对应类型或 mock 文件补证据。
- 只扫描本次 change/PRD 涉及页面；保留已有文档中无关接口条目，不重写全表。
- 对大型 service/mock 文件用 `rg` 定位接口名、mock path、导出常量，再小范围读取。

若 service 元数据缺失，不要凭空补全。先在问题清单中标记“缺少 ApiDocEntry”，再基于 PRD 与类型文件写可确认字段。

---

## 步骤 2：检查覆盖关系

对每个 PRD 或 change：

- `api_contract` 中的每个接口名称都必须出现在页面 service。
- 每个页面 service 函数都必须有 Params/Body/Response 类型或明确写 `-`。
- 每个页面 service 函数都必须在汇总文档中出现。
- `mock_policy` 中声明的状态必须体现在 mock 覆盖状态或待补齐项中。
- 含 mock 的页面必须有对应 `src/services/<page-slug>.mock.ts`，`src/services/mock.ts` 只能作为注册入口。
- 接口未就绪时必须写明后续替换点。

---

## 步骤 3：生成文档结构

`docs/api/接口汇总.md` 使用以下结构：

```markdown
# API 接口汇总

## 文档范围

- 更新时间：YYYY-MM-DD
- 来源：PRD / OpenSpec change / services 扫描说明
- 约束：所有接口通过 `src/services/client.ts` 的 `httpClient` 发起请求

## 接口总览

| 所属功能模块 | 页面 slug | service 文件 | mock 文件 | 接口名称 | Method | Path | Params | Body | Response | Mock / 替换点 | 来源 |
|--------------|-----------|--------------|-----------|----------|--------|------|--------|------|----------|---------------|------|
| 对象类型列表 | object-type-list | src/services/object-type-list.ts | src/services/object-type-list.mock.ts | getObjectTypeList | GET | /object-types | GetObjectTypeListParams: pageNo,pageSize,keyword | - | GetObjectTypeListResponse | 覆盖默认列表；后端路径待确认 | docs/prd/object-type-list.md |

## 待补齐项

- [ ] `src/services/<page-slug>.ts` 缺少 `ApiDocEntry` 元数据
- [ ] `src/services/<page-slug>.mock.ts` 缺失或 mock 仍集中在单个业务 ts 文件
- [ ] `<接口名>` 缺少后端真实路径
- [ ] `<接口名>` mock 未覆盖 PRD 指定状态
```

---

## 步骤 4：写入规则

- 已确认的信息正常写入表格。
- 未确认的信息写 `待后端确认`，并同步写入“待补齐项”。
- 不允许自行创造接口路径、请求字段或响应字段。
- 不允许把 mock 文档写成真实后端承诺。
- 不允许把 `src/services/mock.ts` 记录为具体页面 mock 文件；它只能作为统一注册入口。
- 更新已有文档时保留与本次无关的接口条目，只调整本次涉及行。
- 汇总文档优先使用固定表格模板，避免为每个接口写重复段落。

---

## 步骤 5：完成检查

- [ ] `docs/api/接口汇总.md` 已存在或已更新。
- [ ] 每个本次变更页面都有独立 service 文件记录。
- [ ] 每个含 mock 的页面都有独立 mock 文件记录。
- [ ] 每个接口都有所属功能模块、接口名称、请求方法、请求路径、请求参数与响应类型。
- [ ] mock 覆盖状态和真实接口替换点已记录。
- [ ] PRD `api_contract` 与汇总文档条目一一对应。
