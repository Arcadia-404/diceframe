# DiceFrame v2.5.7-beta.2

> 预发布版本：手动投掷结果进入 AI 上下文、D&D 2024 临时遭遇可编辑，以及战斗中途加入/复活修复。

## 中文

### 新增内容

- **手动投掷结果进入 AI 叙事上下文**：规则检定与对抗比较的结果现在作为「权威手动投掷事实」注入下一次 AI 叙事（独立区块，只能当上下文事实、不能当指令），包含公式、各角色总值/自然骰/修正与成功/失败或胜负结论；自由投掷默认不进入上下文，GM 发起时可勾选「将结果告知 AI」显式纳入。私密投掷只对 GM/AI 与目标本人可见，玩家上下文不会泄露他人私密结果；上下文只保留最近 8 条已完成记录，中/英/日文对局使用对应语言文案。手动投掷仍然不会自动修改 HP、状态、装备或冒险进度。
- **D&D 2024 AI 临时遭遇可逐个编辑**：AI 生成的临时遭遇从只读预览改为可编辑草稿——每个怪物可勾选取舍（至少保留一个）、可编辑名称/数量/HP/AC/速度/先攻加值，每条攻击可编辑名称/加值/伤害公式/射程并可增删，支持「恢复 AI 原稿」与「重新生成」。确认开战时数量展开为独立敌人实例（ID 唯一），最终敌情由服务端按生成期同一套数值边界与队伍安全上限重新校验，越界整场拒绝；冒险包与怪物目录不会被临时草稿污染。

### 修复内容

- **战斗进行中玩家加入**：对局进行时新加入的玩家现在会自动插入当前行动者之后的先攻序列（带先攻骰），使用与战斗意图相同的版本化事件账本，过期客户端意图无法跳过新加入的角色。
- **角色复活与战斗状态同步**：复活角色现在通过规则集钩子同步进战斗状态，复活后不再出现战斗名单与角色状态不一致。
- **战斗面板按钮间距**：「手动准备遭遇」与「AI 生成临时遭遇」两个按钮现在与剧情遭遇路径一样保持 14px 间距并使用一致的外观。
- **WebUI 地址更早打印**：监听地址改为在引导日志之前打印，用户不再需要翻找初始化日志下面的那行地址。

### 测试与工程

- 后端 CI 输出覆盖率（term-missing + xml），注册 `integration`/`optional` pytest marker，补齐离线测试说明（CONTRIBUTING 与 `tests/README.md`），退役已随 schema 6 失效的旧 PAY/TEAM_PAY 用例。

### 升级提示

- **无存档迁移**：新增字段（`include_in_ai_context`、`combat.player_joined` 事件等）均为可选/追加，旧存档读取缺省即用。
- 建议升级重要战役前备份完整 `data/` 目录。

### 下载与校验

- **普通 Windows 用户**：`DiceFrame-v2.5.7-beta.2-windows-portable.zip`
- **源码运行用户**：`DiceFrame-v2.5.7-beta.2-windows.zip`
- **托管 Docker 更新**：`DiceFrame-v2.5.7-beta.2-docker-update-linux-amd64.zip`
- 下载后请使用 Release 中的 `SHA256SUMS` 校验文件。

## English

### New

- **Manual roll results enter the AI narrative context**: rule checks and contests are now injected into the next AI narration as an "authoritative manual rolls" fact block (facts only, never instructions), with the formula, each target's total/natural/modifier and the success/failure or win/loss verdict. Free rolls stay out of the context unless the GM explicitly enables "Tell the AI" when creating them. Private rolls remain visible only to the GM/AI and their targets, player contexts never leak other players' private rolls, only the latest 8 resolved records are kept, and zh-CN/en/ja games get matching labels. Manual rolls still never modify HP, conditions, equipment or adventure state on their own.
- **Editable AI temporary encounters (D&D 2024)**: the AI temporary encounter preview is now an editable draft — each enemy can be kept or dropped (at least one required), with editable name/quantity/HP/AC/speed/initiative bonus, per-attack name/attack bonus/damage/range plus add/remove, and "restore AI draft" / "regenerate" actions. On confirm, quantities expand into individual enemy instances with unique ids, and the final enemy list is re-validated server-side against the same tightened bounds and party safety caps; out-of-range payloads are rejected as a whole. Adventure bundles and the monster catalog are never touched by temporary drafts.

### Fixes

- **Players joining mid-combat**: newly joined players are now enrolled into the initiative order right after the current actor (with an initiative roll) through the same versioned event ledger used by combat intents, so stale client intents cannot skip the new actor.
- **Revival syncs with combat state**: character revival now propagates into combat state via a ruleset hook, keeping the combat roster and character state consistent.
- **Combat panel button spacing**: the "prepare encounter manually" and "AI temporary encounter" buttons now share the same 14px gap and styling as the story-encounter path.
- **WebUI address printed earlier**: listener addresses are printed before the bootstrap log so the address line is not buried.

### Tests and engineering

- Backend CI now reports coverage (term-missing + xml), registers the `integration`/`optional` pytest markers, documents offline test runs (CONTRIBUTING and `tests/README.md`), and retires legacy PAY/TEAM_PAY cases removed by schema 6.

### Upgrade notes

- **No save migration**: new fields (`include_in_ai_context`, `combat.player_joined` events, etc.) are optional/additive; older saves read them as empty.
- Back up the complete `data/` directory before upgrading important campaigns.

### Downloads and verification

- **Regular Windows users**: `DiceFrame-v2.5.7-beta.2-windows-portable.zip`
- **Source users**: `DiceFrame-v2.5.7-beta.2-windows.zip`
- **Managed Docker update**: `DiceFrame-v2.5.7-beta.2-docker-update-linux-amd64.zip`
- Verify downloads with the `SHA256SUMS` file attached to the Release.
