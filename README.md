# Bento AI Portfolio

A modern, highly customizable bento-style portfolio template designed for professionals. Built with Next.js, Tailwind CSS, and powered by AI via vibeCoding.

This portfolio is not just a static page—it features a built-in AI Assistant that can act as your personal career agent, answering questions about your resume and experience based on a custom knowledge base.

## ✨ Key Features

- **Bento Box Design**: Clean, responsive, and modern grid layout.
- **Built-in AI Assistant**: Integrated with the Vercel AI SDK and Google Gemini. You can provide it with a custom Q&A knowledge base, and it will answer visitor questions on your behalf.
- **Bilingual Support (i18n)**: Out-of-the-box support for switching between English and Chinese modes, including separate resume PDF downloads for each language.
- **Dual Data Sources**: Manage your content either statically via code (`data/content.ts`) or dynamically through the integrated **Sanity CMS**.
- **Dark/Light Mode**: Full theming support.

## 🚀 Getting Started

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🤖 Configuring the AI Assistant

The AI chat widget is powered by the Vercel AI SDK. To enable it locally and in production:

1. Copy the environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Add your Google Gemini API key:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY="your-api-key-here"
   ```
3. Customize the AI's persona and knowledge base in `app/api/chat/route.ts`.

## 📦 Deployment

This project is optimized for deployment on Vercel.

**Steps to deploy:**
1. Push your code to a GitHub repository.
2. Import the repository into Vercel.
3. In the Vercel project settings (**Environment Variables**), add the following:
   - `GOOGLE_GENERATIVE_AI_API_KEY` (Required for the AI Chatbot)
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` (If using Sanity CMS)
   - `NEXT_PUBLIC_SANITY_DATASET` (Set to `production` if using Sanity CMS)
4. Click **Deploy**.

## 📝 Customizing Content (No CMS)

If you don't want to use Sanity CMS, you can easily customize all text, skills, and projects by editing the static data files:
- Edit text content: `data/content.ts`
- Replace PDF resumes: `public/resume/YukiZhang_Resume.pdf` and `public/resume/YukiZhang_Resume_EN.pdf`
- Replace avatar/images: `public/pic.png`

## 🧩 Using Sanity CMS (Optional)

Sanity Studio is embedded directly into the Next.js app at the `/studio` route. 

To enable Sanity:
1. Ensure your Sanity credentials are set in `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   ```
2. Open [http://localhost:3000/studio](http://localhost:3000/studio) and log in.
3. The site will automatically use data from Sanity if it is configured. If a section is missing in Sanity, it falls back to the static files.
