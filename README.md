# 📰 WordPress API – Backend Assignment

Welcome! This take-home assignment is designed to evaluate your backend development skills, focusing on API integration, data transformation, and clean API design.

## 📌 Goal

Build a simple backend service that fetches blog posts from the public WordPress API at:

https://bergvik.se/wp-json/wp/v2/posts

Your service should expose a custom `/api/trends` endpoint that returns a cleaned and structured version of the data.

## 🛠️ Requirements

### 1. Fetch Data from WordPress

Use the API above to fetch posts.

For each post, extract and return the following fields:
- `title`: plain text title
- `excerpt`: short description or summary (HTML cleaned/removed if needed)
- `link`: URL to the original post
- `date`: publish date in ISO format

### 2. Custom API Endpoint

Implement the following endpoint:

`GET /api/trends`

This endpoint should return a list of cleaned post objects.

#### Query Parameters:
- `?limit=n` – Limit the number of posts returned (default: 10)
- `?search=keyword` – Filter posts where the keyword appears in the title or excerpt (case-insensitive)

## 🔧 Tech Guidelines

- Use **Node.js with TypeScript**
- Build upon the current **Next.js** project. You are free to use other frameworks if preferred.
- Code should be **modular**, **clean**, and **easy to follow**
- Focus on **clarity**, **error handling**, and **sensible defaults**

## ▶️ Getting Started

1. Clone the repo:
   `git clone https://github.com/kaiprofdev04/some-interview-test.git`

2. Install dependencies:
   `npm install`

3. Start the development server:
   `npm run dev`

Your app should now be accessible at:

`http://localhost:3000`

Example usage when testing the custom API endpoint:

`http://localhost:3000/api/trends?limit=5&search=butik`

## 📦 Deliverables

Please submit to interviewer's email:
- Link to a GitHub repo (public or private) with the working app. The `/api/trends` endpoint should be functional.
- A brief video presenting and explaining your solution and your thought process.

## 📚 Notes

- No authentication is required
- You may hard-code user data or mock values if necessary
- Prioritize readability and best practices

---

Good luck — we're excited to see what you build! 🚀
