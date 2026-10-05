# Mini Jira

Mini Jira is a project workspace built with Next.js. It includes credential authentication backed by the local mock API.

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set `AUTH_SECRET` to a long random value.
3. Start the mock API with `npm run mock-server`.
4. In another terminal, start the app with `npm run dev`.

The app runs at `http://localhost:3000`; the mock API uses `http://localhost:4000/api/v1` by default.
