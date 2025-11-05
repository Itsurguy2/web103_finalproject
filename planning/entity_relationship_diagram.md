erDiagram
    USERS ||--o{ SUBMISSIONS : creates
    USERS ||--o{ COMMENTS : writes
    USERS ||--o{ LIKES : gives
    PROMPTS ||--o{ SUBMISSIONS : has
    SUBMISSIONS ||--o{ COMMENTS : receives
    SUBMISSIONS ||--o{ LIKES : receives

    USERS {
        int user_id PK
        string username UK
        string email UK
        string password
        string avatar_url
        string bio
        string title
        string location
        int prompts_completed
        int total_likes_received
        int current_streak
        int longest_streak
        timestamp created_at
        timestamp updated_at
    }

    PROMPTS {
        int prompt_id PK
        string title
        text description
        text guidelines
        string category
        timestamp date_activated
        timestamp created_at
        timestamp updated_at
    }

    SUBMISSIONS {
        int submission_id PK
        int user_id FK
        int prompt_id FK
        string image_url
        string title
        text description
        string category
        int like_count
        int comment_count
        timestamp created_at
        timestamp updated_at
    }

    COMMENTS {
        int comment_id PK
        int submission_id FK
        int user_id FK
        text comment_text
        int like_count
        timestamp created_at
        timestamp updated_at
    }

    LIKES {
        int like_id PK
        int user_id FK
        int submission_id FK
        timestamp created_at
    }