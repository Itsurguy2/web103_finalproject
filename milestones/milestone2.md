# Design Daily - Milestone 2 Completion Checklist

## ✅ Milestone 2 Requirements

### Wireframes (At Least 3 Pages)
- [x] **Page 1: Home / Today's Prompt** 
  - Displays current day's design challenge
  - Shows prompt details, timer, and main CTAs
  - Summary stats visible

- [x] **Page 2: Submissions Feed**
  - Grid layout showing all submissions for prompt
  - Sort dropdown (Most Liked / Newest)
  - Filter dropdown (All / Category options)
  - Submission cards with thumbnail, artist, engagement stats
  - Pagination controls

- [x] **Page 3: Submission Detail & Comments**
  - Full-size image display
  - Artist information and follow button
  - Comments section with full comment threads
  - Comment form to add new comments
  - Engagement stats (likes, comment count)

- [x] **BONUS - Page 4: User Profile**
  - Profile header with bio and stats
  - Statistics section (prompts completed, likes, streaks)
  - Submission gallery in grid format
  - Edit profile functionality

**Wireframe Completeness:** ✅ 4 pages with detailed ASCII mockups and component descriptions

---

### Entity Relationship Diagram (ERD)

- [x] **Database Schema Defined**
  - USERS table (14 columns)
  - PROMPTS table (7 columns)
  - SUBMISSIONS table (10 columns)
  - COMMENTS table (7 columns)
  - LIKES table (4 columns - Join Table)

- [x] **Relationships Identified**
  - ✅ One-to-Many: Users → Submissions
  - ✅ Many-to-Many: Users ↔ Submissions (via LIKES join table)
  - ✅ One-to-Many: Prompts → Submissions
  - ✅ One-to-Many: Submissions → Comments
  - ✅ One-to-Many: Users → Comments

- [x] **Constraints & Rules Documented**
  - Foreign key relationships defined
  - CASCADE delete rules specified
  - UNIQUE constraints on likes (prevent duplicates)
  - Composite indexes identified

- [x] **Design Decisions Explained**
  - Denormalization strategy documented
  - Streak tracking approach detailed
  - Category filtering architecture
  - Future scalability considerations

**ERD Completeness:** ✅ 5 relationships (exceeds 2 minimum), fully documented with SQL

---

### Pitch Preparation

- [x] **2-Minute Elevator Pitch Written**
  - 15-second concept hook
  - 20-second problem statement
  - 25-second solution overview
  - 30-second feature highlights
  - 20-second competitive advantage
  - 10-second closing call-to-action

- [x] **Full Pitch Script (2 minutes)**
  - Opening that captures attention
  - Clear problem-solution narrative
  - Features explained with context
  - Why Design Daily is unique
  - Call to action/next steps

- [x] **Q&A Preparation**
  - 7+ anticipated questions with answers:
    - How to keep prompts fresh
    - Quality control approach
    - Time zone handling
    - Toxic comment management
    - Multi-discipline support
    - Competitive differentiation
    - Monetization strategy

- [x] **Presentation Tips & Delivery Checklist**
  - Do's and Don'ts documented
  - Recommended visual aids/slides
  - Pre-presentation checklist (9 items)
  - Body language and tone guidance

**Pitch Completeness:** ✅ Full 2-minute pitch with script, Q&A, and delivery tips

---

## 📋 File Organization for Repository

Add these files to your GitHub repository in the following structure:

```
design-daily/
├── README.md                          (Already updated with team names ✅)
├── planning/
│   ├── user_stories.md               (From Milestone 1 ✅)
│   ├── wireframes.md                 (NEW - Milestone 2)
│   └── erd.md                        (NEW - Milestone 2)
├── milestones/
│   ├── milestone1.md                 (From Milestone 1)
│   └── milestone2.md                 (NEW - For reflection & checklist)
└── docs/
    └── pitch.md                      (NEW - Milestone 2)
```

---

## 📝 What to Submit for Milestone 2

### Files to Create in Your Repository:

**1. planning/wireframes.md**
- Copy the content from `design_daily_wireframes.md`
- Includes 4 detailed wireframe pages
- ASCII mockups with component descriptions
- Navigation flow documentation

**2. planning/erd.md**
- Copy the content from `design_daily_erd.md`
- Complete database schema with all tables
- Mermaid diagram format for easy viewing
- SQL constraints and relationships
- Design decisions explained

**3. docs/pitch.md** (OR milestones/milestone2.md)
- Copy the content from `design_daily_pitch.md`
- 2-minute pitch script
- Q&A preparation
- Delivery checklist

**4. milestones/milestone2.md**
- Update your milestone checklist as you complete tasks
- Document any design decisions made
- Note any assumptions or constraints
- Include reflection questions (if required by your course)

---

## 🎯 Milestone 2 Deliverables Summary

| Deliverable | Status | Details |
|------------|--------|---------|
| Wireframes (3+ pages) | ✅ Complete | 4 pages with ASCII mockups |
| ERD with relationships | ✅ Complete | 5 relationships, fully documented |
| Pitch (2 minutes) | ✅ Complete | Script + Q&A + delivery tips |
| Files in Repository | 🔄 Pending | Need to copy to GitHub repo |
| Team presentation | 🔄 Pending | Plan your pitch delivery |

---

## 🎨 Design Highlights

### Wireframe Features:
- **Mobile-responsive design** considerations noted
- **Accessibility** guidelines included
- **Interactive states** documented (hover, active, loading)
- **Clear user flows** between pages
- **Consistent layout patterns** across pages

### ERD Highlights:
- **5 relationships** (exceeds 2 minimum requirement)
- **Denormalization** for performance optimization
- **Cascade rules** for data integrity
- **Unique constraints** on likes to prevent duplicates
- **Indexing strategy** for query optimization

### Pitch Highlights:
- **Clear problem-solution narrative**
- **Unique value proposition** vs. competitors
- **Specific to Design Daily** (not generic pitch)
- **Designed for designer audience**
- **Covers all three team members** in narrative

---

## 🔍 Quality Checklist

Before submitting Milestone 2:

- [ ] Wireframes show at least 3 unique pages
- [ ] Wireframes include user interactions and flow
- [ ] ERD shows all 5 tables with columns defined
- [ ] ERD includes Mermaid diagram or clear visual representation
- [ ] All relationships labeled with cardinality (1-to-many, many-to-many)
- [ ] Pitch is approximately 2 minutes when read aloud
- [ ] Pitch includes problem, solution, features, and competitive advantage
- [ ] Q&A includes 5+ realistic questions
- [ ] All files formatted clearly for GitHub readability
- [ ] README still reflects team member names (don't overwrite)
- [ ] No spelling/grammar errors in documentation
- [ ] File structure matches repository conventions

---

## 🚀 Next Steps After Milestone 2

Once Milestone 2 is complete:

### Before Milestone 3:
1. **Practice your pitch** with your team and get feedback
2. **Review each team member's role** in the pitch
3. **Identify technical challenges** for development
4. **Create GitHub issues** for each feature to track in Milestone 3
5. **Set up your development environment** (Node, React, PostgreSQL)

### For Milestone 3 (Development Begins):
- Set up Express backend server
- Set up React frontend with React Router
- Create database and seed initial data
- Implement API routes for all endpoints
- Build React components for each wireframed page
- Connect frontend to backend API

### Key Reminders:
- All Baseline Features must be completed
- Both Custom Features must be implemented:
  1. Auto-Generated Daily Prompts
  2. Advanced Sorting & Filtering
- Regular commits to GitHub with clear messages
- Test features before considering them complete

---

## 💡 Tips for Success

### For Wireframes:
- Keep them simple but detailed enough for development
- Show real user flows and interactions
- Note all buttons, forms, and interactive elements
- Include loading states and error handling UX

### For ERD:
- Make sure relationships are clear and labeled
- Document the purpose of each table
- Note any denormalization decisions and why
- Consider future scalability in design

### For Pitch:
- Practice out loud multiple times
- Make eye contact and smile during presentation
- Use natural hand gestures
- Tell a compelling story, not just feature listing
- Leave time for questions
- Be ready to explain technical decisions if asked

---

## 📊 Milestone 2 Completion Status

**Current Status:** ✅ ALL MATERIALS CREATED

- ✅ Wireframes (4 pages, detailed)
- ✅ ERD (5 relationships, fully documented)
- ✅ Pitch (2-minute script + Q&A + tips)
- ✅ Checklist & guidance

**Ready for:** Repository upload and team presentation

**Time Estimate for Upload:** 15-30 minutes to copy files to GitHub

**Presentation Prep Time:** 1-2 hours to practice and refine pitch

---

## 📞 Quick Reference

**Need to update team names?** Edit README.md

**Need to modify wireframes?** Edit planning/wireframes.md

**Need to change database schema?** Edit planning/erd.md

**Need to practice pitch?** Use docs/pitch.md

**Missing something?** Refer back to the wireframes/ERD/pitch files for details

---

**Milestone 2 Status:** Ready for Submission ✅
**Next Milestone:** Milestone 3 - Development Setup & GitHub Project Management