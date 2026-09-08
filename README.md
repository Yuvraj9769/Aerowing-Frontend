# Pulse CRM frontend

This folder contains the web app for Pulse CRM. It is a Next.js app for viewing and managing sales leads.

The frontend talks to the Express API in `../server`.

## What is included

- A dashboard at `/` with lead counts for each pipeline status.
- Search by lead name, email address, or company.
- Status and source filters, created-date sorting, and pagination.
- A form for creating and editing leads.
- A lead details page at `/leads/[id]`.
- Status changes from the lead details page.
- A confirmation dialog before deleting a lead.
- An activity timeline showing when a lead was created and when its status changed.
- Loading, empty, error, retry, and success states.
- A responsive layout with a collapsible sidebar on larger screens and a drawer on small screens.

## Main frontend flow

The dashboard keeps the current page, search text, status, source, and sort order in local state. Search is delayed by 400 ms before a request is sent, so the API is not called for every key press.

`src/services/lead.service.ts` contains the API calls. `src/lib/api-client.ts` creates the Axios client, and React Query manages the list, statistics, and detail requests.

After a lead is created, updated, or deleted, the related lead list and statistics queries are invalidated. Updating a lead also updates its cached detail query. This makes the table and the metric cards refresh after a change.

The create and edit form uses React Hook Form with the Zod schema in `src/features/leads/schemas/lead.schema.ts`. The browser checks the name, email, phone, company, status, and source before sending the request.

## Tech used

- Next.js 15 with the App Router
- React 19 and TypeScript
- Tailwind CSS
- TanStack React Query
- Axios
- React Hook Form and Zod
- Lucide React icons

## Requirements

- Node.js
- The backend API running from `../server`

## Run the frontend

From the repository root:

```powershell
cd client
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

The API client uses `http://localhost:5000/api` by default. To use another API URL, create `client/.env.local` and add:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

The value should include the `/api` part of the server URL.

## Available scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Starts the Next.js development server. |
| `pnpm build` | Creates a production build. |
| `pnpm start` | Starts the production build. Run `pnpm build` first. |
| `pnpm lint` | Runs ESLint and fails if warnings are found. |

## Frontend folders

```text
src/
  app/                         Next.js routes and global layout
  components/                  Shared layout, query provider, and UI components
  features/leads/              Dashboard, detail view, forms, table, filters, and timeline
  hooks/                       Small reusable hooks such as the search debounce
  lib/                         Axios and React Query setup
  services/                    Functions that call the lead API
  types/                       Frontend lead and API response types
  constants/                   Lead statuses, sources, and page size
  utils/                       Date and display formatting helpers
```

## Notes

- There is no authentication or user session flow in the current frontend.
- The dashboard uses a fixed page size of 10 leads, matching the value sent by `leadService.getLeads`.
- The detail page can update a lead's status, but full lead edits are done from the dashboard edit dialog.
