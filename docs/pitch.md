# Design Daily - Pitch

## 2-Minute Elevator Pitch

### **Concept (15 seconds)**

Design Daily is a community-driven design challenge app that delivers a new creative prompt every day to designers of all skill levels. It's like Inktober meets Dribbble—combining structured daily challenges with a supportive design community.

### **Problem (20 seconds)**

Designers face three major challenges:
1. **Creative Burnout** - It's hard to stay motivated and inspired when working on real-world projects
2. **Inconsistent Practice** - Without structure, designers skip practice and creative skills atrophy
3. **Isolation** - Many designers work in silos without real feedback or connection to a community

### **Solution (25 seconds)**

Design Daily solves all three problems by providing:
- **Daily prompts** that fuel creativity and maintain consistent practice
- **A supportive community** where you can share work, get likes, and receive constructive comments
- **Progress tracking** that gamifies your design journey with streaks and statistics

Whether you're a professional looking to stay sharp or a student building a portfolio, Design Daily gives you the structure, motivation, and community engagement to keep designing.

### **Key Features (30 seconds)**

- 📌 **Daily Design Challenges** - New prompt every day at midnight
- 👀 **Community Feed** - See what other designers are creating and get inspired
- ❤️ **Engagement** - Like and comment on submissions to support the community
- 📊 **Progress Tracking** - View your submissions, streak, and statistics on your profile
- 🎯 **Smart Discovery** - Sort by "Most Liked" or "Newest" and filter by design category

### **Why It's Unique (20 seconds)**

Unlike Dribbble (which focuses on finished work showcase) or random prompt generators (which lack community), Design Daily combines:
- Structured daily prompts that keep you accountable
- A diverse community across all design disciplines
- Real-time engagement and feedback
- Automatic portfolio building as a byproduct

### **Business/Usage Opportunity (10 seconds)**

Whether for personal growth, portfolio building, or team challenges, Design Daily creates a habit-forming community that keeps coming back daily. Think of it as a design gym—where showing up every day makes you better.

---

## Full Pitch Script (2 minutes)

*[Establish presence, make eye contact]*

"Have you ever scrolled through Dribbble and thought, 'I wish I had that level of inspiration and community every single day'? Or felt stuck in your design work with no clear direction on what to work on next?

We're Jesse Goffin, Enoch Owoade, and Joshua Holguin, and we're introducing **Design Daily** — a creative challenge platform that delivers fresh design inspiration every single day.

**Here's the problem we're solving:** Designers struggle in three ways. First, creative burnout—working on client projects is exhausting and inspiration runs dry. Second, inconsistent practice—without structure, skills get rusty. And third, isolation—many designers work alone without meaningful feedback or community.

**Here's our solution:** Design Daily sends a brand new design prompt every day. Whether it's 'design a mobile banking app' or 'create a poster for a music festival,' you have 24 hours to respond. You upload your work, and the community engages with it—liking, commenting, and providing real feedback.

**What makes this special?** It's not just a prompt generator. It's not just a portfolio site. It combines the best of both worlds:
- Like Inktober, Design Daily creates community around a shared challenge
- Like Dribbble, it's a space to share work and get inspiration
- Like LeetCode, it gamifies practice with streaks and statistics

**The core features** include:
- Daily prompts delivered to your inbox and app
- A vibrant feed of designer submissions filtered by category or sorted by popularity
- Like and comment on work to build community
- A personal profile tracking your progress, streaks, and most-liked work

We built this with React on the frontend, Express on the backend, and PostgreSQL for a robust database that supports complex queries for sorting and filtering. The app automatically generates a new prompt daily, and users can filter by design discipline or sort by popularity to discover inspiration.

**Who uses this?** Professionals wanting to stay sharp. Students building portfolios. Design teams doing collaborative challenges. Anyone who wants to be part of a supportive, creative community.

**Why now?** The design community is fragmented. Dribbble is for finished work. Design challenge sites are boring and impersonal. There's no place where practicing design feels like a community sport—until now.

Design Daily is where practice meets inspiration, where you build your portfolio while discovering incredible work from designers just like you.

We're excited to build this. Thank you."

*[Pause for questions]*

---

## Pitch Notes by Role

### For Investors (If Applicable)
**Value Proposition:**
- Recurring engagement (daily use case)
- Community retention (social features)
- Freemium potential (premium features later)
- User-generated content (free content creation)

**Market Size:**
- 15+ million designers globally
- Average Dribbble user retention: 40% daily active
- Potential for design team/enterprise licenses

**Revenue Opportunities:**
- Premium features (advanced analytics, API access)
- Design template marketplace
- Sponsored challenges from brands
- Design tool integrations

### For Designers (Target Users)
**Pitch Angle:**
- "Level up your skills with daily challenges"
- "Get inspired and inspired others"
- "Build an impressive portfolio while having fun"

### For Instructors (Academic Context)
**Pitch Angle:**
- "A platform for hands-on design education"
- "Community-driven learning"
- "Track student progress and engagement"
- "Multi-discipline support for cohort learning"

---

## Q&A Preparation

### Q: How do you keep prompts fresh and interesting?
**A:** We pre-load a database of 365+ prompts created by experienced designers and UX practitioners. Our scheduler activates one per day. For future scalability, we could incorporate user voting on prompt difficulty, AI-generated variations, or community-submitted prompts.

### Q: How do you prevent low-quality submissions?
**A:** Initially, we rely on community feedback (likes/comments). Users naturally elevate quality work. For future features, we could implement admin curation, flagging systems, or portfolio requirements.

### Q: What about time zones? When does the prompt reset?
**A:** Great question! Currently, we use UTC at midnight. For v2, we could implement time zone localization so each user sees their daily prompt at midnight in their local time.

### Q: How do you handle toxic comments?
**A:** Community guidelines are enforced through:
- User reporting system
- Admin moderation
- Warnings and removal for violators
- Future: AI moderation for obvious toxicity

### Q: Is this just for visual design?
**A:** No! We support UI/UX, Illustration, Branding, Photography, 3D, Motion, Web Design, and more. The diversity of disciplines is a key feature—you learn from how other creative professionals approach the same brief.

### Q: How is this different from other design communities?
**A:** 
- **vs. Dribbble:** We focus on daily practice, not finished portfolio pieces
- **vs. Design Challenge Websites:** We emphasize community, not just participation
- **vs. Habit Apps:** We're design-specific and community-driven, not generic goal tracking

### Q: What's the monetization strategy?
**A:** We're currently focused on building a strong user base. Future monetization options include premium analytics, advanced filtering, design template marketplaces, or enterprise team plans.

---

## Presentation Tips

✅ **DO:**
- Show passion for design and community
- Make it personal—explain why YOU care about this
- Emphasize the daily habit angle
- Show enthusiasm for your co-founders

✅ **TONE:**
- Conversational, not robotic
- Confident but humble
- Solution-focused

✅ **BODY LANGUAGE:**
- Stand tall, make eye contact
- Use hand gestures naturally
- Smile—this is exciting!

❌ **DON'T:**
- Ramble or go over time
- Use too much jargon
- Apologize for limitations
- Compare directly to bigger platforms (frame as unique, not inferior)

---

## Visual Aid Recommendations

If using slides or a deck:

**Slide 1:** Design Daily Logo + Tagline
*"Daily Design Challenges. Daily Inspiration. Daily Growth."*

**Slide 2:** Problem (show frustration with current options)
- Chart: Designer workflow challenges
- Images: Dribbble vs. LeetCode comparison

**Slide 3:** Solution (show how Design Daily fixes it)
- Screenshot/mockup of home page with prompt
- Screenshot of feed with submissions

**Slide 4:** Key Features (visual + text)
- Icons for: Daily Prompts, Community, Engagement, Progress

**Slide 5:** User Testimonial (if available)
- Quote from beta user

**Slide 6:** Call to Action
- "Try Design Daily at [deployed URL]"
- "Coming Milestone 3"

---

## Pitch Delivery Checklist

Before your pitch presentation:

- [ ] Practice out loud 2+ times
- [ ] Time yourself (aim for 1:50-2:00)
- [ ] Prepare for 3-5 questions
- [ ] Have team roles assigned (who talks about what)
- [ ] Know your database schema and feature details
- [ ] Have a live demo ready (or mockup screenshots)
- [ ] Dress professionally
- [ ] Get good sleep before pitch day
- [ ] Arrive early to test any technology
- [ ] Have backup plan if live demo fails

---

**Pitch Status:** Ready for Milestone 2 presentation ✅
**Next:** Collect feedback and refine based on instructor/peer input