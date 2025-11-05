# Design Daily

## Team Members
- Jesse Rosenthal
- Enoch Owoade
- Joshua Holguin

## Description & Purpose

Design Daily is a creative prompt and inspiration tracker that solves the problem of creative stagnation among designers. Many designers struggle with maintaining consistent practice, overcoming creative blocks, and connecting with supportive communities. 

Our app provides:
- **Daily design challenges** to fuel creativity and maintain consistent practice
- **Community engagement** through likes and comments on submissions
- **Portfolio building** by naturally collecting diverse work over time
- **Inspiration discovery** through curated submissions from talented designers

Whether you're a professional looking to stay sharp or an aspiring designer building your portfolio, Design Daily provides structure, motivation, and community engagement all in one place.

## Inspiration

Design Daily was inspired by:
- **Dribbble** - A thriving community for designers to share work and get inspired
- **Daily coding challenges** like LeetCode - The power of structured daily practice
- **Inktober** and similar creative challenges - How themes unite creative communities
- **Habit-tracking apps** - The importance of streaks and consistency in building practice
- **The isolation of creative work** - Designers needed a supportive space that combines challenges, portfolio building, and community

We wanted to create a platform that captures all these elements into one cohesive experience.

---

## Features

### ✅ Baseline Features

1. **Daily Design Prompts** - Users receive a new design prompt every day with clear guidelines and creative direction

2. **Prompt Submission & Tracking** - Users can upload their design work for the current day's prompt and track their participation history

3. **View Submissions Feed** - Browse all submissions for each prompt, including artist names and thumbnail previews

4. **Like & Comment System** - Provide feedback and encouragement by liking submissions and leaving constructive comments

5. **User Profile** - Track progress with a personal profile displaying completed challenges, submissions, statistics, and bio

6. **Filter & Sort Functionality** - Organize submissions by "Most Liked" or "Newest" to discover inspiration efficiently

### 🎨 Custom Features

7. **Auto-Generated Daily Prompts** - New design prompts are automatically created and made available at midnight every day without admin intervention needed

8. **Advanced Sorting & Filtering** - Filter submissions by design category (UI/UX, Illustration, Branding, Photography, 3D, Motion, Web Design) to customize your exploration experience

### 🚀 Stretch Features (if implemented)

- User authentication via GitHub OAuth
- Cloud image storage
- Toast notifications for user feedback
- Loading spinners during data fetching
- Featured submissions curated by admins
- User follow system
- Design category badges and statistics

---

## Tech Stack

**Frontend:**
- React
- React Router for navigation
- CSS for styling
- Axios for API calls

**Backend:**
- Node.js with Express
- PostgreSQL database
- RESTful API architecture

**Deployment:**
- Render (hosting)

---

## Getting Started

### Prerequisites
- Node.js and npm installed
- PostgreSQL installed and running
- Git for version control

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd design-daily
```

2. Set up the backend
```bash
cd server
npm install
# Create .env file with database credentials
npm run dev
```

3. Set up the frontend
```bash
cd client
npm install
npm start
```

4. Access the app
Open your browser and navigate to `http://localhost:3000`

---

## Database Schema

### Key Tables
- **users** - User accounts and profiles
- **prompts** - Daily design challenges
- **submissions** - User submissions for prompts
- **comments** - Comments on submissions
- **likes** - Likes on submissions

### Key Relationships
- Users have many Submissions (one-to-many)
- Prompts have many Submissions (one-to-many)
- Submissions have many Comments (one-to-many)
- Users have many Likes through Submissions (many-to-many via join table)

---

## Project Milestones

- **Milestone 1:** Project planning, user stories, and feature list ✅
- **Milestone 2:** Wireframes, ERD, and pitch preparation
- **Milestone 3:** GitHub project setup and development begins
- **Milestone 4:** Continued development and deployment
- **Demo Day:** Final presentation of completed app

---

## API Endpoints

### Prompts
- `GET /api/prompts/today` - Get today's prompt
- `GET /api/prompts` - Get all prompts
- `POST /api/prompts` - Create new prompt (admin)
- `PATCH /api/prompts/:id` - Update prompt (admin)
- `DELETE /api/prompts/:id` - Delete prompt (admin)

### Submissions
- `GET /api/submissions` - Get all submissions
- `GET /api/submissions/:id` - Get single submission
- `POST /api/submissions` - Create new submission
- `PATCH /api/submissions/:id` - Update submission
- `DELETE /api/submissions/:id` - Delete submission

### Comments
- `GET /api/submissions/:id/comments` - Get comments for a submission
- `POST /api/comments` - Create new comment
- `DELETE /api/comments/:id` - Delete comment

### Likes
- `POST /api/likes` - Like a submission
- `DELETE /api/likes/:submissionId` - Unlike a submission

---

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

---

## License

This project is part of the WEB103 course.

---

## Contact & Questions

For questions or issues, please reach out to team members or check the GitHub issues page.

---

**Status:** In Development - Milestone 1 Complete ✅
<img src='https://github.com/Itsurguy2/web103_finalproject/blob/main/Design%20Daily%201.png' title='Video Walkthrough' width='' alt='Video Walkthrough' />
<img src='https://github.com/Itsurguy2/web103_finalproject/blob/main/Submission%20Feed%202.png' title='Video Walkthrough' width='' alt='Video Walkthrough' />
<img src='https://github.com/Itsurguy2/web103_finalproject/blob/main/Submission%20Detail%203.png' title='Video Walkthrough' width='' alt='Video Walkthrough' />
<img src='https://github.com/Itsurguy2/web103_finalproject/blob/main/Your%20Profile%204.png' title='Video Walkthrough' width='' alt='Video Walkthrough' />

