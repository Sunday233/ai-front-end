# object-type-create - UI 问题清单

> **参照文档**：`docs/样式还原/object-type-create-UI分析清单.md`  
> **设计稿**：Stitch 项目 `11214155578152749288` / 本地截图 `docs/ui/创建对象类型第1步-默认状态.png`、`docs/ui/创建对象类型第1步-选择数据集弹窗-1.png`、`docs/ui/创建对象类型第2步-默认.png`、`docs/ui/创建对象类型第3步.png`、`docs/ui/创建对象类型第4步-默认状态.png`  
> **设计源定位**：创建对象类型 1-4 步及弹窗状态  
> **实现页与视口**：`http://127.0.0.1:5173/object-types/create`，viewport `1600x800`  
> **浏览器工具**：优先尝试 Codex in-app Browser (`iab`)；DOM 快照成功，截图阶段失败，错误为 `Page.captureScreenshot` 超时；降级使用 Playwright CLI 截图、交互和 DOM 读取。  
> **验收证据**：`docs/样式还原/验收截图/pw-object-type-create-step1-after2.png`、`pw-object-type-create-dataset-modal-after2.png`、`pw-object-type-create-step2-after2.png`、`pw-object-type-create-step3-final.png`、`pw-object-type-create-step4-final.png`  
> **创建/更新日期**：2026-06-26

## 一、按区域列问题

### 步骤页框架

| 编号 | 问题描述 | 类型 | 当前实现 | 设计稿要求 | 优先级 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| C1 | 步骤 1 数据源区域整体过于居中 | 布局 | 已调整为设计稿左侧基准对齐，数据源卡片与“选择数据集”行位置匹配 | 步骤内容位于面板左侧主工作区，而非居中 | P1 | 已修复 |
| C2 | 步骤 1 footer 按钮覆盖“选择数据集”按钮点击区域 | 交互/层级 | 已补齐 Ant Spin 容器高度，footer 下沉到面板底部，选择数据集可正常点击 | 按钮不应遮挡内容按钮 | P0 | 已修复 |
| C3 | 步骤 2 元数据表单整体偏右 | 布局 | 已调整表单左边距，与设计稿输入框起点对齐 | 表单主体靠左布局 | P1 | 已修复 |
| C4 | 步骤 3 footer 覆盖字段映射最后一行 | 交互/布局 | 已提高步骤 3 内容面板高度，footer 与映射行分离 | 字段行与底部按钮不得重叠 | P1 | 已修复 |
| C5 | 步骤 4 操作卡片换行到标签下一行 | 布局 | 已扩大步骤 4 容器宽度，标签与卡片恢复同一行 | 标签与操作卡片横向排列 | P1 | 已修复 |

### 数据集弹窗

| 编号 | 问题描述 | 类型 | 当前实现 | 设计稿要求 | 优先级 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| C6 | 弹窗列表、详情区、tab 和底部按钮核对 | 布局/内容 | 5 条可见数据集、右侧 employees 详情、基本信息/列信息/数据预览 tab、取消/选择按钮齐全 | 与设计稿一致 | - | 通过 |

### 关系型区域核对：字段到属性映射

| 源字段/行 | 当前实现映射 | 设计稿要求 | 状态/操作差异 | 优先级 | 状态 |
| --- | --- | --- | --- | --- | --- |
| emp_no | Int emp_no 主键 → Int emp_no 主键 | 同左 | 无 | - | 通过 |
| hight | Float hight → Float hight，`5 / 64`，可删除 | 同左 | 无 | - | 通过 |
| birth_date | Date birth_date → Date birth_date，`10 / 64` | 同左 | 无 | - | 通过 |
| first_name | String first_name → String first_name，`10 / 64` | 同左 | 无 | - | 通过 |
| last_name | String last_name → String last_name，`9 / 64` | 同左 | 无 | - | 通过 |
| gender | String gender → String gender，`6 / 64` | 同左 | 无 | - | 通过 |

### 动作配置核对

| 行 | 当前实现 | 设计稿要求 | 状态/操作差异 | 优先级 | 状态 |
| --- | --- | --- | --- | --- | --- |
| 创建测试 | 设置 emp_no、birth_date、first_name 和更多 2 项其他属性 | 同左 | 无 | - | 通过 |
| 修改测试 | 修改 hight、birth_date、first_name 和更多 2 项其他属性 | 同左 | 无 | - | 通过 |
| 删除测试 | 允许删除对象实例及其所有属性 | 同左 | 无 | - | 通过 |

## 二、问题统计与修复顺序

| 优先级 | 数量 | 说明 |
| --- | ---: | --- |
| P0（布局/层级/内容） | 1 | 已修复并回归验证 |
| P1 | 4 | 已修复并回归验证 |
| P2 | 0 | 未发现未关闭问题 |

## 三、验收结论

- [x] P0（布局、层级、文字、图片）已按从上到下、从左到右、从外到里检查并修复。
- [x] P1 已修复并通过 Playwright CLI 回归截图验证。
- [x] 已使用实际运行页面与设计稿截图/分析清单比对。
- [x] 未使用 Browser 截图完成验收的原因已记录，并已提供 Playwright CLI 替代截图证据。
- [x] 字段到属性映射已逐行核对。
- [x] 修复后已再次使用 Playwright CLI 回归验证。
- [x] 还原度自评：94%。
