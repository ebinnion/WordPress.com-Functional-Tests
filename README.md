WordPress.com Functional Testing
================================

This repository was started on the June 23rd, 2015 Automattic hack day as an effort to create a functional testing environment that worked with React.

Getting Started
---------------
Before running these tests, you will need to get your selenium testing environment setup. For this, it is advised to use a standalone package. WebdriverIO recommends [vvo/selenium-standalone](https://github.com/vvo/selenium-standalone).

You can install vvo/selenium-standalone with:
 ```
npm install selenium-standalone@latest -g
selenium-standalone install
```

The first time you check out these tests, and periodically, you will need to run `npm install` to install any `npm` dependencies, which can be found in `package.json`.

Running Tests
-------------
Before running the test suite, you should first ensure that the Selenium environment is running. Assuming that you installed [vvo/selenium-standalone](https://github.com/vvo/selenium-standalone), you can now run `selenium-standalone start`.

At this point, you can now run the test suite by running `mocha index.js`.
