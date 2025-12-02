# GitHub Secrets Configuration

This project uses GitHub Secrets to securely store API keys for the OpenRouter integration.

## Required Secrets

Go to **Settings → Secrets and variables → Actions → New repository secret** and add:

### 1. `VITE_OPENROUTER_API_KEY`
- **Value:** Your OpenRouter API key (browser-restricted recommended)
- **Example:** `sk-or-v1-...`
- **Get it from:** https://openrouter.ai/keys

### 2. `VITE_OPENROUTER_SITE_URL`
- **Value:** Your production site URL
- **Example:** `https://sena.web.id` or `https://iksena.github.io`

### 3. `VITE_OPENROUTER_APP_NAME`
- **Value:** Your application name
- **Example:** `iksena-portfolio-chat`

### 4. `VITE_OPENROUTER_MODEL`
- **Value:** OpenRouter model to use
- **Example:** `x-ai/grok-4.1-fast:free`

## How It Works

1. The `.env` file is **gitignored** (never committed)
2. During GitHub Actions deployment, secrets are injected into `.env`
3. Vite reads these at build time and embeds them in the bundle
4. The built site in `/docs` contains the values but not the `.env` file

## Local Development

For local development, keep your `.env` file with your actual keys:

```env
VITE_OPENROUTER_API_KEY=sk-or-v1-your-key-here
VITE_OPENROUTER_SITE_URL=http://localhost:5173
VITE_OPENROUTER_APP_NAME=iksena-portfolio-chat
VITE_OPENROUTER_MODEL=x-ai/grok-4.1-fast:free
```

## Security Notes

⚠️ **Important:**
- Use a **browser-restricted** API key on OpenRouter
- Never commit `.env` to the repository
- The API key will be visible in the built JavaScript bundle (client-side)
- Restrict the key to your domain on OpenRouter's dashboard
