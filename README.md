# nextjs-accelerator

## Styles

For an example of everything in this section in action, check out the `HomeHero` component.

### BEM

Use BEM styles for all your components

1. Block: the component, your root-class
2. Element: an item in your component. Basically everything is an element - there are no grandchild elements. Each element is related to its block.
3. Modifier: a modifier goes on a block or element to provide variations on the base style

Use mixins to define common styles, generally based on your project style guide. See the HomeHero and HomeArticle components for examples of this implementation. Yes, using mixins throughout the app will create essentially duplicate CSS rules in the production code. However, these resources should be transmitted via gzip compression which should make this duplication negligible.

### Layout Mixins

Instead of providing global classes (`container`, `row`, `col-sm-6`, etc), we define our layouts using mixins within our blocks and elements. This keeps our HTML as semantic and readable as possible. USE THE BREAKPOINT MIXINS - do not use media queries directly.

#### `container()`

Use this to wrap content within a section. This is generally used as the parent to rows. This may be your block/section, or may be the child of the section if you are using the `max-width-section()` mixin.

Bootstrap class equivalent: `container`

#### `make-row()`

Use this to generate a row. Used as children to `container()`, and parent to columns

Bootstrap class equivalent: `row`

#### `make-col-ready()` and `make-col(n)`

Use these to generate a column. `n` is any number between 1 and the number of columns (12). Usually include `make-col-ready()` for all breakpoints, along with the `make-col(12)` for XS+. If you need different column width at larger breakpoints, use `make-col(n)` within the appropriate media query mixin (below).

Bootstrap class equivalents: `col`, `col-12` (1 through 12), and in combination with the breakpoints below, `col-12-sm`.

#### Breakpoints: `media-breakpoint-down(size)`, `media-breakpoint-up(size)`, `media-breakpoint-only(size)`

Use these mixins to generate your breakpoints. DO NOT use media queries directly.

We generate several grid sizes in based on the `$grid-breakpoints` variable - `xs`, `sm`, `md`, `lg`, `xl`. The `px` value in `$grid-breakpoints` is actually the bottom breakpoint for that size. The media-query mixins ensure that there are no overlaps when applying different styles to different viewport widths. For example, media queries that include (max-width: 800) and (min-width: 800) would overlap at exactly 800px. These mixins prevent that.

Think of `media-breakpoint-down(md)` as "md and down", `media-breakpoint-up(md)` as "md and up", and `media-breakpoint-only(md)` as "only md".

This table demonstrates the grid sizes and how the mixins apply to each:

| size variable             | `xs`    | `sm`      | `md`      | `lg`       | `xl`  |
| ------------------------- | ------- | --------- | --------- | ---------- | ----- |
| viewport width            | 0-480.9 | 481-767.9 | 768-991.9 | 992-1247.9 | 1248+ |
| media-breakpoint-down(md) | X       | X         | X         |            |
| media-breakpoint-up(md)   |         |           | X         | X          | X     |
| media-breakpoint-only(md) |         |           | X         |            |

## Images

This accelerator comes with built-in image optimization and lazy-loading. Now for most situations you only need one high-res source image. the Webpack loaders will generate the needed sizes and apply optimizations.

## `<RepositoryImage />`

Use this component to display a JPG or PNG that is stored in the repository. It will generate multiple sizes of the image in both original and Webp formats and generate a `<picture>` tag that browsers will use to select the most appropriate source based on screen size and format support. The `src` must be relative to the components directory: for an image file `components/Hero/hero-img.jpg` pass `src="Hero/hero-img.jpg"`

## `<LazyImage />`

Use this component to lazy-load JPEG and PNG images. It uses `<RepositoryImage />` under the hood. The component will generate a thumbnail to display as a background until the user scrolls within 100px of the image. Note that the output is a `<div />` with an image absolutely positioned inside. Height is provided based on the image aspect ratio.

### Images above the fold

You can also use this image to show the placeholder and fade in the actual image when it loads - without lazy loading the image. Lazy loading requires the React app to rehydrate before it starts the image request. Images above the fold should start loading ASAP. using `<LazyImage lazyLoad={false} />` to load the image file immediately and fade in the image when it loads.

## Fonts

Include any font definitions in `_font-definitions.scss` using the `font-face()` template provided in that file. This will ensure maximum performance for browsers loading the font. This file is included in `master.scss` and loaded on all pages. Store the font files themselves in a `scss/fonts/font-name/` folder

Create font-face definitions in `_variables.scss`, defining fallback fonts to use while the font-face is loading. Then use those variables in your components. (Don't hard-code a font name in a component).

## Testing

### Unit Testing

Use Jest + Enzyme for unit tests. Follow the file and folder conventions demonstrated in Home Hero:

```
components/
          HomeHero/
                  __tests__/
                            HomeHero.spec.js
                  index.jsx
                  style.scss
```

Use snapshot tests for simple display components - this just ensures no unexpected changes. Any complex functionality should have unit tests with appropriate inputs. Whenever possible, test the component, not the internal functions.

### Automation Testing

Use Cruller for automation testing. It drives tests using [Jest](https://jestjs.io/) and [Google Puppeteer](https://developers.google.com/web/tools/puppeteer/) directly in a headful or headless browser.

#### Resources

[Cruller](https://www.npmjs.com/package/cruller)
[Cruller Docs](https://crullerdocs.netlify.com/#/) (password: cruller)
[Puppeteer API](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)
[Stamps & Stampit](https://stampit.js.org/)
[Confluence docs on Cruller](https://confluence.lblw.cloud/display/PHARM/Automated+Front+End+Testing+Using+Cruller)

#### Setup

- To run tests locally, follow these steps:
  - To run tests on localhost you must run your application prior to running tests
  - Go to <root>/test-automation folder `cd test-automation`
  - Install NPM packages `npm i` - Use `npm test` to run all tests using all permutations/variations
  - To run tests on localhost BASEURL `npm run test:dev` which will set BASEURL to `http://localhost:3000`
  - To run specific permutation by following a similar syntax. `BASEURL='dev' BREAKPOINT='tablet npm test'` (in this case, tests will run on tablet breakpoint using dev baseurl)
  - To run a specific test file , run the command `npm run test -t <file name>`
    -- Example: run (accessbility.test.js), `npm run test -t accessibility`
- Variations are defined in the file test-automation/cruller.config.js, example of variations in the nextjs-accelerator:
  - BREAKPOINT = desktop || tablet || mobile
  - BASEURL = dev || sit || prod

#### Using Browserless

To run browserless in the CI pipeline, you need to:

- Add `BROWSERLESS_KEY` to project's CI gitlab variables
- Set the variable PIPELINE=true in the test script to enable browserless

For further setup details, check README.md at test-automation folder and the resources links

## Hosting an app in a subdirectory using Netlify

Next.js expects to be hosted at the root of the domain by default. It will then take over all the routes. I.e. `www.example.com`.

However, sometimes you need to host the site as part of an existing web property, i.e. `www.example.com/new-product/`.

In this case you will need to do the following:

1. Set up a reverse proxy to point `example.com/new-product` to `site-name.netlify.com/new-product`
2. In Next.js create a page at the route /new-product (see `exportPathMap()` in `next.config.js`). Always treat the Netlify server as if it's the origin, don't do anything like point `example.com/new-product` to `site-name.netlify.com` (without the path) - it creates many complications. The Netlify origin path should be the same as the request path: `/new-product` -> `/new-product`.
3. Set the asset directory in `netlify.toml` to be a subdirectory of the forwarded directory. This ensures that requests for assets are forwarded to Netlify. In this case, NETLIFY_ASSET_PATH would become `"new_product/assets"`. This will ensure that all imported assets are accessible at the proper URL on the server. (This is why we avoid using the static directory).
4. If you are using a reverse proxy, you may lose the benefit of Netlify's CDN and cache headers. Uncomment the headers section in `netlify.toml` to enable 365-day headers for content in the `.next` folder (which is always hashed or in a unique-per-build directory).

## Setting up a 404 page using Next and Contentful

For this set up we will be using the key values section at the site level in contentful for the pages content. We are also configuring the `Next.js` error component using the `./pages/_error.jsx` file.

### For a site with a single domain for all languages.

1. Add the key value content types you require to the key values section of your contentful site.
2. Go to `pages/_error.jsx` and import the component you would like to render on your page. In this case we are using the `Hero` component.
3. Update `getFields()` to fetch and format the key values you require for your error page. This function will be passed to the component rendered on the page.
4. Set the page to return your component if the statusCode prop is equal to `404`.

### For a site with a domain for each language.

1. Follow steps 1-3 from the `single domain` setup.
2. Make sure to add your domain values to the siteDomains variable in `./site-config.js`.
3. Go to `pages/_error.jsx`, make sure the siteDomains value from `./site-config.js` is accessible on the page.
4. Uncomment the `useEffect` hook and host `useState` hook so that you can access the current hostname of the site.
5. Follow step 4 from the `single domain` setup except you are going to pass `errorContent` to a single component.

## Storybook

We are using [Storybook](https://storybook.js.org/) tool as part of our development for UI components. It allows us to view, browse and interact with our component library.

### Setup

#### Setup files location:

You can find the setup files in `.storybook` folder. Each file has more comments on what/how to use it for more details

NOTE: This setup and file structure is using Storybook's [Component Story Format (CSF)](https://storybook.js.org/docs/formats/component-story-format), which is the new recommended way of writing stories.

##### General storybook files:

- `main.js` : This is where you can include your installed addons, set the location of stories to load and set any presets.
- `manager.js` : This file is to add configs to the main storybook UI such as themes, panel positions, sidebar locations, etc.
- `preview.js` : This file is used for adding any global configs for the stories such as decorators, addon parameters, context, etc. It also can be used to configure story locations using loader function [(stories can be loaded from main.js or preview.js file - not both)](https://storybook.js.org/docs/basics/writing-stories/#loading-stories)
- `preview-head.html` : Use to add custom head tags (such as stylesheets links, external scripts, etc)

##### Project Specific files:

- `mockNextRouter.js` : Mock Next.js router to allow using next/Link
- `SiteData.js` : Mock SiteDataContext - which is Contentful data that is used across components.
- `CustomDocsAddon` : This folder contains a custom storybook addon for writing documentation for the project using contentful (Note that this addon maps contentful specific fields. If you are not using contentful, you can use other documentation addons such as [Readme](https://github.com/tuchk4/storybook-readme) , [Docs](https://www.npmjs.com/package/@storybook/addon-docs) , [Notes](https://github.com/storybookjs/storybook/tree/master/addons/notes))
  - `register.js` : This file where the [custom addon](https://storybook.js.org/docs/addons/writing-addons/) panel created.
  - `CustomDocs.jsx`: React component for documentations. - `style.css`: Addon styles.
- `static`: This folder to import images used in storybook

#### Stories location

To write your stories, make sure you specifiy the location you want to import your stories from in `main.js` file. For this project, stories are written within each component folder. Check `TileSection` component as an example. Follow this folder and file structure:

```
components/
          ComponentName/
					    __mocks__/
							     mockProps.js `mocked props to share accross stories and unit tests`
						__stories__/
									ComponentName.stories.jsx
					    __tests__/
								  ComponentName.spec.js
						index.jsx
						style.scss
```

### How to Run

To run storybook locally, run the command `npm run storybook` which will run on port 6006 (http://localhost:6006/)
