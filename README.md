# Install

`npm install`

`npm run cypress:open`

## Problem

At BBC Sport, our pages are designed to return an error page to users who visit the page before the cache has warmed. After the first user visits the page, the cache is warmed and from that point onwards we deliver the expected content with a 200 response.

This can make our tests flaky on our test environment, so a requirement for our needs is that we can retry tests, or have some other means of warming a page's cache before running tests against it.

Here, I have attempted to override the `cy.visit()` command so that it will recursively make http get requests to the page until a 200 response is returned, at which case we run the standard `cy.visit()` command and run the test like normal.

The code contained in this repo does actually meet that requirement to a point. A test ran in isolation against a page that hasn't been cache warmed does behave as expected. The http get request polls until a 200 is returned, and then the page is visited and the test runs and passes as expected.

However, when I try to do this to multiple pages it fails consistently. I also tried running the "kitchen sink" cypress tests with the overriden command, and these tests also fail consistently.

So this repo has the modified command inside `/cypress/support/commands.js` and runs the `example_spec` as provided by the cypress framework.

If we can get this to work consistently, it'll be a big win for us and will enable us to seriously consider cypress as an option.