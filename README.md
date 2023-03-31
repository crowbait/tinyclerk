<img src="ressources/tinyclerk-banner.svg" width="100%" />

<br>

<div align="center">

[![Build Status][github-actions-status]][github-actions-url]
[![Github Tag][github-tag-image]][github-tag-url]

</div>

# tinyClerk
#### A beautiful and simple cross-platform app for your personal accounting and budgeting



## Install

Either
- Get the latest [release](https://github.com/crowbait/tinyclerk/releases)
  * **Note**: since no macOS-device is available for testing, Mac-builds are not supported or tested and might or might not work.

Or
- Clone the repo and install dependencies:
```bash
git clone https://github.com/crowbait/tinyclerk.git tinyclerk
cd tinyclerk
npm install
npm run prepare
npx patch-package
```

## Build

- `npm run package`
  - Output will be in ./release/build
  - By default, the script builds for your system
  - If you're trying to build Linux on Windows, [see here](https://github.com/electron-userland/electron-build-service/issues/9#issuecomment-704069238)

  * **Note**: since no macOS-device is available for testing or configuration, Mac-builds are not supported or tested and might or might not work.

## Starting Development

Start the app in the `dev` environment: `npm start`


[github-actions-status]: https://github.com/crowbait/tinyclerk/workflows/Test/badge.svg
[github-actions-url]: https://github.com/crowbait/tinyclerk/actions
[github-tag-image]: https://img.shields.io/github/v/release/crowbait/tinyclerk?display_name=tag
[github-tag-url]: https://github.com/crowbait/tinyclerk/releases/latest
