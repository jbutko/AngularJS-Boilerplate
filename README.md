# AngularJS-Boilerplate
Simple AngularJS Boilerplate to kick start your new project with SASS support and Gulp watch/build tasks

# Features
* SASS support including sourceMaps
* Minimal CSS styling of the view
* Gulp watch, build and local server tasks
* Responsive navigation
* Owl slider directive
* localStorage service for set, get, remove data
* queryService $http wrapper to handle calls
* clear folder structure
* less than 10 request in build version
* minified CSS and JS build files
* google analytics snippet

## Download
```bash
bower install angularjs-boilerplate
```

or

```bash
git clone https://github.com/jbutko/AngularJS-Boilerplate.git
```

## 1. Setup
```bash
npm install
```
- install all npm and bower dependencies

**Note:** If `npm install` fails during dependency installation it will be likely caused by `gulp-imagemin`. In that case remove `gulp-imagemin` dependency from `package.json`, run `npm install` again and then install `gulp-imagemin` separately with following command: `npm install gulp-imagemin --save-dev`

## 2. Watch files
```bash
npm start
```
or
```bash
gulp
```

- all SCSS/HTML will be watched for changes and injected into browser thanks to BrowserSync

## 3. Build production version
```bash
npm run build
```
or
```bash
gulp build
```
- this will process following tasks:
* clean _build folder
* compile SASS files, minify and uncss compiled css
* copy and optimize images
* minify and copy all HTML files into $templateCache
* build index.html
* minify and copy all JS files
* copy fonts
* show build folder size

## 4. Start webserver without watch task
```bash
npm run server
```
or
```bash
gulp server
```

## 5. Start webserver from build folder
```bash
npm run serverbuild
```
or
```bash
gulp server-build
```

## Contact
Copyright (C) 2015 Jozef Butko<br>
[www.jozefbutko.com/resume](http://www.jozefbutko.com/resume)<br>
[www.github.com/jbutko](http://www.github.com/jbutko)<br>
[@jozefbutko](http://www.twitter.com/jozefbutko)<br>
Released under MIT license

## Changelog
### 1.1.7
- Install all dependencies with 'npm install' (bower included) - pull req #7 by @bbodine1<br>
15.05.2015

### 1.1.6
- Cleaned up the gulpfile with gulp-load-plugins - pull req #6 by @davieschoots<br>
26.04.2015

### 1.1.5
- added MIT License<br>
19.04.2015

### 1.1.4
- added minification of JS files in build task<br>
- added favicon<br>
- gulpfile.js beautify and clean up<br>
- added owl carousel into demo<br>
04.04.2015

### 1.1.3
- index.html update: added browserupgrade tag<br>
- index.html update: http-equiv meta tag, google analytics support<br>
- comments update in gulpfile.js<br>
- gulpfile.js formatting<br>
- pull request #1: removed duplicate gulp require in gulpfile.js<br>
04.04.2015

### 1.1.2
- package.json and gulpfile.js clean up<br>
02.04.2015

### 1.1.1
- opened responsive nav fix, css build .min appendix, live demo, github icons<br>
31.03.2015

### 1.1.0
- many improvements: responsive nav, code clean up, gulp angular templateCache
support, gulp task for local server, SASS sourceMaps support<br>
29.03.2015

### 1.0.0
- initial release<br>
22.03.2015
