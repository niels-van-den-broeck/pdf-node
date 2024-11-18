# STEPS TO REPRODUCE

- nvm use (or switch node version to 20.17.0)
- npm i
- npm run process*
- test.png is created
    - on scale 1.6 this image is white
        - no additional output is given to imply that something went wrong
    - on scale 1 this image is rendered correctly

* The scale can be adjusted in index.js