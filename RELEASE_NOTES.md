# DiceFrame v2.6.0

> 正式版：统一货币模型（规则定义货币结构、economy 只处理 canonical 整数、CoC 升级为美元/美分并迁移存量存档）、内建场景图自动/手动生成与分镜、角色技能「效果说明」，并修复模型思考内容泄漏与检定规划器多语言不一致。

## 中文

### 新增内容

- **货币模型 V2（统一货币结构）**：规则的货币结构只由 `currency_system` 声明——`base_unit`（economy 引擎记账的最小单位，rate 恒为 1）、`display_unit`（默认展示单位）与各单位正整数比率；economy 引擎继续只处理 canonical 整数，不感知货币名称，也绝不散落 ×100 / ÷100。显示金额 ↔ canonical 整数的换算有唯一入口（后端 CurrencyCodec、前端 `utils/currency.ts`），不精确即拒绝，不使用浮点。内置 CoC 规则升级为「美元 / 美分」（base = 美分），存量 CoC 存档按版本化迁移一次性 ×100（余额、提案、流水与失败回滚快照、奖励上限同步换算），其它规则与旧自定义规则数据不动。
- **GM 金钱指令与支付**：GM 指令支持小数与规则货币单位（`给张三增加0.25美元`、`给张三增加25美分`、`加金币5`），回执与数值修正提示显示格式化金额（`$0.25`）；GM 支付弹窗与奖励上限按展示单位输入。
- **检定规划器经济协议与购买 fail-safe**：价格改为「十进制金额字符串 + canonical 单位」，由服务端换算，模型不得自行换算。价格无法结算（单位不在规则货币表、金额无法精确折算、超出上限等）时**不再丢弃购买意图**——降级为「无价购买意图」，在本轮阻止该商品被免费发放；规则货币与叙事用词不一致时不会再出现"白拿商品"。新增 `FREE_GRANT` 标签：仅当剧情明确「免费 / 赠送 / 奖励」时才放行发放，且不能绕过已存在的待确认扣款提案。
- **规则编辑与 AI 生成规则的货币定义**：规则编辑器可用简单表单定义货币（货币名称 / 是否存在更小单位 / 主要单位 / 最小单位 / 比率 / 符号），多单位高级货币继续用高级 JSON；非法货币结构拒绝保存，已有对局的规则禁止直接修改 base_unit 语义。AI 生成规则支持 `currency_system`，坏 schema 整体拒绝落盘。
- **场景图自动/手动生成与分镜**：图像生成能力内建到核心（不再依赖旧插件形式）。保留 `SCENE_IMAGE` 协议：默认仅当模型输出 `SCENE_IMAGE` 时自动生成场景图，普通 `SCENE` 不触发；`SCENE_PANEL` 只作为分镜附加数据（最多 6 格），不能单独触发；开场、普通回合与滑动重生成遵循同一规则。支持手动生成当前回合场景图（自动带入当前场景与最近一轮公开叙事，可编辑描述），可上传公开角色头像作为参考图，场景图 / 图库 / 头像支持点击放大。图像设置分基础（启用、自动/手动生图、服务商与模型、风格前缀）与高级（提示词规则与模板、尺寸、质量、超时）两档；地图背景图保持独立，不并入分镜系统。
- **角色技能「效果说明」**：每个技能可填写一句效果说明（例如「火焰球 / 效果：向目标发射火球，造成火焰伤害。」），角色卡展示为「效果：…」，检定规划器在**当前行动使用该技能时**把它作为语义参考。效果说明是玩家提供的描述文本、**不是规则权威**：无论其中写「必中」「+10」「3d6伤害」「恢复HP」都不会改变骰值、DC、优势/劣势、伤害、HP、资源或状态，机械结果仍由当前规则与服务端权威结算。

### 修复内容

- **模型思考内容泄漏**：推理 / think 输出被剥离，不再出现在玩家可见的叙事文本中。
- **检定规划器多语言一致性**：英 / 日 / 德 prompt 同步到中文重构结构（裁定流程、上下文依据、裁定示例、检定参数与渠道、输出与服务端权威、附加识别），非中文对局的检定裁定质量不再落后于中文对局。

### 升级说明

- **CoC 存档会自动迁移一次**：`freeform_coc` 局的余额、提案、流水与回滚快照、奖励上限按「美元 → 美分」换算（×100，金额含义不变）；迁移有版本号保护，只执行一次，其他规则与自定义规则不会被动数据。
- 货币相关的新字段（`currency_system`）为可选/增量；旧规则只有货币名称时按 legacy 语义继续工作，不会被自动解释成更小单位。
- 升级重要对局前请备份完整的 `data/` 目录。

### 下载与校验

- **普通 Windows 用户**：`DiceFrame-v2.6.0-windows-portable.zip`
- **源码运行用户**：`DiceFrame-v2.6.0-windows.zip`
- **托管 Docker 更新**：`DiceFrame-v2.6.0-docker-update-linux-amd64.zip`
- 下载后请使用 Release 中的 `SHA256SUMS` 校验文件。

## English

### New

- **Currency Model V2 (unified currency structure)**: a rule's currency is declared solely through `currency_system` — `base_unit` (what the economy ledger counts, rate always 1), `display_unit` (default display unit) and positive integer unit rates. The economy engine keeps working on canonical integers only and never learns currency names; no scattered ×100 / ÷100. Display amounts convert through a single codec (backend CurrencyCodec, frontend `utils/currency.ts`), rejecting anything not exactly representable and never using floats. The built-in CoC rule is upgraded to dollar / cent (base = cent), and existing CoC saves run a one-time versioned ×100 migration (balances, proposals, ledger and rollback snapshots, reward caps); other rules and legacy custom rules keep their data untouched.
- **GM money commands and payments**: GM commands accept decimals and rule currency units (`给张三增加0.25美元`, `给张三增加25美分`, `加金币5`) and report formatted amounts (`$0.25`); the GM payment dialog and reward cap are entered in the display unit.
- **Planner economy protocol and purchase fail-safe**: prices are now a decimal string plus a canonical unit, converted server-side — the model never converts units itself. When a price cannot be settled (unknown unit, amount not exactly representable, over cap, …) the purchase intent is **no longer dropped**: it degrades to an unpriced purchase intent that blocks free delivery of that item for the round, so narration wording that disagrees with the rule currency can no longer hand out goods for free. New `FREE_GRANT` tag releases an item only when the story explicitly establishes it as free / a gift / a reward, and never overrides an existing pending charge.
- **Rule editor and AI-generated currency definitions**: the rule editor defines currency through a simple form (name, whether a smaller unit exists, major/minor unit, rate, symbol) while multi-unit advanced currencies stay in the advanced JSON; invalid currency declarations are refused, and rules with existing games cannot change base-unit semantics. AI-generated rules may declare `currency_system` and bad schemas are rejected outright.
- **Scene images (auto/manual) and storyboards**: image generation is built into the core instead of relying on the old plugin form. The `SCENE_IMAGE` protocol is preserved: scene images auto-generate only when the model emits `SCENE_IMAGE` (a plain `SCENE` does not), `SCENE_PANEL` is storyboard-only data (up to 6 panels) and never triggers generation, and opening scenes, normal rounds and swipe regeneration follow the same rule. The current round's scene image can be generated manually (prefilled with the scene and the latest public narration, editable), public character portraits can be attached as reference images, and scene/gallery images and portraits open in a lightbox. Image settings are split into basic (enable, auto/manual generation, provider and model, style prefix) and advanced (prompt rules and templates, size, quality, timeout); map backgrounds stay independent of the storyboard system.
- **Per-skill effect description**: each character skill accepts a short effect note (e.g. 火焰球 / 效果：向目标发射火球，造成火焰伤害。). It is shown on the character sheet as an "Effect:" line and passed to the check planner as semantic context **only when the current action uses that skill**. It is player-authored description and **not rules authority**: even text claiming "always hits", "+10", "3d6 damage" or "restores HP" cannot change dice, DC, advantage, damage, HP, resources or status — all mechanics stay with the current rules and server authority.

### Fixes

- **Model reasoning leakage**: reasoning / think output is stripped and no longer reaches player-visible narration.
- **Check planner multilingual consistency**: the EN / JA / DE prompts are synced to the restructured Chinese guide (adjudication flow, context basis, examples, check parameters and channels, output and server authority, additional detection), so non-Chinese tables no longer lag behind.

### Upgrade notes

- **CoC saves migrate once automatically**: `freeform_coc` balances, proposals, ledger and rollback snapshots, and reward caps are converted from dollars to cents (×100, same real amounts). The migration is versioned and runs exactly once; other rules and custom rules are never rewritten.
- New currency fields (`currency_system`) are optional and additive; rules that only carry a currency name keep legacy semantics and are never reinterpreted as a smaller unit.
- Back up the complete `data/` directory before upgrading important campaigns.

### Downloads and verification

- **Regular Windows users**: `DiceFrame-v2.6.0-windows-portable.zip`
- **Source users**: `DiceFrame-v2.6.0-windows.zip`
- **Managed Docker update**: `DiceFrame-v2.6.0-docker-update-linux-amd64.zip`
- Verify downloads with the `SHA256SUMS` file attached to the Release.
