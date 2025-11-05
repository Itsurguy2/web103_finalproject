# Design Daily - Wireframes

## Wireframe Overview
Below are detailed wireframe descriptions for 4 key pages of Design Daily. These wireframes show the layout, components, and user flow for the main app pages.

---

## Page 1: Home / Today's Prompt

**Purpose:** Display today's design prompt and key call-to-action buttons

**Layout:**
```
┌─────────────────────────────────────────┐
│  DESIGN DAILY        [Profile] [Logout]  │  ← Header with Nav
├─────────────────────────────────────────┤
│                                           │
│  TODAY'S PROMPT                           │  ← Section Title
│  ─────────────────────────────────────   │
│                                           │
│  📌 PROMPT TITLE                          │  ← Prompt Title
│  "Design a Mobile Banking App"            │
│                                           │
│  DIFFICULTY: Medium  |  CATEGORY: UI/UX  │  ← Metadata
│                                           │
│  GUIDELINES:                              │  ← Description
│  Create a mobile app interface for        │
│  a digital banking platform. Include      │
│  features for account viewing, money      │
│  transfers, and bill payments. Focus      │
│  on clean, intuitive design.              │
│                                           │
│  ⏱️ Time Remaining: 15 hours 42 minutes   │  ← Timer
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │  📤 SUBMIT YOUR DESIGN              │ │  ← CTA Button
│  └─────────────────────────────────────┘ │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │  👀 VIEW SUBMISSIONS (142)          │ │  ← Secondary CTA
│  └─────────────────────────────────────┘ │
│                                           │
└─────────────────────────────────────────┘

Footer: Stats - Prompts Completed: 12 | Likes: 45 | Streak: 7 days
```

**Key Components:**
- Header with navigation
- Today's prompt display card
- Prompt title, difficulty, category
- Full prompt description
- Time remaining until next prompt
- Submit button (prominent)
- View submissions button
- Footer with user stats

**User Interactions:**
- Click "Submit Your Design" → Navigate to Submit Page
- Click "View Submissions" → Navigate to Feed Page
- Click "Profile" → Navigate to Profile Page

---

## Page 2: Submissions Feed

**Purpose:** Browse all submissions for the current prompt, like, and filter/sort

**Layout:**
```
┌─────────────────────────────────────────┐
│  DESIGN DAILY        [Profile] [Logout]  │
├─────────────────────────────────────────┤
│                                           │
│  SUBMISSIONS FOR: "Design a Mobile       │  ← Page Title
│  Banking App"                             │
│                                           │
│  Sort: [Most Liked ▼]  Filter: [All ▼]  │  ← Controls
│                                           │
├─────────────────────────────────────────┤
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │  [Thumbnail Image]                  │ │  ← Submission Card 1
│  │  ──────────────────────────────────  │ │
│  │  📍 Sarah Chen • 2 hours ago        │ │
│  │  ❤️ 124 Likes  💬 8 Comments       │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │  [Thumbnail Image]                  │ │  ← Submission Card 2
│  │  ──────────────────────────────────  │ │
│  │  📍 Marcus Williams • 3 hours ago   │ │
│  │  ❤️ 98 Likes  💬 5 Comments        │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │  [Thumbnail Image]                  │ │  ← Submission Card 3
│  │  ──────────────────────────────────  │ │
│  │  📍 Alex Rivera • 5 hours ago       │ │
│  │  ❤️ 87 Likes  💬 12 Comments       │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  [Load More]                              │  ← Pagination
│                                           │
└─────────────────────────────────────────┘
```

**Key Components:**
- Page title showing current prompt
- Sort dropdown (Most Liked / Newest)
- Category filter dropdown (All / UI/UX / Illustration, etc.)
- Grid of submission cards with:
  - Thumbnail image
  - Artist name
  - Submission timestamp
  - Like count
  - Comment count
- Load More button for pagination

**User Interactions:**
- Click submission card → Navigate to Submission Detail Page
- Click artist name → Navigate to Artist Profile
- Click like button → Toggle like (async, no page reload)
- Click sort dropdown → Re-sort submissions
- Click filter dropdown → Filter by category
- Click comment icon → Scroll to comments section

---

## Page 3: Submission Detail & Comments

**Purpose:** View full submission, leave comments, and like the work

**Layout:**
```
┌─────────────────────────────────────────┐
│  DESIGN DAILY        [Profile] [Logout]  │
├─────────────────────────────────────────┤
│                                           │
│  ← Back to Feed                           │  ← Back Button
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │                                     │ │
│  │     [FULL-SIZE SUBMISSION IMAGE]    │ │
│  │                                     │ │  ← Main Image
│  │     (Takes up most of viewport)     │ │
│  │                                     │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  Sarah Chen                               │  ← Artist Info
│  UI/UX Designer • San Francisco           │
│  [Follow]  [View Profile]                │
│                                           │
│  ❤️ 124 Likes  💬 8 Comments            │  ← Engagement Stats
│                                           │
│  ABOUT THIS SUBMISSION:                   │  ← Description
│  This design focuses on simplifying      │
│  the mobile banking experience with      │
│  an intuitive bottom navigation and      │
│  large, tappable elements...             │
│                                           │
├─────────────────────────────────────────┤
│                                           │
│  COMMENTS (8)                             │  ← Comments Section
│  ─────────────────────────────────────   │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │ Alex R.  • 45 minutes ago           │ │
│  │ Love the color palette! Very clean  │ │
│  │ and professional looking. 👏        │ │
│  │ [❤️ 5] [Reply]                      │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  ┌─────────────────────────────────────┐ │
│  │ Jordan K.  • 1 hour ago             │ │
│  │ The spacing could be tighter on    │ │
│  │ the transfer screen, but great     │ │
│  │ work overall!                      │ │
│  │ [❤️ 3] [Reply]                      │ │
│  └─────────────────────────────────────┘ │
│                                           │
│  ADD A COMMENT:                           │  ← Comment Form
│  ┌─────────────────────────────────────┐ │
│  │ Type your comment here...           │ │
│  │                                     │ │
│  │                  [Post Comment]     │ │
│  └─────────────────────────────────────┘ │
│                                           │
└─────────────────────────────────────────┘
```

**Key Components:**
- Back button to return to feed
- Full-size submission image (centered, responsive)
- Artist name and title
- Follow button
- View profile link
- Like count and comment count
- Submission description/notes
- Comments section with:
  - Comment author
  - Timestamp
  - Comment text
  - Like count
  - Reply option
- Comment input form at bottom
- Post comment button

**User Interactions:**
- Click back button → Return to Feed
- Click artist name/profile link → Navigate to Artist Profile
- Click like button → Toggle like (async)
- Click reply → Expand reply form
- Type and click "Post Comment" → Add comment (async)
- Click like on comment → Like comment (async)

---

## Page 4: User Profile

**Purpose:** Display user's submissions, statistics, and personal information

**Layout:**
```
┌─────────────────────────────────────────┐
│  DESIGN DAILY        [Profile] [Logout]  │
├─────────────────────────────────────────┤
│                                           │
│  ┌──────────────────────────────────────┐│  ← Profile Header
│  │ 👤 JESSE GOFFIN                     ││
│  │ UI/UX Designer • Los Angeles        ││
│  │ Passionate about creating intuitive ││
│  │ digital experiences                ││
│  │                                    ││
│  │ [Edit Profile]  [Share]            ││
│  └──────────────────────────────────────┘│
│                                           │
│  STATISTICS                               │  ← Stats Section
│  ────────────────────────────────────────│
│  Prompts Completed    Likes Received      │
│         12                  187          │
│                                           │
│  Longest Streak       Total Submissions   │
│       7 days                 12          │
│                                           │
│  ────────────────────────────────────────│
│  Current Streak: 🔥 3 days                │
│                                           │
├─────────────────────────────────────────┤
│                                           │
│  MY SUBMISSIONS                           │  ← Submissions Grid
│  ─────────────────────────────────────   │
│                                           │
│  [Thumb] [Thumb] [Thumb] [Thumb]        │
│   Image   Image   Image   Image          │
│                                           │
│  [Thumb] [Thumb] [Thumb] [Thumb]        │
│   Image   Image   Image   Image          │
│                                           │
│                                           │
│  [Load More]                              │
│                                           │
└─────────────────────────────────────────┘
```

**Key Components:**
- Profile header with:
  - User avatar/profile picture
  - Name
  - Title/role
  - Bio
  - Edit and Share buttons
- Statistics section showing:
  - Prompts completed
  - Total likes received
  - Longest streak
  - Total submissions
  - Current streak with fire emoji
- My Submissions section:
  - Grid layout of submission thumbnails
  - 4 items per row
  - Click to view full submission
  - Load More button for pagination
- Edit Profile modal (accessible via Edit button)

**User Interactions:**
- Click Edit Profile → Open modal to edit bio, avatar, etc.
- Click thumbnail → Navigate to Submission Detail Page
- Click Share → Share profile link
- Click Load More → Load additional submissions
- (If viewing own profile) Click Edit → Edit profile information

---

## Wireframe Summary Table

| Page | Key Elements | Primary CTAs | Navigation To |
|------|--------------|--------------|---------------|
| Home | Prompt display, stats, timer | Submit Design, View Submissions | Submit page, Feed page |
| Feed | Submission cards, sort/filter controls | Click card, like, comment | Detail page, Profile |
| Detail | Full image, comments section, artist info | Post comment, like, follow | Back to feed, Profile |
| Profile | Stats, submission grid, bio | Edit profile, view submission | Edit modal, Detail pages |

---

## Design Considerations

### Responsive Design Notes
- **Mobile (< 600px):** Single column layouts, stacked components
- **Tablet (600-1024px):** 2-column grids for submissions
- **Desktop (> 1024px):** 4-column grids, side panels possible

### Color & Visual Hierarchy
- Primary action buttons prominent and colorful
- Secondary actions more subtle
- Like counts and engagement metrics visible but not overwhelming
- Artist names clearly displayed on all submissions

### Accessibility
- Alt text on all images
- High contrast for text
- Clear button labels
- Keyboard navigation support

### Interactive States
- Hover effects on clickable elements
- Like button toggles filled/unfilled
- Loading states while fetching comments
- Success feedback when comment posted
- Error states if submission fails

---

## Next Steps
These wireframes will guide your development in Milestone 3. Each wireframe maps to one or more React components and pages.
