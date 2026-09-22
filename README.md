# Siva React Portfolio

This is the React/Vite conversion of the original HTML, CSS and JavaScript portfolio.

## 1. Install Node.js

Install Node.js LTS if it is not already installed.

Check:

```bash
node -v
npm -v
```

## 2. Open this folder

```bash
cd siva-react-portfolio
```

## 3. Install dependencies

```bash
npm install
```

## 4. Add your existing portfolio assets

Copy your existing files into:

`public/assets/`

Use these filenames because App.jsx references them:

- myphoto.jpeg
- topper.jpeg
- secretary.JPG
- elevatelabs.jpeg
- dovoo.jpeg
- calculator.png
- timer.png
- to-do-list.png
- sivaresume.pdf

## 5. Run the React portfolio

```bash
npm run dev
```

Then open the localhost URL shown by Vite.

## What was converted

- HTML sections -> React JSX components
- Navigation toggle -> React `useState`
- Active navigation -> React `useEffect` + scroll listener
- Smooth scrolling -> React event handlers + `scrollIntoView`
- Achievement popup -> React state
- Scroll animations -> `IntersectionObserver` inside `useEffect`
- Contact form -> React submit handler with your existing Formspree endpoint
- Resume download -> normal React/public asset download link
- Repeated content -> JavaScript arrays + `.map()`

## Important

The original portfolio content and project links were kept as provided. Update the text/data in `src/App.jsx` whenever you want to change your profile, education, projects, skills, or achievements.
