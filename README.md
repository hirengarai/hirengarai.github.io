# hirengarai.github.io

Personal academic website built with Jekyll.

## Structure

```
├── _config.yml          # Site configuration
├── _layouts/            # Page templates
│   ├── default.html     # Base template
│   ├── home.html        # Homepage
│   ├── post.html        # Blog posts (with MathJax)
│   └── page.html        # Generic pages
├── _includes/           # Reusable components
│   ├── head.html        # <head> section
│   ├── header.html      # Site header
│   ├── footer.html      # Site footer
│   └── theme-toggle.html
├── _posts/              # Blog posts (Markdown)
├── _sass/               # Modular CSS
│   ├── _variables.scss
│   ├── _base.scss
│   ├── _components.scss
│   ├── _header.scss
│   ├── _home.scss
│   ├── _personal.scss
│   └── _blog.scss
├── assets/
│   ├── css/main.scss    # Main stylesheet
│   ├── js/              # JavaScript files
│   ├── images/          # Images
│   ├── audio/           # Audio files
│   └── pdf/             # PDF files (CV, etc.)
├── personal/            # Personal section pages
├── index.html           # Homepage
├── blog.html            # Blog listing
├── fun.html             # Fun intro page
└── personal.html        # Personal hub
```

## Local Development

1. Install Ruby and Bundler
2. Install dependencies:
   ```bash
   bundle install
   ```
3. Run local server:
   ```bash
   bundle exec jekyll serve
   ```
4. Open http://localhost:4000

## Writing Blog Posts

Create a new file in `_posts/` with format: `YYYY-MM-DD-title.md`

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-01-15
categories: [cryptanalysis]
tags: [chacha, differential-linear]
math: true  # Enable MathJax
---

Your content here...

Inline math: $E = mc^2$

Display math:
$$
\sum_{i=0}^{n} x_i = X
$$
```

## Features

- **Light/Dark Theme**: Follows system preference, with manual toggle
- **MathJax Support**: LaTeX math rendering in blog posts
- **Responsive Design**: Works on all screen sizes
- **Personal Zone**: Separate dark-themed personal section
- **Scroll Persistence**: Remembers position on reload

## Deployment

Push to GitHub and enable GitHub Pages in repository settings. Jekyll will build automatically.

## Assets to Add

Place your files in:
- `assets/images/hirendra-potrait2.jpg` - Profile photo
- `assets/images/favicon.ico` - Favicon
- `assets/audio/name.mp3` - Name pronunciation
- `assets/pdf/hirendra_cv.pdf` - CV

## License

© Hirendra Kumar Garai
