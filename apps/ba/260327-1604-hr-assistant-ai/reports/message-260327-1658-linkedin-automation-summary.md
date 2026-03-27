LinkedIn Automation cho Tuyển dụng — Tóm tắt Research

LinkedIn Automation là gì?
Phần mềm tự động hóa tuyển dụng trên LinkedIn: tìm ứng viên → tiếp cận → tạo content → theo dõi → log vào ERP. Giảm 25-40% thời gian thủ công cho HR.

6 mảng cần quản lý:
1. Content — AI tạo bài tuyển dụng + employer branding (3-5 posts/week, Tue-Wed 10am-12pm)
2. Connections — Gửi/track lời mời kết nối (safe: 20-25/day)
3. *Messaging — InMail campaigns + follow-up (safe: 30-50/day, phải cá nhân hóa)
4. Job Posting — Đăng/quản lý tin tuyển dụng
5. Candidate Pipeline — Parse JD → tìm → chấm điểm → shortlist → export
6. Analytics — Engagement, ROI, hiring funnel

API thực tế:
- Official API hỗ trợ: đăng bài (Posts API), đăng job (Job Posting API), connection invites
- Official API KHÔNG hỗ trợ: InMail bulk, profile search, scraping
- Third-party tools (Expandi, Dux-Soup...) vi phạm ToS → 15-40% bị restrict trong 6 tháng

MVP strategy: Dùng official API + Gemini AI. Mock phần outreach/InMail/search. Position là "safe, compliant alternative."

70% talent teams đã dùng gen-AI cho tuyển dụng (2025). Gemini parse JD <3s, score candidate <3s, generate content <8s.

---

## Use Cases thực tế cho HR

UC1: Tuyển Senior React Developer
- Không automation: Lướt 200+ profiles thủ công (2h) → copy vào Excel (1h) → viết 30 InMail customize (2h) → quên follow-up → mất candidate
- Có automation: Paste JD → AI parse yêu cầu → tìm ERP pool (5 match cũ) + LinkedIn/Facebook (25 mới) → AI score → HR review shortlist → approve → auto-send + auto follow-up 7 ngày → export cho HRM
- Tiết kiệm: ~4h/position

UC2: Content tuyển dụng hàng tuần
- Không automation: Viết caption 30 phút, post lúc 3pm thứ 6 (ít người xem), không biết bài nào hiệu quả
- Có automation: Paste JD → AI tạo 3 variants → chọn + edit nhẹ → schedule thứ 3+4 10am → dashboard show bài casual +3x engagement
- Tiết kiệm: ~2h/tuần, engagement tăng 2-3x

UC3: Onboard 5 người mới/tháng
- Không automation: Nhớ trong đầu, quên 2/5 người, welcome post generic
- Có automation: System alert 3 ngày trước → AI tạo card + LinkedIn post cá nhân hóa → HR approve → auto-post LinkedIn + Slack/Telegram
- Kết quả: 0% missed, mỗi người đều có welcome riêng

UC4: Birthday 50 nhân viên
- Không automation: Check Excel đầu tháng → Canva từng card (15 phút × 5 = 75 phút) → post Slack thủ công → thỉnh thoảng quên
- Có automation: Auto-detect → AI tạo card cá nhân hóa → HR review 5 cards (5 phút) → auto-send đúng ngày, 9am, Slack + Telegram + WhatsApp
- Tiết kiệm: ~70 phút/tháng, 0% missed

UC5: Báo cáo tuyển dụng cho HRM
- Không automation: Tổng hợp từ email/Excel/LinkedIn inbox, "khoảng 20 người" (không chính xác)
- Có automation: Dashboard real-time: 3 positions, 45 identified → 12 shortlisted → 5 contacted → 2 interviewing. Top post variant. Export 1 click.
- Tiết kiệm: ~2h/tuần

Tổng tiết kiệm

| Task | Thủ công | Có automation | Tiết kiệm |
|------|---------|--------------|-----------|
| Tìm ứng viên/position | 5h | 1h | 4h |
| Content tuyển dụng/tuần | 2.5h | 30min | 2h |
| Birthday cards (5/tháng) | 75min | 5min | 70min |
| Onboarding posts | 30min/người | 5min/người | 25min |
| Báo cáo HRM | 2h/tuần | 5min | ~2h |
| Total/tuần per HR | ~12h | ~2h | ~10h |

---

## Agentic Recruitment Workflow (Vision)

Không chỉ là content tool — core differentiator là **AI Recruitment Agent** tự động toàn bộ pipeline:

**Ví dụ:** Recruiter nói: "Tìm 10 senior backend engineers ở VN, có kinh nghiệm fintech"

Agent tự động:
1. **Phân tích** yêu cầu → ideal candidate profile → search strategy
2. **Research** từng ứng viên: đọc profile, hiểu background, tìm mutual interests
3. **Soạn message cá nhân hóa sâu** — không mail merge, hiểu context từng người
4. **Lên sequence strategy** — Direct offer? Soft networking? Referral path?
5. **Theo dõi + phản ứng** — sentiment analysis, suggest/draft reply
6. **Tự học** — message nào hiệu quả? approach nào tốt? → tự điều chỉnh
7. **Escalate** — "Ứng viên có competing offer → suggest gọi trực tiếp"

**Tool-use:** LinkedIn API, CRM, Claude/Gemini API, analytics database

**Khác biệt vs Expandi/Dux-Soup:** Chúng ta HIỂU ứng viên trước khi viết. Không phải bot copy-paste.

---

## Pricing Strategy (Freemium)

| Tier | Price | Target | Giới hạn |
|------|-------|--------|----------|
| **Free** | $0 | Solo HR / tryout | 5 AI/ngày, 1 position, 10 candidates |
| **Pro** | $29/mo/seat | SMB (1-5 HR) | 50 AI/ngày, 5 positions, 100 candidates |
| **Team** | $79/mo/seat | Mid-market (5-20) | Unlimited, 20 positions, team collab, analytics |
| **Enterprise** | Custom $200+ | Enterprise (50+) | Unlimited, ERP, SSO, dedicated support |

**Tại sao $29 Pro?**
- Rẻ hơn LinkedIn Recruiter Lite ($170/mo) — dễ mua
- Rẻ hơn Expandi ($99/mo) — rẻ hơn VÀ an toàn hơn
- Đủ cao để không bị coi là "free toy"

**Positioning:** "The AI Colleague" — không phải bot, không phải tool, mà là đồng nghiệp thông minh biết research, personalize, learn, và biết khi nào cần escalate.

---

## Product Roadmap

| Phase | Timeline | Features |
|-------|----------|----------|
| **MVP** | Week 1 | Content generation + cards + basic scoring |
| **v0.2** | Week 2-3 | Deep personalization + approach strategy |
| **v0.3** | Week 4-5 | Sequence builder (3-step outreach) |
| **v0.4** | Week 6-8 | Sentiment analysis + smart escalation |
| **v0.5** | Week 9-12 | Self-learning loop |
| **v1.0** | Month 4 | Full agentic workflow + team + analytics |

---

Sources: LinkedIn Developer Docs, Microsoft Learn, Dux-Soup, Expandi, PhantomBuster, LinkedIn Talent Blog, HeroHunt, Juicebox — [full list](./summary-260327-1653-linkedin-automation-research.md) | [agentic brainstorm](./brainstorm-260327-1715-agentic-recruitment-pricing.md)
