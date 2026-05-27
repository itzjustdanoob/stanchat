# Stanchat

Stanchat is a college-focused forum for students applying to colleges and students already on campus.

## Run locally

```bash
node index.js
```

Then open:

```text
http://localhost:5050
```

The frontend is served from `public/` and talks to the existing API routes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `POST /api/posts/:id/vote`
- `POST /api/posts/:id/downvote`
- `GET /api/posts/:id/comments`
- `POST /api/posts/:id/comments`

## Frontend

The frontend is plain HTML, CSS, and JavaScript, so it does not need a separate build step. It includes:

- login and registration
- student feed with search, sorting, and topic filters
- post composer for logged-in users
- post detail modal
- upvoting and downvoting
- one vote per signed-in user per post
- comment threads on every post
- forgot-password flow with reset code
- Stanchat logo asset
- responsive desktop and mobile layouts
