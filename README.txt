VISITOR INSIGHTS — CLOUDFLARE PAGES

WHAT THIS DOES
- Visitors see an analytics consent prompt. If they decline, no analytics request is sent.
- If they allow, the site records public IP (from Cloudflare), approximate city/region/country (when Cloudflare supplies it), browser, OS, device category, screen size, timezone, page path and server timestamp.
- It does NOT collect GPS coordinates, contacts, email, phone numbers, passwords, camera or microphone.
- Admin dashboard is password protected. It lists the latest 500 records and supports CSV export and delete-all.

IMPORTANT
Publish your own privacy/contact details and retention period before public use. Use only for a legitimate, disclosed purpose. Restrict access to the admin password and AUTH_SECRET. IP and location data can be personal data; follow applicable privacy law. This is a starter project, not legal advice.

DEPLOY (NO COMMAND PROMPT REQUIRED)
1. Create a GitHub account if you do not have one.
2. On GitHub, create a NEW repository named visitor-insights. Set it Private if preferred.
3. Open the repository, choose Add file > Upload files. Extract this ZIP on your computer first, then drag ALL files and folders inside the extracted folder into GitHub. Commit the upload.
4. In Cloudflare dashboard, open Workers & Pages > Create application > Pages > Connect to Git.
5. Connect GitHub and choose visitor-insights. Framework preset: None. Build command: leave blank. Build output directory: / (or . if Cloudflare requires a value). Deploy.
6. Create the database: Cloudflare dashboard > Storage & databases > D1 SQL Database > Create database. Name it visitor-insights-db.
7. Open the new D1 database > Console. Paste all contents of schema.sql and click Execute.
8. Open your Pages project > Settings > Functions > D1 database bindings > Add binding. Variable name: DB. Select visitor-insights-db. Save.
9. In Pages project > Settings > Variables and Secrets, add these production variables:
   ADMIN_PASSWORD = choose a long, unique admin password.
   AUTH_SECRET = a random secret of at least 32 characters. Do not share it.
   Save, then go to Deployments and retry the latest deployment (or push a tiny README edit to trigger redeploy).
10. Visit your Pages URL. Open /admin.html and sign in using ADMIN_PASSWORD.

IMPORTANT CLOUDFLARE NOTE
The site uses Pages Functions in the /functions folder. A drag-and-drop static-only Pages upload does NOT run these API functions. Use the Git integration steps above (or Wrangler deployment) so the Functions and D1 binding work.

TEST
- Open the public site in a private/incognito window.
- Click Allow analytics.
- Open /admin.html and log in. Click Refresh; the test visit should appear.
- Test Decline in another private window; that visit should not be recorded.

TROUBLESHOOTING
- API/500 or DB errors: verify D1 binding variable name is exactly DB and schema.sql was executed in that database.
- Admin login fails: verify ADMIN_PASSWORD and AUTH_SECRET are set for the Production environment, then redeploy.
- /api/visit returns an error: confirm the deployment used Git integration and the functions/ directory exists at repository root.
- If changing secrets, redeploy/retry deployment.
