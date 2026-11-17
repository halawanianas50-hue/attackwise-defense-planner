# Attackwise Defense Planner

Build a complete, premium, executive cybersecurity threat modeling and defense planning web application based on the MITRE ATT&CK Enterprise Matrix v14 (named ATT&CKWISE).

### Core Scope & Constraints
- Strictly MITRE ATT&CK Enterprise Matrix only. Completely remove and exclude Mobile and ICS matrices (no mentions, no toggles, no icons).
- Exclude all repetitive boilerplate banner texts (such as "Which attacks are you planning for?...", "Build a considered defense...", "Complete plan Draft — review scores...").
- Full Arabic support and English support with bilingual cyber terms where appropriate.

### Design System & Styling (Midnight Indigo Tokens)
- Background & Canvas: Deep midnight navy `#090D16` with glassmorphic cards (`bg-[#121726]/80`, `backdrop-blur-md`, subtle `border border-white/10`).
- Primary Interactive Accents: Indigo `#6366F1` and Electric Violet `#8B5CF6` with subtle glow (`shadow-[0_0_20px_rgba(99,102,241,0.25)]`) on active cards and buttons.
- Semantic Status Colors:
  - Emerald Green `#10B981` for Defended / Covered (100% coverage).
  - Golden Amber `#F59E0B` for Partial coverage.
  - Fiery Rose / Red `#F43F5E` for Critical Threats, Gaps, and Unmitigated attacks.
- Typography: Inter / Plus Jakarta Sans for UI text, JetBrains Mono / Fira Code for MITRE IDs (`T1566`, `T1059`).

### Header & Navigation
- Ultra-clean and compact top bar:
  - Left: Shield icon with Indigo/Violet glow, brand name "ATT&CKWISE", and subtle badge "Enterprise Matrix v14".
  - Center: 3-step navigation stepper with pills:
    1. 🎯 Attack Matrix (حدد الهجمات)
    2. 🛡️ Defense Plan (خطة الدفاع)
    3. 📊 Executive Report (التقرير النهائي)
  - Right: Quick search bar for techniques/IDs, selected technique counter chip (e.g. `4 Selected`), and primary "Next Step" button.

### Screen 1: Attack Matrix (خطة الهجوم)
- Modernized MITRE ATT&CK Enterprise Matrix board:
  - Columns for tactics: 🔍 Reconnaissance, 🛠️ Resource Development, 🎣 Initial Access, ⚙️ Execution, 📌 Persistence, ⬆️ Privilege Escalation, 🛡️ Defense Evasion, 🔑 Credential Access, 🔎 Discovery, 🌐 Lateral Movement, 📦 Collection, 📡 Command & Control, 📤 Exfiltration, 💥 Impact.
  - Each column header displays emoji, tactic name, and technique count.
  - Quick horizontal tactic jump pills at top for effortless 1-click navigation without excessive horizontal scrolling.
  - Cards for techniques inside each tactic showing MITRE ID, Name, and platform tags.
  - 100% Manual Selection: Clicking any card toggles its selection with a glowing Indigo/Violet border and checkmark badge (✓).
  - Floating bottom summary drawer: Shows total selected techniques across tactics, real-time threat severity indicator, and button to proceed to Defense Plan.

### Screen 2: Defense Plan (خطة الدفاع)
- Displays ONLY the attack techniques selected by the user in Step 1 (no clutter).
- Master-detail interactive flow:
  - Grid/list of selected attacks with current defense status badge (e.g. `🛡️ المحمي` or `⚠️ ثغرة بحاجة لدفاع`).
  - Clicking any attack opens a detailed glassmorphic drawer/panel showing:
    - Official MITRE Mitigations mapped to that specific attack technique.
    - Clear, actionable explanation: "How this mitigation stops the attack" (آلية الصد).
    - Quick 1-click status rating for each mitigation: `[✅ مطبق بالكامل]` (Emerald), `[⚠️ جزئي]` (Amber), `[❌ غير مطبق]` (Red).
  - Custom Mitigation Creator: A clean modal or inline form to add custom enterprise defenses:
    - Mitigation Name (اسم الدفاع - e.g. CrowdStrike Falcon, EDR, Email Gateway Filter).
    - Mitigation Type (نوع الدفاع - Tool, Policy, Training, Network).
    - Defense Mechanism (طريقة الصد).
    - Adds directly to that attack technique and updates the defense score.
- Real-time defense coverage calculation (Covered %, Gaps count).

### Screen 3: Executive Report & Export (التقرير النهائي)
- Circular glowing gauge / donut meter showing Overall Defense Coverage % and posture status badge.
- Interactive Bar Chart (رسم بياني بالأعمدة):
  - Clean, spacious vertical or horizontal bars with rounded corners.
  - Tactic names are clearly legible without rotated 90-degree neck-straining text.
  - Bars dynamically colored by coverage level (Emerald for >75%, Amber for 40-75%, Rose/Red for <40% highlighting gaps).
  - Hover tooltips showing exact statistics (techniques mitigated vs gaps).
- Export Word Document Button:
  - Prominent button: `📄 تصدير تقرير Word (.docx)`.
  - Generates and downloads a `.docx` file using `docx` and `file-saver`.
  - Captures the chart as an image (via canvas/html2canvas) and embeds it in the Word document alongside:
    - Executive summary and overall scores.
    - Tactical coverage breakdown.
    - Complete matrix of selected attacks and applied mitigations (official + custom).
    - Key remediation recommendations.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://attackwise-defense-planner.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4d33167e-56e0-4097-996f-6127c8c48a03).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
