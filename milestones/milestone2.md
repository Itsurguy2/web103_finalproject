# Design Daily - Milestone 2: Wireframes, ERD, and Pitch

## Milestone 2 Checklist

Complete all tasks by the due date:

### Wireframes
- [x] Create wireframes for at least 3 pages
- [x] Add wireframes to `planning/wireframes.md`
- [x] Include list of all app pages
- [x] Show user interactions and flow

**Pages Wireframed:**
1. ✅ Home / Today's Prompt
2. ✅ Submissions Feed
3. ✅ Submission Detail & Comments
4. ✅ User Profile (bonus 4th page)

### Entity Relationship Diagram
- [x] Create ERD for database schema
- [x] Add ERD to `planning/entity_relationship_diagram.md`
- [x] Include all database tables
- [x] Show relationships between tables

**Tables in ERD:**
1. ✅ USERS
2. ✅ PROMPTS
3. ✅ SUBMISSIONS
4. ✅ COMMENTS
5. ✅ LIKES (many-to-many join table)

**Relationships:**
- ✅ One-to-Many: Users → Submissions
- ✅ One-to-Many: Prompts → Submissions
- ✅ One-to-Many: Submissions → Comments
- ✅ Many-to-Many: Users ↔ Submissions (via Likes)

### Pitch Preparation
- [x] Develop 3-minute pitch presentation
- [x] Include problem, solution, and features
- [x] Prepare for Q&A
- [x] Pitch to be presented next unit

### Reflection Questions

---

## Reflection Questions

### Question 1: What are the key features of your app?

**Answer:**

Design Daily's key features include:

1. **Daily Design Prompts** - Users receive a new design challenge every day, automatically activated at midnight, providing consistent practice opportunities across various design disciplines (UI/UX, Illustration, Branding, Photography, 3D, Motion, Web Design).

2. **Submissions & Portfolio Building** - Users upload their design work in response to daily prompts, automatically building a diverse portfolio over time while participating in community challenges.

3. **Community Engagement** - Users can like and comment on others' submissions, creating a supportive feedback loop that encourages quality participation and community connection.

4. **Smart Discovery** - Users can sort submissions by "Most Liked" to see trending work or "Newest" to discover fresh submissions, and filter by design category to focus on areas of interest.

5. **Progress Tracking** - Users have personal profiles displaying completion statistics, current streak (consecutive days participated), longest streak achieved, and total likes received—gamifying the experience and providing motivation.

6. **User Profiles** - Each designer has a profile showcasing their submitted work, bio, location, title, and comprehensive statistics about their participation and community reception.

**Custom Feature #1:** Auto-Generated Daily Prompts - The system automatically activates a new prompt every day without manual intervention, powered by a scheduler that maintains consistency and reliability.

**Custom Feature #2:** Advanced Sorting & Filtering - Users can combine sorting (by likes or date) with category filtering (UI/UX, Illustration, etc.) to discover inspiration tailored to their interests.

---

### Question 2: What problem does your app solve?

**Answer:**

Design Daily solves **four interconnected problems** that designers face:

1. **Creative Burnout & Stagnation**
   - Problem: Designers working on client projects experience creative fatigue and loss of inspiration
   - Solution: Daily prompts provide fresh creative challenges and structured practice opportunities

2. **Inconsistent Practice**
   - Problem: Without external structure or accountability, designers skip practice and skills atrophy
   - Solution: Daily prompts + streak tracking create habit formation and accountability

3. **Isolation & Lack of Community**
   - Problem: Many designers work in silos without meaningful feedback or connection to peers
   - Solution: Community features (likes, comments) and shared challenges foster connection and support

4. **Difficulty Building a Diverse Portfolio**
   - Problem: Designers struggle to build varied portfolios when focused on one job or specialty
   - Solution: Responding to diverse daily prompts automatically creates a portfolio spanning multiple design disciplines

By combining daily structure, community engagement, and progress tracking, Design Daily addresses the root causes of designer burnout while building community and supporting portfolio development.

---

### Question 3: What makes your app unique compared to existing solutions?

**Answer:**

Design Daily stands out in the design tools landscape by uniquely combining elements that other platforms keep separate:

**vs. Dribbble (Design Portfolio Platform)**
- Dribbble focuses on showcasing finished work to employers/clients
- Design Daily emphasizes **daily practice & process**, not finished portfolio pieces
- Dribbble is portfolio-centric; Design Daily is community & practice-centric
- **Our advantage:** Lower barrier to entry, focus on growth, supportive over competitive

**vs. Daily Prompt Websites (e.g., Design of the Day)**
- Generic prompt sites lack community engagement or feedback loops
- Design Daily includes **likes, comments, and community interaction**
- Generic sites lack persistence or portfolio building
- **Our advantage:** Community-driven, builds lasting portfolio, ongoing engagement

**vs. Habit/Productivity Apps (Habitica, Streaks)**
- General habit trackers aren't design-specific
- Design Daily is **purpose-built for designers**
- Generic apps don't provide creative challenges or community
- **Our advantage:** Combines habit tracking with creative practice & community

**vs. Social Media (Instagram, Twitter)**
- Social media design communities are scattered and unstructured
- Design Daily provides **daily structure and themed challenges**
- Social platforms prioritize engagement metrics over growth
- **Our advantage:** Focused on designer growth, not vanity metrics

**Our Unique Value Proposition:**
Design Daily is the only platform that combines:
1. **Structured daily challenges** (like LeetCode for designers)
2. **Supportive community feedback** (not anonymous critique)
3. **Automatic portfolio building** (portfolio as byproduct, not goal)
4. **Cross-disciplinary** (all design disciplines welcome)
5. **Gamified progress tracking** (streaks, stats, growth metrics)
6. **Habit formation** (daily practice reinforcement)

No existing platform combines all six elements. That's what makes Design Daily unique.

---

## Wireframes Summary

**4 Wireframed Pages:**

1. **Home Page** - Displays today's design prompt with clear call-to-action buttons
   - Prompt title, description, guidelines
   - Time remaining timer
   - "Submit Your Design" and "View Submissions" buttons
   - User stats footer

2. **Submissions Feed** - Browse all submissions for the current prompt
   - Sort dropdown (Most Liked / Newest)
   - Category filter dropdown
   - Grid of submission cards with artist, likes, comments
   - Load more pagination

3. **Submission Detail** - View full submission with comments
   - Full-size submission image
   - Artist information and profile link
   - Comment section with all feedback
   - Add new comment form
   - Like button for engagement

4. **User Profile** - Display user's portfolio and statistics
   - Profile header with bio and avatar
   - Statistics (prompts completed, likes, streaks)
   - Gallery grid of user's submissions
   - Edit profile capability

---

## Entity Relationship Diagram Summary

**5 Database Tables:**

1. **USERS** - User accounts and profiles (14 columns)
2. **PROMPTS** - Daily design challenges (7 columns)
3. **SUBMISSIONS** - User submissions for prompts (10 columns)
4. **COMMENTS** - Comments on submissions (7 columns)
5. **LIKES** - Join table for many-to-many relationship (4 columns)

**Key Relationships:**
- Users (1) → (Many) Submissions
- Prompts (1) → (Many) Submissions
- Submissions (1) → (Many) Comments
- Users ↔ (Many-to-Many) Submissions via Likes table

**Design Decisions:**
- Denormalized like_count and comment_count for performance
- Cascade delete for data integrity
- UNIQUE constraint on likes to prevent duplicates
- Streak tracking fields for gamification

---

## Pitch Presentation Summary

**3-Minute Pitch Outline:**

**Opening (15 seconds)** - Hook the audience with the problem
- "Have you ever scrolled through design inspiration sites and felt like you were missing something?"

**Problem (20 seconds)** - Three designer pain points
1. Creative burnout from client work
2. Inconsistent practice without structure
3. Isolation and lack of meaningful community

**Solution (25 seconds)** - How Design Daily solves all three
- Daily prompts for consistent practice
- Community engagement through likes and comments
- Portfolio building as a byproduct

**Features (30 seconds)** - Key capabilities
- Daily design challenges across all disciplines
- Community submissions feed
- Sorting and filtering for discovery
- Progress tracking with streaks and statistics

**Why Different (20 seconds)** - Competitive advantage
- Combines daily challenges with community (not either/or)
- Cross-disciplinary (not siloed by specialty)
- Supportive, not competitive environment

**Call to Action (10 seconds)** - Next steps
- "Let's launch Design Daily and build the design community we deserve!"

---

## Files Submitted for Milestone 2

✅ `planning/wireframes.md` - 4 detailed wireframed pages
✅ `planning/entity_relationship_diagram.md` - Complete ERD with 5 tables
✅ `milestones/milestone2.md` - This file with reflections
✅ Pitch presentation prepared and ready

---

## Next Steps (Milestone 3)

1. Present 3-minute pitch to classmates (next unit)
2. Set up GitHub project with issues for all features
3. Begin development on frontend and backend
4. Implement all baseline features
5. Implement both custom features
6. Deploy to Render

---

**Milestone 2 Status:** ✅ Complete and Ready for Presentation

**Presentation Date:** Next Unit (Milestone 3)

**Pitch Duration:** 3 minutes + Q&A

**Prepared by:** Jesse Goffin, Enoch Owoade, Joshua Holguin
