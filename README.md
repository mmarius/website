# Marius Mosbach’s website

## Local development

Run `npm install` once, then `npm start` to preview at <http://localhost:8080> with live reload.
Run `npm run build` to generate the production site in `_site/`.

## About page translations

- `content/index.njk` serves English at `/`; `content/de.njk` serves German at `/de/`.
- `_includes/about.njk` shares the portrait, contact links, and English news feed.
- Edit biography and research text in `_includes/about-en.njk` and `_includes/about-de.njk`.
- `_includes/language-switch.njk` provides the EN/DE control. Pages with `isAbout: true` enable it; other pages show a disabled control with the same dimensions.

## Publishing this website

The public site at <https://mariusmosbach.com> is served by Netlify (verified from its HTTP response headers).
`netlify.toml` specifies Node.js 22, build command `npm run build`, and publish directory `_site`.

This checkout has two Git remotes:

- `website`: `git@github.com:mmarius/website.git` (local `main` tracks `website/main`).
- `origin`: `git@github.com:mmarius/eleventy-base-blog.git`.

Netlify project `mariusmosbach` is connected to `mmarius/website`, confirmed by the automatic deploy-preview checks on PR #1. Changes are proposed against `main`. Production deployment settings are available in Netlify under **Build & deploy → Continuous deployment**.

Publishing workflow:

1. Run `npm run build` and review the local preview.
2. Commit the source changes on the working branch. Do not commit `_site/` or `node_modules/`.
3. Push the working branch to the `website` remote, for example `git push -u website new-design`.
4. Open a pull request targeting `main` and review the automatic Netlify deploy preview.
5. Merge when ready to publish. With automatic Git deploys enabled, Netlify builds and publishes the production branch.
6. Check the production deploy in Netlify, then verify both `/` and `/de/` on the public domain.

The `new-design` branch also contains the earlier design/content refresh, so publishing it includes that work as well as the language changes. The GitHub Pages workflow below is only a `.sample` file and is not an active deployment workflow.

---

## Original starter documentation

# eleventy-base-blog v9

A starter repository showing how to build a blog with the [Eleventy](https://www.11ty.dev/) site generator (using the [v3.0 release](https://github.com/11ty/eleventy/releases/tag/v3.0.0)).

## Getting Started

* [Want a more generic/detailed getting started guide?](https://www.11ty.dev/docs/getting-started/)

1. Make a directory and navigate to it:

```
mkdir my-blog-name
cd my-blog-name
```

2. Clone this Repository

```
git clone https://github.com/11ty/eleventy-base-blog.git .
```

_Optional:_ Review `eleventy.config.js` and `_data/metadata.js` to configure the site’s options and data.

3. Install dependencies

```
npm install
```

4. Run Eleventy

Generate a production-ready build to the `_site` folder:

```
npx @11ty/eleventy
```

Or build and host on a local development server:

```
npx @11ty/eleventy --serve
```

Or you can run [debug mode](https://www.11ty.dev/docs/debugging/) to see all the internals.

## Features

- Using [Eleventy v3](https://github.com/11ty/eleventy/releases/tag/v3.0.0) with zero-JavaScript output.
	- Content is exclusively pre-rendered (this is a static site).
	- Can easily [deploy to a subfolder without changing any content](https://www.11ty.dev/docs/plugins/html-base/)
	- All URLs are decoupled from the content’s location on the file system.
	- Configure templates via the [Eleventy Data Cascade](https://www.11ty.dev/docs/data-cascade/)
- **Performance focused**: four-hundos Lighthouse score out of the box!
	- _0 Cumulative Layout Shift_
	- _0ms Total Blocking Time_
- Local development live reload provided by [Eleventy Dev Server](https://www.11ty.dev/docs/dev-server/).
- Content-driven [navigation menu](https://www.11ty.dev/docs/plugins/navigation/)
- Fully automated [Image optimization](https://www.11ty.dev/docs/plugins/image/)
	- Zero-JavaScript output.
	- Support for modern image formats automatically (e.g. AVIF and WebP)
	- Processes images on-request during `--serve` for speedy local builds.
	- Prefers `<img>` markup if possible (single image format) but switches automatically to `<picture>` for multiple image formats.
	- Automated `<picture>` syntax markup with `srcset` and optional `sizes`
	- Includes `width`/`height` attributes to avoid [content layout shift](https://web.dev/cls/).
	- Includes `loading="lazy"` for native lazy loading without JavaScript.
	- Includes [`decoding="async"`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding)
	- Images can be co-located with blog post files.
- Per page CSS bundles [via `eleventy-plugin-bundle`](https://github.com/11ty/eleventy-plugin-bundle).
- Built-in [syntax highlighter](https://www.11ty.dev/docs/plugins/syntaxhighlight/) (zero-JavaScript output).
- Draft content: use `draft: true` to mark any template as a draft. Drafts are **only** included during `--serve`/`--watch` and are excluded from full builds. This is driven by the `addPreprocessor` configuration API in `eleventy.config.js`. Schema validator will show an error if non-boolean value is set in data cascade.
- Blog Posts
	- Automated next/previous links
	- Accessible deep links to headings
- Generated Pages
	- Home, Archive, and About pages.
	- [Atom feed included (with easy one-line swap to use RSS or JSON](https://www.11ty.dev/docs/plugins/rss/)
	- `sitemap.xml`
	- Zero-maintenance tag pages ([View on the Demo](https://eleventy-base-blog.netlify.app/tags/))
	- Content not found (404) page

## Demos

- [Netlify](https://eleventy-base-blog.netlify.app/)
- [Vercel](https://demo-base-blog.11ty.dev/)
- [Cloudflare Pages](https://eleventy-base-blog-d2a.pages.dev/)
- [Remix on Glitch](https://glitch.com/~11ty-eleventy-base-blog)
- [GitHub Pages](https://11ty.github.io/eleventy-base-blog/)

## Deploy this to your own site

Deploy this Eleventy site in just a few clicks on these services:

- Read more about [Deploying an Eleventy project](https://www.11ty.dev/docs/deployment/) to the web.
- [Deploy this to **Netlify**](https://app.netlify.com/start/deploy?repository=https://github.com/11ty/eleventy-base-blog)
- [Deploy this to **Vercel**](https://vercel.com/import/project?template=11ty%2Feleventy-base-blog)
- Look in `.github/workflows/gh-pages.yml.sample` for information on Deploying to **GitHub Pages**.
- [Try it out on **Stackblitz**](https://stackblitz.com/github/11ty/eleventy-base-blog)

### Implementation Notes

- `content/about/index.md` is an example of a content page.
- `content/blog/` has the blog posts but really they can live in any directory. They need only the `posts` tag to be included in the blog posts [collection](https://www.11ty.dev/docs/collections/).
- Use the `eleventyNavigation` key (via the [Eleventy Navigation plugin](https://www.11ty.dev/docs/plugins/navigation/)) in your front matter to add a template to the top level site navigation. This is in use on `content/index.njk` and `content/about/index.md`.
- Content can be in _any template format_ (blog posts needn’t exclusively be markdown, for example). Configure your project’s supported templates in `eleventy.config.js` -> `templateFormats`.
- The `public` folder in your input directory will be copied to the output folder (via `addPassthroughCopy` in the `eleventy.config.js` file). This means `./public/css/*` will live at `./_site/css/*` after your build completes.
- This project uses three [Eleventy Layouts](https://www.11ty.dev/docs/layouts/):
	- `_includes/layouts/base.njk`: the top level HTML structure
	- `_includes/layouts/home.njk`: the home page template (wrapped into `base.njk`)
	- `_includes/layouts/post.njk`: the blog post template (wrapped into `base.njk`)
- `_includes/postslist.njk` is a Nunjucks include and is a reusable component used to display a list of all the posts. `content/index.njk` has an example of how to use it.

#### Content Security Policy

If your site enforces a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (as public-facing sites should), you have a few choices (pick one):

1. In `base.njk`, remove `<style>{% getBundle "css" %}</style>` and uncomment `<link rel="stylesheet" href="{% getBundleFileUrl "css" %}">`
2. Configure the server with the CSP directive `style-src: 'unsafe-inline'` (less secure).
