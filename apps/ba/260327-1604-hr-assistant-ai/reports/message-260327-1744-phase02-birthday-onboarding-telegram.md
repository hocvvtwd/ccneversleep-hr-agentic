📋 **Phase 2: Tài liệu BA — Module Birthday & Onboarding**
📅 Ngày 2 (28/3) | ⏱ ~6h | 🔴 P1

**Mô tả:**
Viết tài liệu BA đầy đủ cho module tạo thiệp Birthday & Onboarding tự động.

**🔑 Tính năng chính:**
• Hệ thống tự check lịch sinh nhật/ngày vào từ data nhân viên
• AI (Gemini) tự tạo card: ảnh + tiêu đề + lời chúc cá nhân hóa
• HR có thể upload thêm ảnh để customize
• Preview card có animation trước khi gửi
• **Quy trình duyệt:** Card tạo tự động → HR review → Approve mới gửi
• Auto-gửi qua Slack, Telegram, WhatsApp khi được duyệt
• Xem lại lịch sử các card đã gửi

**🔄 Workflow:**
```
Data nhân viên → Check lịch → AI tạo card → Preview
→ HR duyệt → [OK] → Gửi Slack/TG/WA
            → [Sửa] → AI tạo lại → Preview
```

**🏗 Kiến trúc:**
Birthday & Onboarding dùng chung 70% code (Shared Card Engine):
• ImageUploader — upload nhiều ảnh
• GeminiCardGenerator — AI tạo card (prompt khác nhau theo loại)
• CardPreview — preview có animation
• PlatformSelector — chọn Slack/TG/WA
• ApprovalPanel — nút duyệt/từ chối/tạo lại
Khác biệt: Birthday = tone chúc mừng, Onboarding = tone chào đón

**📊 Data Models:**
• Employee: id, name, department, position, birthday, startDate
• Card: type (birthday/onboarding), title, message, imageUrl, status (draft → pending → approved → sent), platforms
• Hỗ trợ tone: formal / casual / fun
• Hỗ trợ ngôn ngữ: EN / VI

**📝 Deliverables ngày hôm nay:**
1. ✍️ User stories (8-12 stories) + acceptance criteria
2. 🖼 Wireframes: danh sách card, flow tạo card (3 bước), preview + duyệt, lịch sử
3. 📐 Data models (TypeScript-ready)
4. 🤖 Gemini prompt templates
5. 🔄 Document approval workflow (state machine)
6. 📡 Specs gửi card qua Slack/TG/WA (mock)

**✅ Done khi:**
• Tất cả user stories có acceptance criteria
• Wireframes cover đủ màn hình
• Data models sẵn sàng code TypeScript
• Team có thể implement từ docs mà không cần hỏi thêm

⏭ **Tiếp theo:** Phase 3 — BA docs cho LinkedIn Automation & Candidate Finder
