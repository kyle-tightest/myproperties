# MyProperties

This is a web application that scrapes property listings from Property24, stores them in a Postgres database, and allows you to track your interactions with each listing.

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up your Vercel Postgres database:**

   - Create a new Postgres database on Vercel.
   - Connect your project to the database by following the instructions on the Vercel dashboard.
   - This will automatically set the required environment variables in your project.

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Deploy to Vercel:**

   - Push your code to a Git repository (e.g., GitHub).
   - Import your project into Vercel from the Git repository.
   - Vercel will automatically build and deploy your application.

## How it Works

- The frontend is built with React, Vite, and Tailwind CSS.
- The backend is powered by Vercel Functions.
- A Vercel Postgres database stores the property listings.
- A cron job runs every hour to scrape new listings from Property24.
