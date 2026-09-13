# DiceFrame v2.5.7

> 正式版：专业战斗体验全面升级——AI 临时遭遇（生成/编辑/结算后再战）、GM 文风控制、手动投掷进入 AI 上下文、检定可解释性、生成 token 上限统一 4096，以及 Web 监听器/存储层/装备协议的一系列修复（beta.1 + beta.2 全部内容）。

## 中文

### 战斗（D&D 2024 · 权威规则）

- **专业战斗工具弹窗可滚动**：低高度窗口下动作卡与确认按钮不再被裁掉；`1280×620`、`1024×600`、`390×700` 三档都能滚到动作区与结算日志，移动端横向卡片带与键盘 PageDown 保持可用。
- **剧情遭遇不被静默替换**：活动冒险包没有为当前敌情绑定合法遭遇时，战斗工具明确提示"当前剧情尚未配置专业战斗遭遇"，不再退回通用训练遭遇；GM 想打自由遭遇必须显式声明。
- **AI 临时遭遇**：剧情未配置遭遇时可由 AI 参考当前剧情生成临时遭遇兜底（不修改冒险包）；预览为可编辑草稿——逐怪勾选（至少一个）、编辑名称/数量/HP/AC/速度/先攻加值、攻击增删改、恢复原稿/重新生成；战斗结算后也可再次发起。确认开战时数量展开为唯一 ID 实例，最终敌情由服务端按同一套数值边界与队伍安全上限重新校验，越界整场拒绝。
- **战斗中途加入**：新加入玩家自动插入当前行动者之后的先攻序列（带先攻骰），走与战斗意图相同的版本化事件账本，过期客户端意图无法跳过新角色。
- **复活与战斗状态同步**：角色复活通过规则集钩子同步进战斗名单，不再出现状态不一致。
- **检定同源重复惩罚收敛**：同一情境事实被同时写进情境 DC、优势/劣势与环境修正时只保留一条渠道（优先级：优势/劣势 > DC > 修正），被丢弃的原值记录在 `planner_dropped`；非零环境修正必须给出独立理由。
- **检定结果更可解释**：修正明细列出「属性加值 / 熟练加值 / 情境修正」，结算卡显示「判定来源」（中英日三语），可从总额倒推每项来源。
- **DC 档位以规则表为准**：规划 prompt 不再硬编码"简单 8 / 普通 10"，统一取 `ruleset.dc_table`，偏离需说明依据。

### 叙事与投掷

- **GM 文风控制**：每局可调语气（文学/直接/幽默/黑暗）、详略、节奏与自定义指令，可跟随世界保存的默认文风；文风覆盖只下发给 GM，普通玩家看不到自定义指令内容。
- **冒险模式叙事控制与手动投掷**：冒险模式新增叙事控制项；手动投掷支持通用用途（规则检定 / 对抗比较 / 自由投掷）、结果进入时间线、与剧情遭遇绑定。
- **手动投掷结果进入 AI 上下文**：检定与对抗结果作为「权威手动投掷事实」注入下一次 AI 叙事（check/contest 强制收录，自由投掷由 GM 勾选后收录）；私密投掷只对 GM 与目标本人可见，只保留最近 8 条，中/英/日对局使用对应语言文案；投掷不自动修改任何机制状态。
- **时间线投掷信息完整**：投掷卡显示说明、公式与 `总值（自然 ± 修正）· 目标 · 成功/失败/胜负` 全量信息，待投掷状态明确标注。
- **生成 token 上限统一 4096**：叙事、角色生成、摘要、简报、分析、文字生成六项默认全部提升到 4096（配置迁移 v6 自动升级旧默认值，显式自定义值保留）；长输出任务（如冒险包整包草稿）不再因截断反复失败。

### Web 与部署

- **Web 监听器重构**：双协议监听器与后续打磨；WebUI 监听地址在引导日志之前打印。
- **Docker**：透传 TLS 环境变量、附加端口可单独启用；ACME 验证端口跟随实际监听器并固定宿主 80；内部 API 优先明文 HTTP 并在改址后重启插件。
- **版本元数据**：`/api/config` 公开下发 `server_version` 与 `min_client_version`，客户端可提示升级。

### 存储与数据

- **Lorebook/记忆查询迁移 peewee**：连接与迁移契约保持不变；启动时检测 peewee 运行时依赖并给出明确报错。
- **装备/背包状态协议**：获得/装备/卸下/使用明确拆分；canonical 装备槽位 authority 不再被 LLM slot 覆盖。

### 测试与工程

- 后端 CI 输出覆盖率、注册 `integration`/`optional` marker、补齐离线测试文档、退役 schema 6 前旧 PAY/TEAM_PAY 用例；助手知识索引可离线构建，测试不再依赖外网。

### 升级提示

- **无破坏性存档迁移**：peewee 迁移保持既有契约；新增字段均为可选/追加；token 上限迁移自动把旧默认值提升到 4096（显式自定义值与环境变量不受影响）。
- 建议升级重要战役前备份完整 `data/` 目录。

### 下载与校验

- **普通 Windows 用户**：`DiceFrame-v2.5.7-windows-portable.zip`
- **源码运行用户**：`DiceFrame-v2.5.7-windows.zip`
- **托管 Docker 更新**：`DiceFrame-v2.5.7-docker-update-linux-amd64.zip`
- 下载后请使用 Release 中的 `SHA256SUMS` 校验文件。

## English

### Combat (D&D 2024 · authoritative rules)

- **The professional combat tool scrolls inside its dialog**: action cards and the confirm button are reachable at short viewport heights (`1280×620`, `1024×600`, `390×700`); mobile card lanes and keyboard PageDown keep working.
- **Story encounters are never silently replaced**: when the active adventure package binds no legal encounter to the current opposition, the tool reports an explicit "no prepared encounter" state instead of falling back to generic training presets; a free encounter requires an explicit GM declaration.
- **AI temporary encounters**: when the story has no bound encounter, the AI drafts a temporary one from the current scene (the adventure package is never modified). The preview is an editable draft — keep/drop enemies (at least one), edit name/quantity/HP/AC/speed/initiative, add/remove/edit attacks, restore or regenerate; it can also be started again after combat settles. On confirm, quantities expand into unique-id instances and the final enemy list is re-validated server-side against the same bounds and party safety caps; out-of-range payloads are rejected as a whole.
- **Mid-combat joins**: late players are enrolled right after the current actor (with an initiative roll) through the same versioned event ledger used by combat intents, so stale client intents cannot skip the new actor.
- **Revival syncs with combat state**: character revival propagates into the combat roster via a ruleset hook.
- **Duplicate penalty channels collapsed**: when the model writes the same situational fact into situational DC, advantage/disadvantage and the environment modifier, only one channel applies (priority: adv/disadv > DC > modifier) and discarded values are recorded in `planner_dropped`; a non-zero environment modifier requires an independent reason.
- **More explainable checks**: the modifier breakdown lists ability / proficiency / circumstance bonuses and the resolution card shows per-item sources (zh/en/ja).
- **DC bands follow the ruleset table**: the planner no longer hard-codes band numbers; bands come from `ruleset.dc_table` and deviations must be justified.

### Narration and rolls

- **GM narration style controls**: per-game tone (literary/direct/humorous/dark), verbosity, pace and custom instructions, with an option to follow the world's saved default; the override is only sent to the GM.
- **Adventure-mode narrative controls and manual rolls**: manual rolls gained generic purposes (rule check / contest / free roll), timeline display and encounter binding.
- **Manual roll results enter the AI context**: checks and contests are injected as an "authoritative manual rolls" fact block (checks/contests always, free rolls only when the GM opts in); private rolls stay visible only to the GM and their targets, the latest 8 records are kept, and zh-CN/en/ja games get matching labels; rolls never modify mechanical state on their own.
- **Full roll details in the timeline**: roll cards show label, formula and `total (natural ± modifier) · target · success/failure/win/loss`, with an explicit awaiting state.
- **Generation token caps unified at 4096**: narrative, character, summary, brief, analysis and text generation defaults all rise to 4096 (config migration v6 upgrades old defaults automatically; explicit custom values are preserved); long-output tasks such as full adventure-package drafts no longer fail on truncation.

### Web and deployment

- **Web listeners rework**: dual-protocol listeners and follow-up polish; the WebUI address is printed before the bootstrap log.
- **Docker**: TLS env vars are forwarded and extra ports can be enabled individually; the ACME validation port follows the actual listeners and is pinned to host port 80; the internal API prefers plain HTTP and restarts plugins after address changes.
- **Version metadata**: `/api/config` serves `server_version` and `min_client_version` so clients can prompt upgrades.

### Storage and data

- **Lorebook/memory queries moved to peewee** with connection and migration contracts unchanged; the peewee runtime dependency is detected at startup with a clear error.
- **Item/inventory state protocol**: acquire/equip/unequip/use are clearly separated; canonical equipment-slot authority is no longer overridden by LLM slots.

### Tests and engineering

- Backend CI reports coverage, registers `integration`/`optional` markers, documents offline runs and retires pre-schema-6 PAY/TEAM_PAY cases; the assistant knowledge index builds offline so tests no longer need external network.

### Upgrade notes

- **No breaking save migration**: the peewee migration keeps existing contracts; new fields are optional/additive; the token-cap migration raises old defaults to 4096 automatically (explicit custom values and env vars are untouched).
- Back up the complete `data/` directory before upgrading important campaigns.

### Downloads and verification

- **Regular Windows users**: `DiceFrame-v2.5.7-windows-portable.zip`
- **Source users**: `DiceFrame-v2.5.7-windows.zip`
- **Managed Docker update**: `DiceFrame-v2.5.7-docker-update-linux-amd64.zip`
- Verify downloads with the `SHA256SUMS` file attached to the Release.
