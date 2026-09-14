# DiceFrame v2.5.9-beta.1

> 预发布版本：新增德语（Deutsch）作为第四种界面语言，并修复长文本语言下 Settings / GM 控台 / Characters 页面的按钮溢出问题。

## 中文

### 新增内容

- **德语（Deutsch）作为第四种界面语言**：主 UI 全面支持德语（设置、创建、GM、机器人等）；GM 叙事 / 检定规划 / 战斗解说等后端 prompt 提供德语版本；浏览器语言 `de` / `de-DE` / `de-AT` / `de-CH` 自动进入德语界面。
- **德语专业组件回退策略**：D&D 2024 建卡 / 职业升级 / 专业角色中心等暂无德语翻译的专业页面统一回退英文，而不是错误回退中文。
- **德语 AI 规则生成字段协议统一**：德语生成的自定义规则会把德语文本物化进 `*_de` 字段，再次用于德语建卡 / prompt 时不再掉回英语；authoritative 字段协议与 `localized_field()` 回退顺序未改动。

### 修复内容

- **语音识别语言**：德语界面语音输入使用 `de-DE`（此前被误送 `zh-CN`）。
- **公告回退**：官方公告只有中英双语，德语 / 日语及其他非中文界面统一回退英文公告。
- **世界语言标签**：世界卡列表能正确显示 `de` 世界的"Deutsch"标签。
- **规则名回退**：角色页在德语 / 日语界面显示英文规则名，而不是中文 canonical 名。

### 界面自适应（长文本语言溢出修复）

- **Settings 状态卡**：删除固定单行 flex 覆盖，改为自适应网格（`auto-fit minmax(220px, 1fr)`）；状态标题与标签可换行，长词自动折行；≤800px 保留横向滚动策略。
- **GM 控台**：流程按钮组改为自适应列数（宽屏 2 列、窄屏自动 1 列）；工具栏按钮允许换行且保持完整可读（不使用省略号）；文风选择按钮改 flex 折行。
- **Characters**：当前角色操作按钮不再强制单行，操作区按内容自适应列数（≤520px 单列）；共享角色卡按钮允许换行。
- **语言下拉**：右上角语言名称统一为 简体中文 / English / 日本語 / Deutsch。

### 升级提示

- **无破坏性存档迁移**：新增字段均为可选/追加。
- 建议升级重要战役前备份完整 `data/` 目录。

### 下载与校验

- **普通 Windows 用户**：`DiceFrame-v2.5.9-beta.1-windows-portable.zip`
- **源码运行用户**：`DiceFrame-v2.5.9-beta.1-windows.zip`
- **托管 Docker 更新**：`DiceFrame-v2.5.9-beta.1-docker-update-linux-amd64.zip`
- 下载后请使用 Release 中的 `SHA256SUMS` 校验文件。

## English

### New

- **German (Deutsch) as the fourth UI language**: full main-UI German coverage (settings, creation, GM, bots); backend prompts for GM narration / check planning / combat commentary ship German variants; browser locales `de` / `de-DE` / `de-AT` / `de-CH` activate the German UI automatically.
- **German professional-page fallback**: D&D 2024 builder / advancement / professional character center pages without German translations now fall back to English instead of incorrectly showing Chinese.
- **German AI rule field protocol**: AI-generated German rules materialize German text into `*_de` fields, so reusing them in German character creation / prompts no longer falls back to English; authoritative field contracts and the `localized_field()` fallback order are unchanged.

### Fixes

- **Speech recognition language**: German UI voice input now uses `de-DE` (previously sent as `zh-CN`).
- **Announcements fallback**: official announcements are zh/en only; German, Japanese and other non-Chinese UIs now fall back to English announcements.
- **World language labels**: world cards now show a "Deutsch" label for `de` worlds.
- **Rule name fallback**: the characters page shows English rule names in German/Japanese UIs instead of the Chinese canonical name.

### UI adaptive layout (long-language overflow fixes)

- **Settings status cards**: removed the fixed single-row flex override in favor of an auto-fit grid (`minmax(220px, 1fr)`); headings and tags wrap; long words break anywhere; the ≤800px horizontal-scroll strategy is preserved.
- **GM console**: flow button groups use adaptive columns (2 on wide, 1 on narrow); toolbar buttons wrap while staying fully readable (no ellipsis); style option buttons flex-wrap.
- **Characters**: current-character action buttons no longer force a single line, the action area adapts its column count (single column ≤520px); shared character card buttons wrap.
- **Language dropdown**: unified names — 简体中文 / English / 日本語 / Deutsch.

### Upgrade notes

- **No breaking save migration**: new fields are optional/additive.
- Back up the complete `data/` directory before upgrading important campaigns.

### Downloads and verification

- **Regular Windows users**: `DiceFrame-v2.5.9-beta.1-windows-portable.zip`
- **Source users**: `DiceFrame-v2.5.9-beta.1-windows.zip`
- **Managed Docker update**: `DiceFrame-v2.5.9-beta.1-docker-update-linux-amd64.zip`
- Verify downloads with the `SHA256SUMS` file attached to the Release.
