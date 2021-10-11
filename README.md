<h1 align="center">
    <a href="https://twitter.com" target="_blank" rel="noreferrer">
        @ziyadedher
    </a>'s WebDev Template
</h1>
<h3 align="center">
    (TypeScript + Next.js + TailwindCSS + other goodies)
</h3>
<br />

<p align="center">
    <a href="https://vercel.com/ziyadedher/webdev-template">
        <img alt="Vercel deployment" src="https://img.shields.io/github/deployments/ziyadedher/webdev-template/production?label=vercel&logo=vercel">
    </a>
    <a href="https://codecov.io/gh/ziyadedher/webdev-template">
        <img alt="Codecov Percentage" src="https://codecov.io/gh/ziyadedher/webdev-template/branch/main/graph/badge.svg?token=LCRTOFTXS8"/>
    </a>
    <a href="https://app.renovatebot.com/dashboard#github/ziyadedher/webdev-template">
        <img alt="Renovate Badge" src="https://img.shields.io/badge/renovate-enabled-dark_green?logo=renovatebot"/>
    </a>
    <a href="https://www.chromatic.com/builds?appId=61526631cca20a004ab84023">
        <img alt="Storybook Badge" src="https://raw.githubusercontent.com/storybookjs/brand/master/badge/badge-storybook.svg"/>
    </a>
</p>

<p align="center">
    <a href="https://github.com/ziyadedher/webdev-template/actions/workflows/jest-and-codecov.yaml">
        <img alt="Jest and Codecov Status" src="https://github.com/ziyadedher/webdev-template/actions/workflows/jest-and-codecov.yaml/badge.svg" />
    </a>
    <a href="https://github.com/ziyadedher/webdev-template/actions/workflows/eslint.yaml">
        <img alt="Eslint Status" src="https://github.com/ziyadedher/webdev-template/actions/workflows/eslint.yaml/badge.svg" />
    </a>
    <a href="https://github.com/ziyadedher/webdev-template/actions/workflows/chromatic.yaml">
        <img alt="Chromatic (for Storybook) Status" src="https://github.com/ziyadedher/webdev-template/actions/workflows/chromatic.yaml/badge.svg" />
    </a>
</p>

<p align="center">
    <a href="https://github.com/ziyadedher/webdev-template/blob/main/LICENSE.md">
        <img alt="License Badge" src="https://img.shields.io/github/license/ziyadedher/webdev-template"/>
    </a>    
</p>

---

[@ziyadedher](https://twitter.com/ziyadedher)'s production-ready WebDev template makes it effortless to go from zero to one on your web-based application. Built with modern and well-supported frameworks, the template is ready for immediate execution and collaboration so that you can focus on what really matters – building something cool.

In addition to being completely ready for production use, the template can serve as a basis for structuring and configuring a modern web-app. To ensure common code style in-line with the ethos of the template, [Ziyad's strict custom ESLint config](https://github.com/ziyadedher/eslint-config) is rolled in.

To get started follow the instructions in [Get Started](#get-started). For details about exactly what's in this repository see [Details for Nerds](#details-for-nerds).

## Get Started
If you haven't already, first learn about React and Next.js. That's kinda a prerequisite to figuring out what's going on here. If you're interested in more technical details (which you should be if you're using this template!) check out [Details for Nerds](#details-for-nerds) below.

## Details for Nerds
_How does this work?_ _What is all this code?_ _How do I do cherry-pick some stuff I like for my own projects?_

Great questions! This section will help you answer them.

### Tech Stack
This WebDev template is fundementally based on Next.js (w/ React), that's what basically everything else revolves around. But there are a _lot_ of other goodies involved, which we'll talk about below (organized roughly by function).

#### Application Development
- [TailwindCSS](https://tailwindcss.com/) — utility-first CSS framework. Lots of great composable classes. You probably won't need a single line of custom CSS when using TailwindCSS.
- [Headless UI](https://headlessui.dev) — unstyled basic UI components, built to integrate with TailwindCSS.

#### Application Framework
- [React](https://reactjs.org/) — trusty React. Front-end framework that helps in building declarative, component-based user interfaces. One of the things React does is let us get rid of HTML files in favour of JSX.
- [Next.js](https://nextjs.org/) — modern development framework built on top of React. Makes it a lot quicker to build your actual web application. Their website has a great tutorial!
#### Testing and Coverage
- [Jest](https://jestjs.io/) — simple Javascript testing framework. We include a compatibility layer ([ts-jest](https://github.com/kulshekhar/ts-jest)) so we can use Jest with TypeScript more easily.
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) — light-weight user-centric React component testing library.
- [Codecov](https://about.codecov.io/) — code coverage framework and host. This comes with a neat dashboard and GitHub integration.
- [Storybook](https://storybook.js.org) — UI component explorer. Use this to prototype and build components and pages in isolation.
#### Linting and Formatting
- [ESLint](https://eslint.org/) — linter used commonly for finding and fixing issues in code statically, including code style issues.
- [Ziyad's ESLint config](https://github.com/ziyadedher/eslint-config) — custom strict ESLint configuration. This makes sure you're following best-practices.
- [Prettier](https://prettier.io/) — code formatter, fixes small code style issues really quickly. Theoretically we might not need this (ESLint could probably do everything here), but they play together nicely.
#### Deployment (and CI/CD)
- [Vercel](https://vercel.com/) — hosting platform for the web app. Built for Next.js and has a really awesome GitHub integration for continuous deployment.
- [Chromatic](https://chromatic.com) — automation provider and hosting platform for Storybook. Lets you review UI changes visually online, as well as share new components really easily through Storybook. Integrates nicely with GitHub.
- [GitHub Actions](https://github.com/features/actions) — GitHub provides runners to run workflows on events, we use it to run our testing, coverage, linting, and storybook workflows.
    - [Jest and Codecov](https://github.com/ziyadedher/webdev-template/actions/workflows/jest-and-codecov.yaml)
    - [ESLint](https://github.com/ziyadedher/webdev-template/actions/workflows/eslint.yaml)
    - [Chromatic (for Storybook)](https://github.com/ziyadedher/webdev-template/actions/workflows/chromatic.yaml)
#### Dependency Management
- [Yarn](https://yarnpkg.com/) — local package manager that also makes sure projects are reproducible.
- [Renovate](https://renovatebot.com) — dependency management bot. Keeps dependencies up-to-date and maintains the lock file.

### Files
All right nerds, buckle up. In this section we're going to talk about every single file in this repository, what the point of it is, and direct you to references to learn more and configure those files if you want to. 

#### Meta
- [README.md](README.md) — this README file! [More info](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes).
- [LICENSE.md](LICENSE.md) — this project's copyright license. [More info](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository).
- [.vscode/](.vscode/) — folder, default configuration and extension recommendation for using VSCode to develop using this template. [More info](https://code.visualstudio.com/docs/getstarted/settings).

#### Git and GitHub
- [.github/renovate.json](.github/renovate.json) — configuration for Renovate. See [Dependency Management](#dependency-management) above for context. [More info](https://docs.renovatebot.com/configuration-options/).
- [.github/workflows/](.github/workflows/) — folder, all the different workflows that run. See [Deployments (and CI/CD)](#deployments-and-ci-cd) above for context. [More info](https://docs.github.com/en/actions/learn-github-actions).
- [.gitignore](.gitignore) — this file specifies paths that git will ignore when parsing your local repository. [More info](https://git-scm.com/docs/gitignore).
- [.gitattributes](.gitattributes) — this file defines certain attributes for files so that git can understand them better. [More info](https://git-scm.com/docs/gitattributes).

#### TypeScript, Node, Yarn, and NPM
- [tsconfig.json](tsconfig.json) — configuration for TypeScript. [More info](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).
- [package.json](package.json) — NPM manifest file for everything needed to make this package work. [More info](https://docs.npmjs.com/cli/v7/configuring-npm/package-json).
- [.yarnrc.yml](.yarnrc.yml) — configuration for Yarn. [More info](https://yarnpkg.com/configuration/yarnrc.).
- [yarn.lock](yarn.lock) — exact information about dependencies maintained by Yarn. [More info (for an older version of Yarn, but still applicable)](https://classic.yarnpkg.com/en/docs/yarn-lock/).
- [.yarn/](.yarn/) — folder, more data that makes builds very reproducible and quick, maintained by Yarn.
- [.pnp.cjs](.pnp.cjs) — Plug'n'Play file that makes builds even more quick and reproducible, managed by Yarn. [More info](https://yarnpkg.com/features/pnp.).
#### Next.js and Friends
- [next.config.js](next.config.js) — configuration file for Next.js. [More info](https://nextjs.org/docs/api-reference/next.config.js/introduction).
- [next-env.d.ts](next-env.d.ts) — ensures type definitions for Next.js are picked up by the TypeScript compiler. [More info](https://nextjs.org/docs/basic-features/typescript).
- [src/](src/) — folder, application source code! Includes Next.js pages directory. [More info](https://nextjs.org/docs/advanced-features/src-directory).
#### TailwindCSS and Friends
- [tailwind.config.js](tailwind.config.js) — TailwindCSS configuration. [More info](https://tailwindcss.com/docs/configuration).
- [postcss.config.js](postcss.config.js) — PostCSS configuration, this is required to make TailwindCSS work. [More info](https://tailwindcss.com/docs/installation#add-tailwind-as-a-post-css-plugin).

#### Storybook and Friends
- [.storybook/main.js](.storybook/main.js) — Storybook configuration file. [More info](https://storybook.js.org/docs/react/configure/overview).
- [.storybook/preview.js](.storybook/preview.js) — Storybook preview and rending configuration (this injects TailwindCSS into Storybook). [More info](https://storybook.js.org/docs/react/configure/overview).
- [stories/](stories/) — folder, contains Storybook stories! [More info](https://storybook.js.org/docs/react/get-started/whats-a-story).

#### Jest and Codecov
- [jest.config.js](jest.config.js) — Jest configuration file. [More info](https://jestjs.io/docs/configuration).
- [tsconfig.jest.json](tsconfig.jest.json) — Jest doesn't play very nicely with TypeScript, this helps it work. [More info](https://github.com/vercel/next.js/issues/8663).
- [tests/](tests/) — folder, contains all tests! [More info](https://jestjs.io/docs/getting-started).

#### ESLint and Prettier
- [.eslintrc.js](.eslintrc.js) — ESLint configuration. Note that most of the leg work is done in [Ziyad's ESLint config](https://github.com/ziyadedher/eslint-config). [More info](https://eslint.org/docs/user-guide/configuring/).
- [.prettier.config.js](.prettier.config.js) — Prettier configuration file. [More info](https://prettier.io/docs/en/configuration.html).