# Masjid Display

A web application that can be used in a Masjid to display iqama times and announcements.

## Features
1. Display azan times and iqama times
2. Display time remaining to next prayer
3. Load and display a slides of announcements automatically from /slides folder
4. Configuration Panel that enable customization of location  and time zone and setting masjid name


## Getting Started

### Clone the Repository

As usual, you get started by cloning the project to your local machine:

```
https://github.com/nabeel-/masjid-display.git
```

## Prerequisites
1. Download and install Nodejs from
```
https://nodejs.org/
```
2. Google Chrome

### Terminal commands

Now that you have cloned the repo:

1. Navigate to the repository
2. npm install
2. node app.js
3. launch your chrome and navigate to localhost:3000/config
3. set your location information and time zone
4. navigate to localhost:3000 to test the results

### Instructions to start the app automatically
Download a chrome extension that enable chrome to run in full screen kiosk mode from here:
```
https://chrome.google.com/webstore/detail/kiosk/afhcomalholahplbjhnmahkoekoijban?hl=en
```
configure the kiosk to start in the url localhost:3000

You can run the kiosk app on operating system start automatically

### Windows: Instructions to start the node app automatically when Operating System boots
Install "forever" npm tool from:
```
https://github.com/foreverjs/forever
```
Create a .bat file and put it in the application folder
add the following commands in the .bat file:
forever start app.js
save the .bat file and close it
create a shortcut to that batch file and add it to the windows startup folder along with the Kiosk shortcut 
Thas it!
# How to contribute
Feel free to fork and pull request to merge.

# License
The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

