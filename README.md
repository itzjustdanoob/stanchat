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
- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `POST /api/posts/:id/vote`

## Frontend

The frontend is plain HTML, CSS, and JavaScript, so it does not need a separate build step. It includes:

- login and registration
- student feed with search, sorting, and topic filters
- post composer for logged-in users
- post detail modal
- upvoting
- responsive desktop and mobile layouts
