<img src="ressources/tinyclerk-banner.svg" width="100%" />

<br>

<div align="center">

[![Build Status][github-actions-status]][github-actions-url]
[![Github Tag][github-tag-image]][github-tag-url]

</div>

### Install

Either
- Get the latest [release](https://github.com/crowbait/crowbait-helper/releases)
Or
- Clone the repo and install dependencies:
```bash
git clone https://github.com/crowbait/crowbait-helper.git tinyclerk
cd tinyclerk
npm install
npx patch-package
```

### Build

- Build with npm: `npm run package`
  - Output will be in tinyclerk/release/build
  - By default, the script builds for your system

### Starting Development

Start the app in the `dev` environment: `npm start`


[github-actions-status]: https://github.com/crowbait/tinyclerk/workflows/Test/badge.svg
[github-actions-url]: https://github.com/crowbait/tinyclerk/actions
[github-tag-image]: https://img.shields.io/github/v/release/crowbait/tinyclerk?display_name=tag
[github-tag-url]: https://github.com/crowbait/tinyclerk/releases/latest




