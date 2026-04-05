# 🍿 CineNest Movie Engine

A premium, high-end Movie Information & Review platform built with **Next.js 16 (App Router)**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Features
- **Cinematic Dark Design**: A visually stunning UI built with `zinc-950` and high-fidelity accents.
- **TMDB Live Data**: Real-time integration for Trending and Upcoming movies.
- **ISR Architecture**: Optimized with a 3600s revalidation cycle for peak SEO and performance.
- **High-Performance Logic**: Optimized with `next/image` and server-side data fetching.
- **Robust Fail-safes**: Integrated high-fidelity mock data system for seamless development even without API keys.

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mukithasan232/cine_nest_movie_site.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Security & API Configuration**:
   This project uses environment variables for secure API access. **Never commit your `.env` files to version control.**
   
   Create a `.env.local` file at the root:
   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
   ```

4. **Development**:
   ```bash
   npm run dev
   ```

## 🌍 Vercel Deployment

This project is optimized for deployment on **Vercel**.

1. Connect your repository to Vercel.
2. In the **Environment Variables** section of your Vercel project settings, add:
   *   `NEXT_PUBLIC_TMDB_API_KEY` = `[Your TMDB API Key]`
3. Deploy!

## 🛡 Security Note
All sensitive API communication is handled through environment variables. The project includes a `lib/tmdb.ts` wrapper that gracefully handles missing keys by providing cinematic mock data, keeping your application functional and beautiful during development.

---
*Developed by Antigravity*
