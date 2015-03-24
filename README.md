# AngularJS-Boilerplate
Simple AngularJS Boilerplate to kick start your new project with SASS support and Gulp watch/build tasks

## 1. Setup
```bash
npm install && bower install
```
- install all dependencies


## 2. Watch files
```bash
gulp
```
- all SCSS/HTML will be watched for changes and injected into browser thanks to BrowserSync

## 3. Build production version
```bash
gulp build
```
- this will process following tasks:
* clean build folder
* compile and minify SCSS files
* optimize images
* concat scripts and copy index.html file into build folder
* copy fonts into build folder
* copy components HTML files
* copy views HTML files


## Contact
Copyright (C) 2015 Jozef Butko<br>
[www.jozefbutko.com/resume](http://www.jozefbutko.com/resume)<br>
[www.github.com/jbutko](http://www.github.com/jbutko)<br>
[@jozefbutko](http://www.twitter.com/jozefbutko)

## Changelog
### 1.0.0
- initial release<br>
22.03.2015
