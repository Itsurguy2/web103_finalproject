# Design Daily - Milestone 3: Development Begins

## 📋 Milestone 3 Overview

Milestone 3 marks the transition from planning to development. Your team will:

1. **Present your pitch** to the class/instructors
2. **Set up GitHub project management** with issues and project board
3. **Begin development** with environment setup and first features

---

## ✅ Milestone 3 Checklist

### Phase 1: Presentation (Week of Milestone 3 Due Date)

- [ ] **Practice pitch as a team** (1-2 hours)
  - Divide speaking roles
  - Practice out loud 3+ times
  - Time to ensure 1:50-2:00
  
- [ ] **Prepare backup plan** for live demo
  - Have screenshots ready if demo fails
  - Know your talking points

- [ ] **Assign presentation roles:**
  - Who introduces the problem?
  - Who explains the solution?
  - Who talks about features?
  - Who closes/calls to action?

- [ ] **Present to class** ✨
  - Make eye contact
  - Speak confidently
  - Be ready for questions

---

### Phase 2: GitHub Project Setup

#### Create GitHub Project Board

- [ ] Go to your repository
- [ ] Click "Projects" tab
- [ ] Click "New project"
- [ ] Choose "Table" or "Board" view
- [ ] Create columns:
  - Backlog
  - To Do
  - In Progress
  - In Review
  - Done

#### Create Labels

- [ ] `priority:high` (Red)
- [ ] `priority:medium` (Yellow)
- [ ] `priority:low` (Blue)
- [ ] `feature:backend` (Green)
- [ ] `feature:frontend` (Purple)
- [ ] `feature:database` (Orange)

#### Create Issues

**Copy from `milestone3_github_issues.md` and create all 20 issues in GitHub**

- [ ] Issue #1: Express Server
- [ ] Issue #2: PostgreSQL Database
- [ ] Issue #3: Database Schema
- [ ] Issue #4: Seed Initial Data
- [ ] Issue #5: GET /api/prompts/today
- [ ] Issue #6: CRUD Routes for Submissions
- [ ] Issue #7: Routes for Comments
- [ ] Issue #8: Routes for Likes
- [ ] Issue #9: User Profile Routes
- [ ] Issue #10: React Setup
- [ ] Issue #11: API Service Layer
- [ ] Issue #12: Home Page
- [ ] Issue #13: Feed Page
- [ ] Issue #14: Submission Detail
- [ ] Issue #15: Profile Page
- [ ] Issue #16: Prompt Scheduler
- [ ] Issue #17: Backend Sort/Filter
- [ ] Issue #18: Frontend Sort/Filter
- [ ] Issue #19: Write Tests
- [ ] Issue #20: Deploy to Render

#### Organize Issues

- [ ] Assign issues to team members
- [ ] Add all issues to Project Board
- [ ] Label each issue appropriately
- [ ] Prioritize issues (use priority labels)

---

### Phase 3: Development Environment Setup

**Each team member should complete these on their local machine**

#### Backend Setup

- [ ] Have Node.js installed (`node --version`)
- [ ] Create `server/` folder in repository
- [ ] Run `npm init -y` in server folder
- [ ] Install dependencies: `npm install express dotenv pg cors`
- [ ] Install dev dependency: `npm install --save-dev nodemon`
- [ ] Create `server/.env` file
- [ ] Create `server/server.js` basic server
- [ ] Create `server/config/database.js` database config
- [ ] Update `package.json` scripts
- [ ] Test: `npm run dev` should show "Server running on http://localhost:5000"

#### Database Setup

- [ ] Have PostgreSQL installed or online service set up
- [ ] Create database: `CREATE DATABASE design_daily;`
- [ ] Create `server/seeds/schema.sql` with all tables
- [ ] Run schema: `psql -U postgres -d design_daily -f server/seeds/schema.sql`
- [ ] Create `server/seeds/seed.js` for initial data
- [ ] Test: `npm run seed` should populate database

#### Frontend Setup

- [ ] Create React app: `npx create-react-app client`
- [ ] Install dependencies: `npm install axios react-router-dom`
- [ ] Create `client/.env` with API_URL
- [ ] Create `client/src/services/api.js` with all API functions
- [ ] Create `client/src/App.jsx` with React Router setup
- [ ] Create page stubs in `client/src/pages/`
- [ ] Test: `npm start` should open http://localhost:3000

#### Communication Test

- [ ] Start backend server (`npm run dev` in server folder)
- [ ] Start frontend (`npm start` in client folder)
- [ ] Create temporary test component
- [ ] Call API from frontend, see response in console
- [ ] Both are communicating ✅

---

### Phase 4: First Development Sprint

**Target: Complete first 4 backend setup issues**

- [ ] **Issue #1**: Express Server set up
  - [ ] Server runs without errors
  - [ ] Responds to GET /api/health
  - [ ] CORS enabled
  - [ ] Error handling in place
  
- [ ] **Issue #2**: PostgreSQL connected
  - [ ] Connection string configured
  - [ ] Can query database from server
  - [ ] GET /api/db-test returns server time
  
- [ ] **Issue #3**: Database schema created
  - [ ] All 5 tables created
  - [ ] Foreign keys working
  - [ ] Constraints in place
  - [ ] Indexes created
  
- [ ] **Issue #4**: Initial data seeded
  - [ ] npm run seed works
  - [ ] Prompts populated
  - [ ] Sample users created
  - [ ] Database reset functionality

---

### Phase 5: Git Workflow

- [ ] Each developer clones the repository
- [ ] Create feature branches: `git checkout -b feature/#[issue]-name`
- [ ] Work on assigned issues
- [ ] Commit with issue reference: `git commit -m "[#issue] Description"`
- [ ] Push to GitHub: `git push origin feature/#[issue]-name`
- [ ] Create Pull Requests for review
- [ ] Merge after approval
- [ ] Pull latest before starting new feature

---

## 📁 Repository Structure Check

Before moving forward, verify your repository has:

```
design-daily/
├── server/
│   ├── config/
│   │   └── database.js
│   ├── seeds/
│   │   ├── schema.sql
│   │   └── seed.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore (include .env!)
│
├── client/
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Feed.jsx
│   │   │   ├── SubmissionDetail.jsx
│   │   │   └── Profile.jsx
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── .env
│   └── package.json
│
├── planning/
│   ├── user_stories.md
│   ├── wireframes.md
│   └── erd.md
│
├── milestones/
│   ├── milestone1.md
│   └── milestone2.md
│
├── README.md
└── .gitignore
```

---

## 🚀 Development Workflow

### Daily Standup
- What did you complete yesterday?
- What are you working on today?
- Any blockers?

### Feature Development Process

1. **Pick an issue** from "To Do" column
2. **Assign to yourself** in GitHub
3. **Move to "In Progress"** in Project Board
4. **Create feature branch**: `git checkout -b feature/#[number]-[name]`
5. **Work on the feature** (commit regularly)
6. **Push branch**: `git push origin feature/#[number]-[name]`
7. **Create Pull Request** with issue reference
8. **Request team review**
9. **Make requested changes** if any
10. **Merge PR** when approved
11. **Move to "Done"** in Project Board
12. **Close the issue**

---

## 💡 Tips for Success

### For Backend Development
- Use Postman or Insomnia to test API endpoints before frontend connects
- Test each endpoint with valid and invalid data
- Log important information for debugging
- Use proper HTTP status codes (200, 201, 400, 404, 500)

### For Frontend Development
- Build components in isolation first
- Test API service layer independently
- Use React DevTools browser extension
- Console.log important data to verify API calls
- Start with layout, then add functionality

### For Team Collaboration
- Use descriptive commit messages
- Pull frequently to stay in sync
- Communicate blockers in Discord/Slack
- Review each other's code
- Help teammates when they're stuck

### For Code Quality
- Follow naming conventions (camelCase for functions, PascalCase for components)
- Comment complex logic
- Keep functions small and focused
- Test functionality as you build
- No console.errors or warnings before committing

---

## 🎯 Sprint Goals

### Sprint 1 (Issues #1-4): Backend Foundation ✅
**Goal:** Database and server setup complete
**Status:** Ready to start

### Sprint 2 (Issues #5-9): API Routes
**Goal:** All endpoints implemented
**Status:** Start after Sprint 1 complete

### Sprint 3 (Issues #10-11): Frontend Setup
**Goal:** React configured and API connected
**Status:** Can overlap with Sprint 2

### Sprint 4 (Issues #12-15): Frontend Pages
**Goal:** All 4 main pages built
**Status:** After Sprint 3 complete

### Sprint 5 (Issues #16-18): Custom Features
**Goal:** Prompt scheduler and sort/filter working
**Status:** During Sprint 4

### Sprint 6 (Issues #19-20): Polish & Deploy
**Goal:** Tests written and deployed to Render
**Status:** Final week

---

## ⚠️ Common Issues & Solutions

### "Module not found" error
```bash
npm install
# or if specific package
npm install [package-name]
```

### Server won't start
- Check port isn't already in use
- Verify .env file exists and has correct values
- Look for syntax errors in server.js

### Can't connect to database
- Verify PostgreSQL is running
- Check database name in .env
- Verify credentials are correct
- Test with `psql` directly

### CORS error when frontend calls backend
- Ensure `app.use(cors())` in backend
- Check frontend API_URL in .env matches backend URL
- Verify both servers are running

### Git merge conflicts
- Open file with conflicts
- Choose which changes to keep
- Resolve all conflicts
- `git add .` and `git commit`

---

## 📊 Development Metrics

By the end of Milestone 3, you should have:

- ✅ GitHub Project Board with 20 issues
- ✅ Backend server running locally
- ✅ Database connected and seeded
- ✅ Frontend React app running
- ✅ Backend and frontend communicating
- ✅ First issues in progress
- ✅ Regular Git commits with clear messages

---

## 🎬 Next Steps

### Immediately After Milestone 3 Presentation
1. Review feedback from instructors
2. Create all GitHub issues
3. Assign issues to team members
4. Start Sprint 1 (Backend setup)

### Week 1-2 of Development
- Complete all backend setup (Issues #1-4)
- Start API routes (Issues #5-9)
- Each developer working on assigned issues

### Week 3-4 of Development
- Complete API routes (Issues #5-9)
- Set up frontend (Issues #10-11)
- Start building pages (Issues #12-15)

### Week 5-6 of Development
- Complete all pages
- Implement custom features (Issues #16-18)
- Write tests (Issue #19)
- Deploy to Render (Issue #20)

### Final Days
- Test everything thoroughly
- Fix any bugs
- Polish UI/UX
- Prepare for Demo Day!

---

## 📞 Support Resources

### Documentation to Reference
- **Wireframes:** `planning/wireframes.md`
- **ERD:** `planning/erd.md`
- **GitHub Issues:** `milestone3_github_issues.md`
- **Development Setup:** `milestone3_development_setup.md`

### External Resources
- Express docs: https://expressjs.com/
- React docs: https://react.dev/
- PostgreSQL docs: https://www.postgresql.org/docs/
- React Router: https://reactrouter.com/
- Axios: https://axios-http.com/

### Getting Help
- Google errors before asking
- Check if another team member solved it
- Ask instructor during office hours
- Post in class Slack/Discord

---

## ✨ You're Ready!

You now have:
- ✅ Complete project plan
- ✅ Detailed wireframes
- ✅ Database design
- ✅ GitHub issues for all features
- ✅ Development setup guide
- ✅ Git workflow guide

**Time to build! 🚀**

Start with the development setup guide, get everything running locally, then tackle Issue #1!

---

**Milestone 3 Status:** Ready to Begin Development ✅
**Estimated Timeline:** 6 weeks for full completion
**Next Milestone:** Final Milestone - Continue development and deploy

Good luck! 🎉