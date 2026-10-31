# 2AM Cameraman

Portfolio site for Max Cavaness ("2AM Cameraman"), a photographer and videographer based in River Falls, WI. It's built to feel like a small desktop OS, with a wallpaper, desktop icons, a taskbar, and apps that open in draggable windows.

https://2amcameraman.com (coming soon)

## Stack

- React + Vite
- Plain CSS with custom properties (no UI framework, no animation library)

## Run it

Requires Node 24 (LTS).

```
npm install
npm run dev
```

Build for production with `npm run build`, and preview that build with `npm run preview`.

## Updating content

Most content is edited in one file under `src/data/`:

- `profile.js`: name, bio, email, and social links
- `videos.js`: YouTube videos
- `projects.js`: projects, which can include a local video
- `resume.js`: resume text

Pictures are automatic: any image placed in `src/assets/photos/` shows up in the Pictures app, with titles taken from filenames.

## How it's organized

- `src/apps/` has one component per app.
- `src/app/desktopConfig.js` is the app registry that drives the desktop icons, start menu, and windows.
- `src/styles/` holds the CSS, with design tokens in `tokens.css`.
- `public/` holds the wallpaper video, poster, favicon, and resume PDF.

To add an app, create a component in `src/apps/`, add its styles, and add an entry to `desktopConfig.js`.

## Notes

- Reduced motion is set by `data-motion` on `<html>`. It starts from the OS setting, and the Motion desktop icon overrides it.
- On phones (600px wide and below), windows become full-screen panels.
- The original plain HTML/CSS/JS site is kept in the `v1-legacy` tag.