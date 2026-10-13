# Huy Gia Ngo — academic homepage

This GitHub Pages site keeps the vendored Minimal Light theme, its original license, and attribution in this README. The original theme documentation follows below.

## Updating your homepage

| Content | File | How to update |
| --- | --- | --- |
| Name, position, affiliation, email, social links, portrait | `_config.yml` | Fill in the real values. Empty Scholar/CV links leave visible non-clickable icons; other empty links are hidden. `avatar` takes a local asset path; add descriptive `avatar_alt` text. |
| Biography and research interests | `index.md` | Edit Markdown; inline links are supported. |
| Education | `_data/education.yml` | Add entries with `name`, `role`, `location`, `dates`, optional `url`, `logo`, and `details`. |
| Industry experience | `_data/experience.yml` | Group consecutive periods under a company using a `positions` list, newest first. Each position has `role`, `location`, `dates`, and optional `details`. These render with a vertical connector. Flat entries still work. |
| News | `_data/news.yml` | Replace `[]` with dated entries. Dates are quoted ISO strings; rendering sorts newest first. |
| Publications | `_data/publications.yml` | Add verified papers under `main:`. The two current papers include owner-supplied PDFs, actual paper figures, publisher links, and local BibTeX files. |

Education and experience share `_includes/career-list.html`. Logos fit a shared 48×28px slot without distortion, leaving room for the wide Viettel wordmark. The supplied transparent logos are stored unchanged in `assets/img/logos/uit.png` and `assets/img/logos/viettel.png`; set logo paths in the corresponding YAML files. An empty logo field renders a clearly marked TODO. `details` is a YAML list of short Markdown strings, for example responsibilities or academic details you have verified.

To add a news entry, replace the empty list in `_data/news.yml` with:

```yaml
- date: "YYYY-MM-DD" # Replace with the real date before building.
  text: "Your verified update, optionally with a [link](https://example.com)."
```

Publications retain the original Minimal Light keys: `title`, `authors`, `conference`, `conference_short`, `image`, `pdf`, `code`, `page`, `bibtex`, `notes`, and `others`. The additional `publisher` field links to the official chapter and takes priority as the paper-title link. Optional `year` can be supplied separately if it is not already in `conference`; `image_alt` describes a thumbnail. Authors and conference fields still accept trusted HTML (such as `<strong>` for your name). Papers without thumbnails use the full text width, and titles without PDF/project URLs render as plain text. Use real URLs or paths to files you have added. Do not uncomment or restore the starter's example papers as your own.

## Local preview and build

```sh
bundle exec jekyll build
bundle exec jekyll serve
```

On this Windows machine, Ruby 3.3 is installed but may need to be added to the current PowerShell session's PATH:

```powershell
$env:PATH = 'C:\Ruby33-x64\bin;' + $env:PATH
bundle exec jekyll build
bundle exec jekyll serve
```

Restart an already running Jekyll server after editing `_config.yml`; Jekyll does not reload configuration automatically. No gems were upgraded. The existing local `Gemfile` changes were preserved. GitHub Pages can build the vendored theme without a remote-theme dependency. The user-site URL is `https://githuyngo.github.io/`, with an empty `baseurl`. The blank starter `CNAME` and demo CV, avatar, publication thumbnails, and precompiled HTML demo are excluded from generated output. If you later add a custom domain, update `url`/`canonical`, replace `CNAME`, and remove it from `exclude`.

## Manual light/dark mode

The circular moon/sun button stays fixed in the top-right corner. Light mode uses a navy (`#043361`) background with a white moon; dark mode uses a soft silver (`#E6EDF3`) background with a navy sun. The moon offers dark mode and the sun offers light mode. The theme changes immediately while an 800ms animation sets the outgoing icon and raises the incoming one along curved paths inside the button. Repeated clicks reverse from the current position. Reduced-motion preferences skip the animation, and hidden tabs or cross-tab theme changes settle the icon to the selected theme. Dark mode uses the supplied charcoal swatch (`#0D1117`) as its page background. Light is the default for a first visit; the browser remembers an explicit choice in `localStorage` under `homepage-theme`. The initial preference is applied by `assets/js/theme.js` before styles load. Keyboard activation, storage-disabled browsers, and preference changes in another tab are supported. If JavaScript is disabled, the page stays light and hides the inactive button.

The page uses the light base stylesheet plus the color variables and button styles in `_sass/themes.scss`. The corner control is in `_includes/theme-control.html`. Both palettes cover the sidebar, publications, buttons, metadata, timeline, and footer. Brand logos use their original transparent artwork in both modes without a backing, and the contribution calendar's colors adapt without changing its data. The `favicon`/`favicon_dark` assets follow the selected mode when configured. The original `favicon.png` and `favicon-dark.png` are wrapped by self-contained circular SVG icons (`favicon-round.svg` and `favicon-dark-round.svg`) with transparent corners. After replacing the PNG originals, run `python scripts/build-favicons.py` to regenerate the round versions. A build timestamp on the icon URLs avoids stale browser caches after replacing them. Restart Jekyll after changing `_config.yml`.

## Automatic footer and GitHub activity

The footer replaces the theme credit with `Last updated: Month Year`. No date is hardcoded: `assets/js/site-details.js` reads the committer timestamp through GitHub's public commits API. On GitHub Pages, `site.github.build_revision` pins the date to the deployed commit; local previews query the latest pushed commit (`HEAD`). The timestamp is formatted in the Asia/Ho_Chi_Minh timezone. Saving files locally or making an unpushed commit does not change the displayed date. If JavaScript is disabled or GitHub is unavailable/rate-limited, the footer provides a commit-history link instead of an invented date. Set `repository` and `show_last_updated` in `_config.yml` to configure this feature.

A compact GitHub contribution calendar appears beneath the sidebar's social icons. It uses [GitHub Chart API](https://github.com/2016rshah/githubchart-api) with the theme's navy color, preserves readable square sizes, and scrolls horizontally through the past year, initially showing the latest months. Configure `github_username` and `show_github_contributions` in `_config.yml`. The calendar updates through the hosted chart service; if the image cannot load, its caption still links to the GitHub profile. No access tokens or additional gems are needed.

Theme credit remains in this README and the original `LICENSE` is retained.

## Design and remaining content

The system sans-serif stack follows [Jiazhen Liu's site](https://jiazhen-code.github.io/about.me/): its body declares 18px, but the visible wrapper computes to 16px/24px. This site reproduces that effective content size in `_sass/academic.scss` while retaining Minimal Light's 960px wrapper, 232px fixed desktop sidebar, 650px content column, navy headings, and mobile stacking. [Kien T. Pham's site](https://tkpham3105.github.io/) inspired the compact logo/text alignment, without copying personal content. Light mode is the default, including when the device prefers dark mode. The moon/sun button in the top-right corner lets visitors choose dark mode explicitly.

TODOs requiring real information:

- Optional favicon and a real CV file/path. The portrait, email, Scholar, and LinkedIn are configured; the CV icon remains visible while its URL is empty.
- Optional Viettel Networks Corporation website URL.
- Optional concise internship responsibilities and academic details.
- Verified news when available, plus any future publications and optional code/project links.
- Optional laboratory, supervisor, or project links in the biography.

## Files changed for this customization

Modified files:

- `_config.yml`, `index.md`, and `README.md`: real profile/content, deployment settings, and maintenance instructions.
- `_layouts/homepage.html`: semantic main content, accessible social links, optional real assets, and clean metadata.
- `_data/publications.yml`, `_includes/publications.md`, and `_includes/services.md`: remove demo claims, retain publication rendering, and add an honest empty state.
- `_sass/minimal-light.scss` and `_sass/minimal-light-no-dark-mode.scss`: apply the existing content geometry to the semantic `main` element.
- `assets/css/font_sans_serif.css`, `assets/css/style.scss`, and `assets/css/style-no-dark-mode.scss`: reference typography and shared component styles.
- `assets/css/publications.css` and `assets/css/publications-no-dark-mode.css`: restrained, responsive publication rows.

New files:

- `_data/education.yml`, `_data/experience.yml`, and `_data/news.yml`: maintainable content sources.
- `_includes/career-list.html` and `_includes/news.html`: shared career entries and reverse-chronological news.
- `_sass/academic.scss`: compact additions for typography, career entries, sidebar spacing, and keyboard focus.

The current publication assets are `assets/files/soict2025.pdf`, `assets/files/vbs2026.pdf`, `assets/files/fusurge.bib`, `assets/files/fusionista2.bib`, and the corresponding figure crops in `assets/img/publications/`. PDF files are unchanged copies of the supplied manuscripts. Titles, author order, and citations follow Springer/Crossref. The publisher lists Fusurge as SOICT 2025, first online September 2, 2026, with a 2027 print/citation year; the page retains the venue label and its BibTeX uses 2027. Fusionista2.0's published record lists 12 authors, while the supplied manuscript includes an additional author. The BibTeX uses the published author list.

The displayed venue lines are **Information and Communication Technology (SOICT), 2025** and **Video Browser Showdown (VBS) at MMM, 2026**, with **SOICT** and **VBS** badges. The [official MMM accepted-paper list](https://mmm2026.cz/acceptedPapers.html) categorizes Fusionista2.0 as VBS #412, and the [VBS papers list](https://videobrowsershowdown.org/teams/) includes it under VBS2026. Its BibTeX retains the official book title, *MultiMedia Modeling*, because the VBS contribution is published in those proceedings.

Publication badges use `conference_short` for a short venue or track name without a year: the current papers use `SOICT` and `VBS`. Put the venue name and acronym in `conference`, and set the event year separately in `year`; the renderer adds the comma before the year. For future workshop papers, suggested badge labels are `SemEval`, `CVPRW`, and `ACM MM WS`; a recognized workshop acronym can be used instead. Include the actual workshop name and host conference in the full venue line. Contribution-type labels are optional. These are display conventions, not changes to the official bibliographic metadata.

`_includes/career-position.html` is the shared role/metadata renderer for flat entries and grouped positions. To add another period at Viettel, add it to that company's `positions` list in `_data/experience.yml` rather than duplicating the company. The timeline joins only periods explicitly grouped together.

The pre-existing changes to `Gemfile` were preserved without modification. No changes were pushed or merged.

---

# The Minimal Light Theme

[![LICENSE](https://img.shields.io/github/license/yaoyao-liu/minimal-light?style=flat-square&logo=creative-commons&color=EF9421)](https://github.com/yaoyao-liu/minimal-light/blob/main/LICENSE)

\[[Demo the theme](https://minimal-light-theme.yliu.me/)\]  \[[简体中文](https://github.com/yaoyao-liu/minimal-light/blob/master/README_zh_Hans.md) | [繁體中文](https://github.com/yaoyao-liu/minimal-light/blob/master/README_zh_Hant.md) | [Deutsche](https://github.com/yaoyao-liu/minimal-light/blob/master/README_de.md)\]
 
*This is the source code of my homepage. I build this website based on [minimal](https://github.com/orderedlist/minimal).*
<br>
*Feel free to use and share the source code anywhere you like.*

An improved vision from [@Xiao-Chenguang](https://github.com/Xiao-Chenguang): [[link](https://github.com/Xiao-Chenguang/minimal-light)]

**The latest version of my homepage is available here: <br><https://github.com/yaoyao-liu/yaoyaoliu-homepage>**

## Features

- Simple and elegant personal homepage theme
- Jekyll theme, automatically deployed by GitHub Pages
- Basic search engine optimization
- Mobile friendly
- Supporting Markdown 
- Supporting dark mode

## Project Architecture

```
.
├── _data                    
|   └── publications.yml                      # the YAML file for publications
├── _includes                    
|   ├── publications.md                       # the Markdown file for publications
|   └── services.md                           # the Markdown file for services
├── _layouts                  
|   └── homepage.html                         #  the html template for the homepage 
├── _sass
|   ├── minimal-light.scss                    #  this file will be compiled into a CSS file to control the style of the page              
|   └── minimal-light-no-dark-mode.scss       #  this file is similar to minimal-light.scss with the dark mode disabled
├── assets                                    #  some files
├── html_source_file                          #  compiled HTML files
├── .gitignore                                #  this file specifies intentionally untracked files that Git should ignore
├── CNAME                                     #  the custom domain, will be used by GitHub page sevice
├── Gemfile                                   #  a RubyGems related file
├── LICENSE                                   #  the license file
├── README.md                                 #  the readme file (English)
├── README_de.md                              #  the readme file (German)
├── README_zh_Hans.md                         #  the readme file (Simplified Chinese)
├── README_zh_Hant.md                         #  the readme file (Traditional Chinese)
├── _config.yml                               #  the Jekyll configuration file, including some options of the page  
└── index.md                                  #  the content of the index page, using Markdown
```

## Getting Started

This template can be used in the following two ways: 
- **Using with the GitHub Pages Service.** GitHub will provide you with a server to generate and host web pages.
- **Using locally with Jekyll.** You may install Jekyll on your own computer and generate static web pages (i.e., HTML files) with this template. After that, you may upload the HTML files to your server.

The detailed instructions are available below.


### Using with the GitHub Pages Service

There are two ways to use this template on GitHub:

#### Fork this repository
- Fork this repository (or [use this repository as a template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template)) and change the name to `your-username.github.io`.

- Enable the GitHub pages for that repository following the steps [here](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#creating-your-site).

#### Using this repository as a remote theme
To use this theme, add the following to your repository's `_config.yml`:

```yaml
remote_theme: yaoyao-liu/minimal-light
```

Please note that adding the above line will directly apply all the default settings in this repository to yours.

If you hope to edit any files (e.g., `index.md`), you still need to copy them to your repository.

### Using Locally with Jekyll

First, install [Ruby](https://www.ruby-lang.org/en/) and [Jekyll](https://jekyllrb.com/). The install instructions can be found here: <https://jekyllrb.com/docs/installation/#guides>

Then, clone this repository:

```bash
git clone https://github.com/yaoyao-liu/minimal-light.git
cd minimal-light
```
Install and run:

```bash
bundle install
bundle add webrick
bundle exec jekyll server
```
View the live page using `localhost`:
<http://localhost:4000>. You can get the HTML files in `_site` folder.

### Using the HTML version

The compiled HTML files are available in the `html_source_file` folder. If you don't like Jekyll, you may directly edit and use the HTML version.

## Customizing

### Configuration variables

The Minimal Light theme will respect the following variables, if set in your site's `_config.yml`:

  ```yaml
# Basic Information 
title: Your Name
position: Ph.D. Student
affiliation: Your Affiliation
email: yourname (at) example.edu

# Search Engine Optimization (SEO)
# The following information is used to improve the website traffic from search engines, e.g., Google.
keywords: minimal light
description: The Minimal Light is a simple and elegant jekyll theme for academic personal homepage.
canonical: https://minimal-light-theme.yliu.me/

# Links 
# If you don't need one of them, you may delete the corresponding line.
google_scholar: https://scholar.google.com/
cv_link: assets/files/curriculum_vitae.pdf
github_link: https://github.com/
linkedin: https://www.linkedin.com/
twitter: https://twitter.com/

# Images (e.g., your profile picture and your website's favicon) 
# "favicon" and "favicon_dark" are used for the light and dark modes, respectively. 
avatar: ./assets/img/avatar.png
favicon: ./assets/img/favicon.png
favicon_dark: ./assets/img/favicon-dark.png

# Footnote
# You may use the option to disable the footnote, "Powered by Jekyll and Minimal Light theme."
enable_footnote: true

# Auto Dark Mode
# You may use the option to disable the automatic dark theme
auto_dark_mode: true

# Font
# You can use this option to choose between Serif or Sans Serif fonts.
font: "Serif" # or "Sans Serif"

# Google Analytics ID
# Please remove this if you don't use Google Analytics
google_analytics: UA-111540567-4
  ```
### Edit `index.md`

Create `index.md` and add your personal information. It supports **Markdown** and **HTML** syntax.

### Edit included files

There are two markdown files included in `index.md`. They are `_includes/publications.md` and `_includes/service.md`, respectively. These two files also support **Markdown** and **HTML** syntax. If you don't hope to include these two files, you may remove the following lines in `index.md`:
https://github.com/yaoyao-liu/minimal-light/blob/b38070cd0b6bce45d8a885f3828549af8f82b7cb/index.md?plain=1#L21-L23

If you hope to edit the publication list without changing the format, you may edit `_data/publications.yml`:
https://github.com/yaoyao-liu/minimal-light/blob/77b1b3b31d4561091bcd739f37a2e1880e8b5ca5/_data/publications.yml#L3-L11


### Stylesheet

If you'd like to add your own custom styles, you may edit `_sass/minimal-light.scss`.

### Layouts

If you'd like to change the theme's HTML layout, you may edit `_layout/homepage.html`.

## License

This work is licensed under a [Creative Commons Zero v1.0 Universal](https://github.com/yaoyao-liu/minimal-light/blob/master/LICENSE) License.

## Acknowledgements

Our project uses the source code from the following repositories:

* [pages-themes/minimal](https://github.com/pages-themes/minimal)

* [orderedlist/minimal](https://github.com/orderedlist/minimal)

* [al-folio](https://github.com/alshedivat/al-folio)
