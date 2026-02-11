# Deploying `main/frontend` to Vercel

Steps to deploy this project on Vercel (serverless functions):

1. Create a MongoDB Atlas cluster and get a connection string.
2. In your Vercel project settings, add an Environment Variable named `MONGODB_URI` with the Atlas connection string.
3. From the Vercel dashboard, import this repository and point the root to the `main/frontend` folder (or set the project to use that path).
4. Vercel will install dependencies from `package.json` and expose the serverless endpoints at:
   - `/api/signup` — accepts POST with `name`, `email`, `password`
   - `/api/login` — accepts POST with `email`, `password`

Local testing:

Install dependencies and run locally (requires Node and a reachable MongoDB URI in `MONGODB_URI`):

```powershell
cd main/frontend
npm install

# set env for Windows PowerShell temporarily
$env:MONGODB_URI = "your-mongodb-uri-here"
node server.js
```

Notes:
- `server.js` remains for local dev (starts an Express server on port 3000). Vercel uses the API files instead.
- Make sure CORS or frontend endpoints point to the Vercel-hosted API (or use relative `/api/*` paths).
