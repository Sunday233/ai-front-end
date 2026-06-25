# object-type-create - UI 问题清单

> 参照文档：`docs/样式还原/object-type-create-UI分析清单.md`  
> 设计稿：Stitch `https://stitch.withgoogle.com/projects/11214155578152749288`；本地截图 `docs/ui/创建对象类型*.png`  
> 设计源定位：`e597fa376efd4c2fb5ef23f9a9a4b64f`、`0c566485a01542e49187bbc14ce5c7e9`、`8b5e3dbd1e80406b97d836da39139824`、`32f74761e96642bd88b6b20879cbfe56`  
> 实现页与视口：`http://127.0.0.1:5173/object-types/create`；1600x900  
> 浏览器工具：Codex in-app Browser  
> 验收证据：`docs/样式还原/验收截图/object-type-create-step1.png`、`docs/样式还原/验收截图/object-type-create-dataset-modal.png`、`docs/样式还原/验收截图/object-type-create-step3.png`、`docs/样式还原/验收截图/object-type-create-step4-action.png`  
> 创建/更新日期：2026-06-17

## 一、按区域列问题

### 全局结论

| 编号 | 核对项 | 当前实现 | 设计稿要求 | 结论 | 优先级 |
|------|--------|----------|------------|------|--------|
| OTC-OK-001 | 可运行页面与路由 | `/object-types/create` 可打开，四步向导正常渲染 | 浏览器打开对象类型创建页 | 通过 | - |
| OTC-OK-002 | 数据源步骤 | 已有数据集卡片、未选择态和选择数据集入口正常 | 第一步展示数据来源选择 | 通过 | - |
| OTC-OK-003 | 数据集弹窗 | 弹窗展示左侧数据集列表、基本信息、列信息、数据预览 tab | 左右联动数据集弹窗 | 通过 | - |
| OTC-OK-004 | 元数据步骤 | 显示名称、同义词、ID、描述、对象组表单正常，可进入下一步 | 元数据表单完整 | 通过 | - |
| OTC-OK-005 | 属性配置 | emp_no、hight、birth_date、first_name、last_name、gender 逐行映射；emp_no 标记主键 | 必须按 `mappingRows[]` 渲染字段到属性映射 | 通过 | - |
| OTC-OK-006 | 动作配置 | 创建测试、修改测试、删除测试和用户 chenzhenq5、chenzhenq8 可见 | 动作权限配置内容一致 | 通过 | - |

### 发现问题

| 编号 | 问题描述 | 类型 | 当前实现 | 设计稿要求 | 优先级 |
|------|----------|------|----------|------------|--------|
| - | 未发现 P0/P1/P2 问题 | - | 浏览器回归通过 | 继续以分析清单作为后续改动基线 | - |

### 关系型区域核对

| 源字段/行 | 当前实现映射 | 设计稿要求 | 状态/操作差异 | 优先级 |
|-----------|--------------|------------|----------------|--------|
| 数据集列表 | as、employees、报工数据、零件信息、调整后kejie；employees 选中 | 左列表与右侧详情联动 | 无差异 | - |
| 数据集列信息 | emp_no、birth_date、first_name、last_name、gender、hight | 同左 | 无差异 | - |
| 属性映射第 1 行 | emp_no -> Int / emp_no / 主键 | 同左 | 无差异 | - |
| 属性映射第 2 行 | hight -> Float / hight / 可删除 | 同左，保留 `hight` 拼写 | 无差异 | - |
| 属性映射第 3-6 行 | birth_date、first_name、last_name、gender 逐行映射 | 同左 | 无差异 | - |
| 动作权限 | 创建测试、修改测试、删除测试；用户 chenzhenq5、chenzhenq8 | 同左 | 无差异 | - |

## 二、问题统计与修复顺序

| 优先级 | 数量 | 说明 |
|--------|------|------|
| P0 | 0 | 未发现阻塞性布局、层级、内容问题 |
| P1 | 0 | 未发现主要交互或状态问题 |
| P2 | 0 | 未发现需记录的轻微视觉问题 |

无需新增修复项；后续若创建流程或数据集契约变更，按本清单重新回归。

## 三、验收结论

- [x] P0（布局、层级、文字、图片）全部修复
- [x] P1 全部修复
- [x] P2 已记录/部分修复
- [x] 已使用 Codex in-app Browser / Browser 或 Playwright 进行实际页面与设计稿/分析清单比对
- [ ] 若未使用 Browser 完成验收，已记录失败阶段、替代工具、视口和证据
- [x] 表格/列表/左右映射/字段属性映射已逐行核对
- [x] 修复后已再次使用 Browser 或 Playwright 回归验证
- [x] 还原度自评：高
