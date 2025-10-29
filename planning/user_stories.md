# Design Daily - Milestone 1 Planning Document

## App Overview

**App Name:** Design Daily

**Concept:** Design Daily is a creative prompt and inspiration tracker for designers. Users receive daily design challenges, can submit their work, engage with the community through likes and comments, and discover inspiration from other designers' submissions.

---

## Description & Purpose

Design Daily solves the creative challenge of maintaining consistent design practice and inspiration. Many designers struggle with staying motivated, overcoming creative blocks, and connecting with a community of like-minded creators. This app provides daily design prompts to fuel creativity, a platform to showcase work, and a community space to engage with other designers' creations. Whether you're a professional looking to stay sharp or an aspiring designer building your portfolio, Design Daily provides structure, motivation, and community engagement.

---

## Inspiration

Design Daily was inspired by:
- Dribbble's community-driven design sharing
- Daily coding challenge platforms like LeetCode
- Creative prompt communities like Inktober
- The success of habit-tracking apps in building consistent practice
- The need for designers to have a supportive space that combines daily challenges, portfolio building, and community feedback

---

## Features (Minimum 6)

### Baseline Features
1. **Daily Design Prompts** - Users receive a new design prompt every day that includes a title, description, and design challenge guidelines.

2. **Prompt Submission & Tracking** - Users can submit their design work for the current day's prompt, mark prompts as completed, and track which prompts they've participated in.

3. **View Submissions Feed** - Users can view all submissions from other users for each prompt, including thumbnail previews of submitted designs.

4. **Like & Comment System** - Users can like other users' submissions and leave comments providing feedback and encouragement.

5. **User Profile** - Each user has a profile page displaying their completed challenges, submitted work, statistics (prompts completed, total likes received), and bio.

6. **Filter & Sort Functionality** - Users can sort submissions by "Most Liked," "Newest," or filter by date range to discover inspiration.

### Custom Feature #1
7. **Auto-Generated Daily Prompts** - New design prompts are automatically generated and made available at midnight every day. The system pre-populates a collection of creative design challenges that cycle through or new ones are added regularly.

### Custom Feature #2
8. **Advanced Sorting & Filtering** - Users can sort submissions by "Most Liked," "Newest," and filter by design category (e.g., UI/UX, Illustration, Branding, Photography) to customize their exploration experience.

---

## User Roles (3 Unique Roles)

1. **Designer/Contributor** - Active designers who participate in daily prompts, submit work, and engage with the community
2. **Community Member** - Users who primarily consume content, like and comment on submissions, but may not regularly submit their own work
3. **Admin** - Manages prompt creation, community guidelines, and can feature outstanding submissions

---

## User Stories (Minimum 10)

### Designer/Contributor Stories

**Story 1:** As a designer, I want to see today's design prompt so that I know what challenge to work on.
- Acceptance Criteria:
  - Prompt displays prominently on the home page
  - Prompt includes title, description, and any design guidelines
  - New prompt appears every 24 hours

**Story 2:** As a designer, I want to submit my design work for today's prompt so that I can share my creativity with the community.
- Acceptance Criteria:
  - Upload form accepts image files (PNG, JPG, SVG)
  - Submit button saves the work to the database
  - Submission is timestamped and linked to my user profile
  - Success message appears after submission

**Story 3:** As a designer, I want to view my past submissions on my profile so that I can track my design journey and growth.
- Acceptance Criteria:
  - Profile page lists all my submissions with thumbnails
  - Each submission shows the prompt name and submission date
  - Can click on a submission to view details
  - Display statistics: total prompts completed, total likes received

**Story 4:** As a designer, I want to see other designers' submissions so that I can get inspired and discover new creative approaches.
- Acceptance Criteria:
  - Feed displays all submissions for the current prompt
  - Submissions show artist name, thumbnail, and submission date
  - Can click to view full-size submission and details
  - Feed shows latest submissions first

**Story 5:** As a designer, I want to sort submissions by "Most Liked" or "Newest" so that I can discover either trending work or the latest submissions.
- Acceptance Criteria:
  - Sort dropdown on the feed page
  - "Most Liked" shows submissions sorted by like count (highest first)
  - "Newest" shows submissions sorted by submission date (most recent first)
  - Sort preference persists during my session

### Community Member Stories

**Story 6:** As a community member, I want to like other designers' submissions so that I can show appreciation for their work.
- Acceptance Criteria:
  - Like button appears on each submission
  - Click toggles the like state (like/unlike)
  - Like count updates in real-time
  - Can see if I've already liked a submission (visual indicator)

**Story 7:** As a community member, I want to leave comments on submissions so that I can provide constructive feedback and engage in conversation.
- Acceptance Criteria:
  - Comment form appears on each submission detail page
  - Can type and submit comments
  - Comments display with username, timestamp, and comment text
  - Can view all comments on a submission

**Story 8:** As a community member, I want to filter submissions by design category so that I can explore work in areas that interest me most.
- Acceptance Criteria:
  - Filter dropdown or buttons display design categories
  - Categories include: UI/UX, Illustration, Branding, Photography, 3D, Motion, Web Design
  - Filtering updates the feed to show only selected category
  - Clear filter option returns to showing all submissions

### Admin Stories

**Story 9:** As an admin, I want to create and manage design prompts so that users always have fresh challenges to work on.
- Acceptance Criteria:
  - Admin panel accessible only to admins
  - Can create new prompts with title, description, and guidelines
  - Can edit existing prompts
  - Can view all prompts (current and archived)

**Story 10:** As an admin, I want to feature outstanding submissions so that exceptional work gets recognized and highlighted.
- Acceptance Criteria:
  - Admin option to feature a submission
  - Featured submissions appear in a "Featured" section on the home page
  - Featured submissions badge displays on the submission card

**Story 11:** As an admin, I want to delete inappropriate submissions or comments so that the community remains positive and supportive.
- Acceptance Criteria:
  - Admin can remove submissions that violate guidelines
  - Admin can delete comments
  - Users receive notification if their content is removed

---

## Technical Feature Planning

### Database Requirements
- **One-to-Many:** User → Submissions (one user has many submissions)
- **One-to-Many:** Prompt → Submissions (one prompt has many submissions)
- **Many-to-Many:** Users ↔ Likes (many users can like many submissions)
- **One-to-Many:** Submissions → Comments (one submission has many comments)

### API Endpoints (RESTful)
- `GET /api/prompts/today` - Get today's prompt
- `GET /api/prompts` - Get all prompts
- `POST /api/prompts` - Create new prompt (admin only)
- `PATCH /api/prompts/:id` - Update prompt (admin only)
- `DELETE /api/prompts/:id` - Delete prompt (admin only)

- `GET /api/submissions` - Get all submissions
- `GET /api/submissions/:id` - Get single submission
- `POST /api/submissions` - Create new submission
- `PATCH /api/submissions/:id` - Update submission
- `DELETE /api/submissions/:id` - Delete submission (owner or admin)

- `GET /api/comments/:submissionId` - Get comments for a submission
- `POST /api/comments` - Create comment
- `DELETE /api/comments/:id` - Delete comment (owner or admin)

- `POST /api/likes` - Like a submission
- `DELETE /api/likes/:submissionId` - Unlike a submission

---

## Reflection Questions

### Question 1: What problem does your app solve?

Design Daily solves the problem of creative stagnation and lack of community connection among designers. Many designers face creative blocks, struggle to maintain consistent practice, and feel isolated in their creative journey. Our app provides a structured daily challenge system that keeps designers engaged and motivated, combined with a supportive community where they can share work, receive feedback, and draw inspiration from peers. It bridges the gap between personal practice and community engagement, creating accountability and connection simultaneously.

### Question 2: Who is your target user and what is their biggest pain point?

Our target users are designers at all levels—from aspiring students building portfolios to working professionals looking to stay sharp. Their biggest pain points are:
1. **Motivation & Consistency:** Struggling to practice regularly without external structure
2. **Creative Block:** Not knowing what to work on or feeling uninspired
3. **Isolation:** Lacking a supportive community to share work and get feedback
4. **Portfolio Building:** Wanting a platform to showcase diverse work and get community validation

Design Daily addresses all four pain points through daily prompts, a supportive community, and a platform that naturally builds a diverse portfolio.

### Question 3: What makes your app unique or interesting?

Design Daily combines elements that aren't typically found together in one platform:
1. **Daily Structure + Community:** While many platforms have communities, few combine daily structured challenges with active engagement mechanisms
2. **Cross-Discipline Approach:** Unlike platforms focused on one design discipline, Design Daily welcomes UI designers, illustrators, 3D artists, photographers, and more—creating a truly diverse creative community
3. **Dual Motivation:** Users get motivation from both personal achievement (tracking completed challenges) and community appreciation (likes/comments)
4. **Frictionless Inspiration:** The combination of automatic daily prompts and smart sorting ensures users always have fresh inspiration without effort
5. **Growth Tracking:** Users can visually see their design journey over time, which is both motivating and valuable for building professional portfolios

---

## File Structure Notes

When setting up the project, organize files as follows:

```
design-daily/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── services/
│   └── package.json
├── server/
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── server.js
│   └── package.json
└── README.md
```

---

## Next Steps (Milestone 2)

- [ ] Create wireframes for: Home/Prompt Feed, Submission Detail, User Profile, Create Submission
- [ ] Design Entity Relationship Diagram (ERD)
- [ ] Prepare 2-minute pitch for the app
- [ ] Set up GitHub issues for all features