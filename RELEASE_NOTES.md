# DiceFrame v2.5.8

> 正式版：包含 **v2.5.7 的全部变更**（两版发布间隔极短，为便于一次性升级合并展示），并额外修复叙事二次压缩的 QUICK_ACTIONS 同步与文风继承、角色创建属性页的购点/背景加值混淆问题。

## 中文

### 本版新增修复（v2.5.7 之后）

- **叙事二次压缩同步 QUICK_ACTIONS 并继承自定义文风**：超长 GM 正文的二次压缩现在输出 JSON，同时压缩正文并核对 QUICK_ACTIONS——被压缩删掉且此前未公开的信息不会再残留在快捷动作里；压缩输入只含原正文、原 QUICK_ACTIONS、最近公开剧情与 GM 叙事风格（继承自定义语气/节奏），authoritative 状态（HP/金币/战斗/检定等）完全不重新解析；仍然最多 2 次 LLM 调用；压缩失败硬截断时清空 QUICK_ACTIONS 并由默认动作兜底。
- **角色创建属性页拆分「基础属性分配」与「背景属性提升」**：27 点购点始终显示六项属性并可在全部六项间自由分配（8–15）；显式列出当前背景允许提升的属性；背景无法提升职业推荐主属性时给出明确提示——这是合法组合，主属性仍可经购点提高，未放宽任何 SRD 规则；「推荐 +2/+1」按钮明确限定只在背景允许属性中分配。
- **掷骰生成下隐藏「使用职业推荐」快捷按钮**：避免把职业推荐标准数组伪装成掷骰结果（后端对 rolled 只校验 3–18 范围）。

### 以下为 v2.5.7 的全部内容（随本版一并发布）

#### 战斗（D&D 2024 · 权威规则）

- 专业战斗工具弹窗可滚动：低高度窗口下动作卡与确认按钮不再被裁掉（`1280×620` / `1024×600` / `390×700` 三档验证），移动端横向卡片带与 PageDown 保持可用。
- 剧情遭遇不被静默替换：冒险包未绑定合法遭遇时明确提示，不再退回通用训练预设。
- AI 临时遭遇：剧情未配置遭遇时由 AI 参考剧情生成兜底（不改冒险包）；预览为可编辑草稿——逐怪勾选、编辑名称/数量/HP/AC/速度/先攻、攻击增删改、恢复原稿/重新生成；结算后可再次发起；数量展开为唯一 ID 实例，最终敌情由服务端按同一套边界与队伍安全上限重新校验，越界整场拒绝。
- 战斗中途加入：新玩家自动插入当前行动者之后的先攻序列（带先攻骰），走版本化事件账本。
- 复活与战斗状态同步：复活通过规则集钩子同步进战斗名单。
- 检定同源重复惩罚收敛：情境 DC / 优势劣势 / 环境修正只保留一条渠道，丢弃值记录在 `planner_dropped`。
- 检定更可解释：修正明细与「判定来源」展示（中英日三语）。
- DC 档位以规则表 `ruleset.dc_table` 为准，偏离需说明依据。

#### 叙事与投掷

- GM 文风控制：每局语气（文学/直接/幽默/黑暗）、详略、节奏、自定义指令，可跟随世界默认；覆盖只下发给 GM。
- 冒险模式叙事控制与手动投掷：通用用途（检定/对抗/自由）、时间线展示、绑定遭遇。
- 手动投掷结果进入 AI 上下文：检定/对抗强制收录，自由投掷 GM 勾选后收录；私密投掷只对 GM 与目标本人可见；最近 8 条；中英日文案；不自动修改机制状态。
- 时间线投掷信息完整：说明、公式、总值（自然 ± 修正）、目标与胜负，待投掷明确标注。
- 生成 token 上限统一 4096：六项默认全部提升（配置迁移 v6 自动升级旧默认值，显式自定义值保留）；长输出任务不再因截断反复失败。

#### Web 与部署

- Web 监听器重构（双协议监听与后续打磨）；WebUI 地址在引导日志前打印。
- Docker：TLS 环境变量透传、附加端口可单独启用；ACME 验证端口跟随实际监听器并固定宿主 80；内部 API 优先明文 HTTP 并在改址后重启插件。
- `/api/config` 公开下发 `server_version` 与 `min_client_version`。

#### 存储与数据

- Lorebook/记忆查询迁移 peewee（连接与迁移契约不变）；启动时检测 peewee 运行时依赖。
- 装备/背包状态协议：获得/装备/卸下/使用明确拆分；canonical 装备槽位 authority 不再被 LLM slot 覆盖。

#### 测试与工程

- 后端 CI 输出覆盖率、注册 `integration`/`optional` marker、离线测试文档、退役 schema 6 前旧用例；助手知识索引可离线构建。

### 升级提示

- **无破坏性存档迁移**：peewee 迁移保持既有契约；新增字段均为可选/追加；token 上限迁移自动把旧默认值提升到 4096（显式自定义值与环境变量不受影响）。
- 建议升级重要战役前备份完整 `data/` 目录。

### 下载与校验

- **普通 Windows 用户**：`DiceFrame-v2.5.8-windows-portable.zip`
- **源码运行用户**：`DiceFrame-v2.5.8-windows.zip`
- **托管 Docker 更新**：`DiceFrame-v2.5.8-docker-update-linux-amd64.zip`
- 下载后请使用 Release 中的 `SHA256SUMS` 校验文件。

## English

### New fixes in this release (after v2.5.7)

- **Narration compression now syncs QUICK_ACTIONS and inherits the custom GM style**: the secondary compression of over-long GM narration outputs JSON that compresses the text and reviews QUICK_ACTIONS together — details removed by compression and never previously revealed no longer linger in quick actions. The compression input contains only the original narration, the original QUICK_ACTIONS, recent public narration and the GM narration style (inheriting custom voice/pacing); authoritative state (HP/gold/combat/checks) is never re-parsed; still at most 2 LLM calls; on compression failure the text is hard-truncated and QUICK_ACTIONS fall back to defaults.
- **Character creation splits "Base ability scores" from "Background ability bonuses"**: 27-point buy always shows all six abilities (8–15); the abilities a background may increase are listed explicitly; when the background cannot raise the class's recommended primary ability a clear note explains this is a legal combination with weaker synergy (no SRD rules relaxed); the "Recommended +2/+1" button is explicitly scoped to background-legal abilities.
- **The "Use class recommendation" shortcut is hidden for rolled scores**: prevents presenting the recommended standard array as rolled results (the server only validates the 3–18 range for rolled scores).

### All of v2.5.7 (included in this release)

#### Combat (D&D 2024 · authoritative rules)

- The professional combat tool scrolls inside its dialog; action cards and confirm button reachable at short viewport heights.
- Story encounters are never silently replaced by training presets.
- AI temporary encounters: AI-drafted fallback when the story has no bound encounter; editable draft (per-enemy keep/edit, attacks, restore/regenerate, re-arm after combat settles); quantities expand to unique-id instances and the final list is re-validated server-side against the same bounds and party safety caps.
- Mid-combat joins enroll right after the current actor via the versioned event ledger.
- Revival propagates into combat state via a ruleset hook.
- Duplicate penalty channels collapsed (adv/disadv > DC > modifier, discarded values in `planner_dropped`).
- More explainable checks: modifier breakdown and resolution sources (zh/en/ja).
- DC bands follow `ruleset.dc_table`.

#### Narration and rolls

- GM narration style controls (tone/verbosity/pace/custom instructions, world default, GM-only override).
- Adventure-mode narrative controls and manual rolls (generic purposes, timeline display, encounter binding).
- Manual roll results enter the AI context (checks/contests always, free rolls opt-in; private-roll isolation; latest 8; zh/en/ja labels; never mutates mechanics).
- Full roll details in the timeline (label, formula, total with natural ± modifier, target, verdicts, awaiting state).
- Generation token caps unified at 4096 (config migration v6 upgrades old defaults; explicit custom values preserved).

#### Web and deployment

- Web listeners rework (dual-protocol listeners and polish); the WebUI address prints before bootstrap logs.
- Docker: TLS env vars forwarded, extra ports individually enabled, ACME validation port follows listeners and pins host port 80, internal API prefers plain HTTP and restarts plugins after address changes.
- `/api/config` serves `server_version` and `min_client_version`.

#### Storage and data

- Lorebook/memory queries moved to peewee with contracts unchanged; peewee runtime dependency detected at startup.
- Item/inventory state protocol: acquire/equip/unequip/use separated; canonical slot authority no longer overridden by LLM slots.

#### Tests and engineering

- Backend CI coverage, `integration`/`optional` markers, offline test docs, pre-schema-6 case retirement; assistant knowledge index builds offline.

### Upgrade notes

- **No breaking save migration**: the peewee migration keeps existing contracts; new fields are optional/additive; the token-cap migration raises old defaults to 4096 automatically (explicit custom values and env vars are untouched).
- Back up the complete `data/` directory before upgrading important campaigns.

### Downloads and verification

- **Regular Windows users**: `DiceFrame-v2.5.8-windows-portable.zip`
- **Source users**: `DiceFrame-v2.5.8-windows.zip`
- **Managed Docker update**: `DiceFrame-v2.5.8-docker-update-linux-amd64.zip`
- Verify downloads with the `SHA256SUMS` file attached to the Release.
