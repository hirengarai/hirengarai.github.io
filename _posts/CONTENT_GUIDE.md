# Personal Section - Format Guide

This guide shows how to add content to each section of the personal space.
All formats follow the retro terminal aesthetic.

---

## 📝 BLOG POSTS (Thoughts/Vlogs)

Location: `_posts/`  
Filename: `YYYY-MM-DD-title-slug.md`

### Basic Post

```markdown
---
layout: vlog
title: "Your Post Title"
date: 2025-01-15
tags: [Vlog, Travel]
---

## section heading

Your content here...

- bullet point one
- bullet point two
```

### Full Options Post

```markdown
---
layout: vlog
title: "A Slow Sunday in Kyoto"
date: 2025-01-12
location: Kyoto                    # optional - shows in meta
mood: calm                         # optional - shows in meta
read_time: 6 min read              # optional - shows in meta
lead: "Opening line for the post." # optional - italic intro text
written_at: "11:48 pm"             # optional - shows in footer
tags: [Vlog, Travel]               # for filtering (Vlog, Math, Notes, etc.)
---

## morning

Your paragraph text here.

## afternoon

More text here.

## snapshots

- item one
- item two
- item three
```

### Adding Images in Posts

```markdown
## single image
![Alt text]({{ '/assets/pictures/photo.jpg' | relative_url }})

## image with caption
<figure>
  <img src="{{ '/assets/pictures/photo.jpg' | relative_url }}" alt="Description">
  <figcaption>Caption text here</figcaption>
</figure>

## multiple images (grid)
<div class="photo-grid">
  <img src="{{ '/assets/pictures/photo1.jpg' | relative_url }}" alt="">
  <img src="{{ '/assets/pictures/photo2.jpg' | relative_url }}" alt="">
  <img src="{{ '/assets/pictures/photo3.jpg' | relative_url }}" alt="">
</div>

## scribble/handwritten note
<img src="{{ '/assets/pictures/note.jpg' | relative_url }}" alt="Handwritten note" class="scribble">
```

### Math Posts with LaTeX

Add `math: true` to front matter to enable MathJax:

```markdown
---
layout: vlog
title: "Bias and Correlation"
date: 2025-01-15
math: true                         # <-- enables LaTeX
tags: [Math, Crypto]
---

## inline math

The probability is $\Pr[X \oplus Y = 1] = \frac{1}{2} + \varepsilon$.

## display math (centered)

$$
\sum_{i=0}^{n} x_i = \frac{n(n+1)}{2}
$$

## math block with styling

<div class="math-block">
\[ \Pr[X = 1] = \frac{1}{2} + \epsilon \]
</div>
```

### Adding Videos in Posts

```markdown
## local video
<div class="video-container">
  <video controls>
    <source src="{{ '/assets/videos/clip.mp4' | relative_url }}" type="video/mp4">
  </video>
</div>

## youtube embed
<div class="video-container">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
</div>
```

### Available Tags for Filtering

- `Vlog` - personal diary entries
- `Math` - math notes and proofs
- `Notes` - quick thoughts
- `Travel` - travel related
- `Crypto` - cryptography related

---

## 📷 PHOTOGRAPHY

Location: `static/photography.html`

### Single Photo with Description

```html
<article class="photo-entry">
    <div class="photo-frame">
        <img src="../assets/pictures/YOUR_IMAGE.jpg" alt="Description">
    </div>
    <div class="photo-details">
        <div class="photo-title">Photo Title</div>
        <div class="photo-meta">Location · Date · Camera</div>
        <p class="photo-note">Your description or story about the photo.</p>
        <div class="photo-tags">
            <span class="photo-tag">tag1</span>
            <span class="photo-tag">tag2</span>
        </div>
    </div>
</article>
```

### Video Entry

```html
<article class="photo-entry">
    <div class="photo-frame">
        <video controls preload="metadata">
            <source src="../assets/videos/YOUR_VIDEO.mp4" type="video/mp4">
        </video>
    </div>
    <div class="photo-details">
        <div class="photo-title">Video Title</div>
        <div class="photo-meta">Location · Date · Device</div>
        <p class="photo-note">Description of the video.</p>
        <div class="photo-tags">
            <span class="photo-tag">video</span>
            <span class="photo-tag">tag2</span>
        </div>
    </div>
</article>
```

### Photo Gallery (Grid of Multiple Photos)

```html
<h2 style="color: var(--icon-accent); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; margin: 30px 0 16px;">Gallery: Trip Name</h2>
<div class="photo-gallery">
    <div class="gallery-item">
        <img src="../assets/pictures/photo1.jpg" alt="Description">
        <div class="gallery-item-info">
            <div class="gallery-item-title">Photo Title</div>
            <div class="gallery-item-meta">Location · Date</div>
        </div>
    </div>
    <div class="gallery-item">
        <img src="../assets/pictures/photo2.jpg" alt="Description">
        <div class="gallery-item-info">
            <div class="gallery-item-title">Photo Title</div>
            <div class="gallery-item-meta">Location · Date</div>
        </div>
    </div>
    <!-- Add more gallery-item blocks -->
</div>
```

---

## 🎬 INTERESTS (Anime, Movies, Books, Links)

Location: `static/interests.html`

### Media Item with External Link (IMDB/MAL)

```html
<div class="media-item">
    <div class="media-thumb">
        <img src="../assets/pictures/cover.jpg" alt="Title">
    </div>
    <div class="media-details">
        <div class="media-title">
            Frieren: Beyond Journey's End
            <a href="https://myanimelist.net/anime/52991" target="_blank" class="external-link" title="MAL">↗</a>
        </div>
        <div class="media-note">Episode 10 · slow, thoughtful pace</div>
    </div>
</div>
```

### Media Entry (Watched List)

```html
<div class="media-entry">
    <div class="status-row">
        <span class="status-pill filled type-movie">Movie</span>
        <span class="status-pill filled">Finished</span>
    </div>
    <p class="media-title">
        The Boy and the Heron
        <a href="https://www.imdb.com/title/tt6587046/" target="_blank" class="external-link" title="IMDB">↗</a>
    </p>
    <p class="media-note">Dreamlike visuals, quiet themes. 8/10.</p>
</div>
```

### Useful Links with Descriptions

```html
<ul class="link-list collapsed" id="links-list">
    <li>
        <a href="https://myanimelist.net/profile/username" target="_blank">MyAnimeList</a>
        <span class="link-desc">Anime tracking and ratings</span>
    </li>
    <li>
        <a href="https://letterboxd.com/username" target="_blank">Letterboxd</a>
        <span class="link-desc">Movie diary and reviews</span>
    </li>
    <!-- Add more links... -->
</ul>
<button class="view-more-btn" data-target="links-list" data-collapsed="true">read more</button>
```

### View More Toggle

For lists with many items, wrap in a div with `collapsed` class and add button:

```html
<!-- Shows first 3 items, hides rest -->
<div class="media-list collapsed" id="watching-list">
    <!-- items here -->
</div>
<button class="view-more-btn" data-target="watching-list" data-collapsed="true">view more</button>
```

- `media-list collapsed` → shows top 3
- `watched-list collapsed` → shows top 5
- `link-list collapsed` → shows top 7

---

## 📁 FILE LOCATIONS

```
assets/
├── images/          # Profile photos, favicons
├── pictures/        # Photography, thumbnails
├── videos/          # Video clips
├── audio/           # Audio files
└── docs/            # PDFs, documents
```

---

## 🚫 HIDING A PAGE

Add to `_config.yml`:

```yaml
exclude:
  - static/contact.html
  - static/about.html
```

Or add front matter to the file:

```html
---
published: false
---
```

---

## 💡 TIPS

1. **Images**: Always use `alt` text for accessibility
2. **Videos**: Use `preload="metadata"` to load only video info initially
3. **Tags**: Keep them consistent for filtering to work
4. **Paths**: Use `../assets/` for pages in `/static/` folder
5. **Dates**: Posts are sorted by date (newest first)
6. **Lightbox**: All images in Photography and Blog posts are clickable - opens full size popup (press Escape or click outside to close)
