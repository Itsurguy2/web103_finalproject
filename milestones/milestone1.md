# Design Daily - Milestone 1 Completion Checklist

## ✅ Milestone 1 Requirements Verification

### GitHub Repository Setup
- [ ] Fork the WEB103 Final Project repository
- [ ] Add all team members as collaborators
- [ ] Share repository link with all team members
- [ ] Clone repository locally and set up directory structure

### README.md Tasks
- [x] **App Name Updated:** Design Daily ✅
- [x] **Team Members Listed:** [Your names here] ✅
- [x] **Description & Purpose Complete:** Detailed description of what the app does and why it matters ✅
- [x] **Inspiration Section Complete:** Inspired by Dribbble, daily challenges, Inktober, habit-tracking, and community needs ✅
- [x] **Minimum 6 Features Listed:** 8 features listed (exceeds 6 minimum) ✅
  1. Daily Design Prompts ✅
  2. Prompt Submission & Tracking ✅
  3. View Submissions Feed ✅
  4. Like & Comment System ✅
  5. User Profile ✅
  6. Filter & Sort Functionality ✅
  7. Auto-Generated Daily Prompts (Custom Feature #1) ✅
  8. Advanced Sorting & Filtering (Custom Feature #2) ✅

### User Stories (planning/user_stories.md)
- [x] **Minimum 10 User Stories:** 11 stories created ✅
- [x] **1-3 Unique User Roles:** 3 roles defined ✅
  - Designer/Contributor (5 stories)
  - Community Member (3 stories)
  - Admin (3 stories)
- [x] **All Stories Include Acceptance Criteria:** Every story has clear acceptance criteria ✅

### Reflection Questions (milestones/milestone1.md)
- [x] **Question 1 - Problem Solved:** Design Daily solves creative stagnation and community isolation ✅
- [x] **Question 2 - Target User & Pain Points:** Identified designers at all levels and 4 key pain points ✅
- [x] **Question 3 - Unique Features:** Explained 5 factors that make Design Daily unique ✅

---

## 📋 Feature Coverage Analysis

### Baseline Features Met:
✅ **All Baseline Features Accounted For**

1. **Express Backend + React Frontend** - Planned in tech stack
2. **Dynamic Routes (Frontend & Backend)** - Multiple routes planned for prompts, submissions, users
3. **Deployment on Render** - Included in tech stack

**Backend Requirements:**
- ✅ Database relationships:
  - One-to-Many: Users → Submissions
  - One-to-Many: Prompts → Submissions  
  - Many-to-Many: Users ↔ Submissions (via Likes)
  - One-to-Many: Submissions → Comments
- ✅ RESTful API with GET, POST, PATCH, DELETE for submissions
- ✅ Proper route naming conventions
- ✅ Database reset functionality (to implement)

**Frontend Requirements:**
- ✅ Redirections: Home → Prompt Feed, Submissions → Detail View, Profile
- ✅ Same-page interactions: Like submissions, post comments without navigation
- ✅ React Router for dynamic routes
- ✅ Hierarchical component structure: Pages (Home, Profile, Feed), Components (Card, Form, Modal)
- ✅ Deployment ready structure

### Custom Features Selected:
✅ **Two Custom Features Chosen**

**Custom Feature #1: Auto-Generated Daily Prompts**
- Feature Type: "Data is automatically generated in response to a certain event or user action"
- Description: New design prompts automatically create and become available at midnight daily
- User Stories: Story 1, 3 (Viewing prompts)
- Complexity: Medium (requires scheduler/cron job)

**Custom Feature #2: Advanced Sorting & Filtering**
- Feature Type: "The user can filter or sort items based on particular criteria"
- Description: Users can sort by "Most Liked" or "Newest" AND filter by design category
- User Stories: Story 5 (Sort), Story 8 (Filter)
- Complexity: Medium (multiple sorting/filtering parameters)

### Additional Custom Feature Opportunities (Not Selected):
- Error handling (could be implemented)
- One-to-one relationships (user profile details)
- Modal/slide-out pane (could use for comment modal)
- Unique join table field (extended likes table)
- Non-RESTful custom routes (featured submissions endpoint)
- Data validation (validate image submissions)

---

## 🗂️ Project Structure Ready

```
design-daily/
├── client/                 (React frontend)
│   ├── src/
│   │   ├── components/     (Reusable React components)
│   │   ├── pages/          (Page components)
│   │   ├── services/       (API calls via Axios)
│   │   └── styles/         (CSS files)
│   └── package.json
│
├── server/                 (Node/Express backend)
│   ├── config/             (Database config)
│   ├── routes/             (API routes)
│   ├── controllers/        (Route controllers)
│   ├── models/             (Database models)
│   ├── server.js
│   └── package.json
│
├── README.md               (Project overview)
├── planning/
│   └── user_stories.md     (User stories)
└── milestones/
    ├── milestone1.md       (Reflection & checklist)
    └── [other milestones]
```

---

## 🎯 Next Steps: What to Do Now

### Immediate Actions (Complete by Milestone 1 Due Date):
1. **Copy these files to your GitHub repository:**
   - Use the content from `design_daily_README.md` → Update your `README.md`
   - Use the content from `design_daily_user_stories.md` → Create `planning/user_stories.md`
   - Use the reflection answers → Add to `milestones/milestone1.md`

2. **Customize with Your Team's Information:**
   - Add your actual names to README.md team members section
   - Add any additional details or ideas specific to your partnership

3. **Review and Confirm:**
   - ✅ All files pushed to GitHub
   - ✅ Repository shared with all team members
   - ✅ All checklist items completed
   - ✅ Submit Milestone 1 (if applicable)

### Prepare for Milestone 2:
- Plan which 3+ pages to wireframe
- Start thinking about your Entity Relationship Diagram (ERD)
- Develop a 1-2 minute elevator pitch
- Identify any technical challenges

---

## 💡 Feature Implementation Notes

### Custom Feature #1: Auto-Generated Daily Prompts
**Implementation Strategy:**
- Use a database seeded with 365+ prompt templates
- Implement server-side scheduler (Node-cron) to activate one prompt per day
- Store active prompt in separate "active_prompts" table or status column
- Client fetches current active prompt on home page load
- Optional: Allow admin to manually activate prompts

**Database Consideration:**
- `prompts` table with fields: id, title, description, guidelines, category, date_activated, created_at
- Scheduler runs at midnight UTC (or adjustable timezone)

### Custom Feature #2: Advanced Sorting & Filtering
**Implementation Strategy:**
- Sorting: Add query parameters to `/api/submissions?sort=likes` or `sort=newest`
- Filtering: Add category field to submissions, filter with `/api/submissions?category=ui-ux`
- Frontend: State management to track current sort and filter selections
- Combine both: `/api/submissions?sort=likes&category=illustration`

**Database Consideration:**
- `submissions` table needs: category field, created_at for sorting, likes relationship
- Index on category and created_at for efficient queries

---

## 🎨 Design Decisions Summary

**Why These Custom Features?**
1. **Auto-Generated Prompts** - Core value prop; makes the app "magic"
2. **Sorting & Filtering** - Improves user experience significantly; helps users discover inspiration

**Why This Tech Stack?**
- React: Modern, component-based, good for UI state management
- Express: Lightweight, perfect for RESTful APIs
- PostgreSQL: Robust relational database for complex queries (filtering, sorting)
- Render: Simple deployment, free tier available

**Database Highlights:**
- 4 relationship types (exceeds 2 minimum requirement)
- CRUD operations on submissions
- Efficient querying for sorting and filtering
- Proper normalization (no data duplication)

---

## ✨ Competitive Advantages of Design Daily

Compared to Dribbble and similar platforms:
1. **Structured Practice** - Daily challenges force consistency
2. **Lower Barrier to Entry** - Community comments feel safer than design critiques
3. **Diverse Disciplines** - One place for all designers, not siloed by specialty
4. **Growth Tracking** - Visual portfolio of learning progression
5. **Serendipity** - Algorithm-free sorting encourages genuine discovery

---

## 📊 Requirements Met Summary

| Requirement | Status | Notes |
|------------|--------|-------|
| All Baseline Features | ✅ Complete | 3 backend, 5+ frontend |
| Two Custom Features | ✅ Complete | Auto-prompts + Advanced filtering |
| 6+ Features Listed | ✅ Complete | 8 features documented |
| 10+ User Stories | ✅ Complete | 11 user stories with acceptance criteria |
| 1-3 User Roles | ✅ Complete | 3 roles: Designer, Member, Admin |
| 3 Reflection Questions | ✅ Complete | Comprehensive answers provided |
| Team & Names | 🔄 Pending | Add your actual names |
| GitHub Setup | 🔄 Pending | Fork and share repository |

---

**Created:** Milestone 1 Planning Phase
**Status:** Ready for Repository Upload
**Next Milestone:** Wireframes, ERD, and Pitch (Milestone 2)