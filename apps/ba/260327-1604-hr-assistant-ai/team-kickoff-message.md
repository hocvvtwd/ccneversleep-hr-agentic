# Team Kickoff Message

Copy and send to your team channel (Slack/Teams/Telegram):

---

## English Version

**Subject: [Kickoff] HR Assistant with AI — 7-Day Sprint (27/3 - 02/4)**

Hi team,

We're kicking off the **HR Assistant with AI** project — a tool to automate key HR tasks using AI (Google Gemini).

### What We're Building

An internal web app with 3 modules:

1. **Birthday & Onboarding Card Bot** — Auto-generates celebration cards (image + message), sends to Slack/Telegram/WhatsApp after HR approval
2. **LinkedIn Automation** — AI-generates recruitment posts with multiple variants, hashtags, scheduling
3. **Candidate Finder** — Parses JDs, searches candidate pools (ERP + social media), AI-scores and ranks candidates

### Sprint Plan (7 Days)

| Day | Date | Focus |
|-----|------|-------|
| 1 | 27/3 (Thu) | Project setup + architecture |
| 2 | 28/3 (Fri) | BA docs: Birthday & Onboarding |
| 3 | 29/3 (Sat) | BA docs: LinkedIn & Candidate |
| 4 | 30/3 (Sun) | MVP: Shared card engine components |
| 5 | 31/3 (Mon) | MVP: Gemini AI integration |
| 6 | 01/4 (Tue) | MVP: LinkedIn & Candidate UI |
| 7 | 02/4 (Wed) | Polish, animations, final review |

### Tech Stack

- **Frontend:** Vite + React 19 + TypeScript
- **UI:** shadcn/ui + shadCN Studio
- **Animation:** anime.js
- **AI:** Google Gemini API
- **State:** Zustand

### Key Decisions

- **Docs-first approach**: Days 1-3 = complete BA documentation, Days 4-7 = working MVP
- **FE-only MVP**: Backend APIs are mocked. Real integrations (Slack, LinkedIn, ERP) = post-MVP
- **Gemini direct from FE**: For speed. Production will need a backend proxy
- **Approval workflow**: Cards auto-generated but require HR approval before sending

### What I Need From You

- **Gemini API key** — need a Google AI Studio key for development
- **Employee sample data** — names, departments, birthdays for demo
- **Feedback on BA docs** — will share by end of Day 3 (29/3)
- **Demo review** — final walkthrough on Day 7 (02/4)

Full plan and brainstorm report are in the repo under `plans/`.

Let's go!

---

## Vietnamese Version

**Subject: [Khởi động] HR Assistant AI — Sprint 7 ngày (27/3 - 02/4)**

Chào team,

Mình bắt đầu dự án **HR Assistant with AI** — công cụ tự động hóa các task HR bằng AI (Google Gemini).

### Xây dựng gì

Web app nội bộ gồm 3 module:

1. **Bot Sinh nhật & Onboarding** — Tự động tạo thiệp chúc mừng (ảnh + lời chúc), gửi qua Slack/Telegram/WhatsApp sau khi HR duyệt
2. **LinkedIn Automation** — AI tạo bài tuyển dụng với nhiều phiên bản, hashtag, lịch đăng
3. **Tìm kiếm Ứng viên** — Phân tích JD, tìm ứng viên từ ERP + mạng xã hội, AI chấm điểm và xếp hạng

### Kế hoạch Sprint (7 ngày)

| Ngày | Ngày tháng | Nội dung |
|------|-----------|----------|
| 1 | 27/3 (T5) | Setup dự án + kiến trúc |
| 2 | 28/3 (T6) | Tài liệu BA: Sinh nhật & Onboarding |
| 3 | 29/3 (T7) | Tài liệu BA: LinkedIn & Ứng viên |
| 4 | 30/3 (CN) | MVP: Components card engine dùng chung |
| 5 | 31/3 (T2) | MVP: Tích hợp Gemini AI |
| 6 | 01/4 (T3) | MVP: UI LinkedIn & Ứng viên |
| 7 | 02/4 (T4) | Polish, animations, review cuối |

### Tech Stack

- **Frontend:** Vite + React 19 + TypeScript
- **UI:** shadcn/ui + shadCN Studio
- **Animation:** anime.js
- **AI:** Google Gemini API
- **State:** Zustand

### Quyết định chính

- **Docs-first**: Ngày 1-3 = hoàn thành tài liệu BA, Ngày 4-7 = MVP chạy được
- **Chỉ FE**: Backend APIs được mock. Tích hợp thật (Slack, LinkedIn, ERP) = sau MVP
- **Gemini gọi trực tiếp từ FE**: Để nhanh. Production cần backend proxy
- **Quy trình duyệt**: Card tự động tạo nhưng cần HR duyệt trước khi gửi

### Cần từ team

- **Gemini API key** — cần key Google AI Studio để dev
- **Dữ liệu nhân viên mẫu** — tên, phòng ban, ngày sinh để demo
- **Feedback tài liệu BA** — sẽ share cuối Ngày 3 (29/3)
- **Review demo** — chạy thử cuối cùng Ngày 7 (02/4)

Plan và brainstorm report đầy đủ trong repo tại `plans/`.

Let's go!
