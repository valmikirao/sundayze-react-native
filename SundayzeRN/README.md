# Running

First, @valmikirao will have to give you access to the aws mobile app I think.

To run (untested):


```
git clone https://github.com/valmikirao/sundayze-react-native.git
cd sundayze-react-native/SundayzeRN
npm i
react-native link
react-native link amazon-cognito-identity-js # don't know why this is necessary
```

# Notes on what I did to run this from scratch
- react-native init SundayzeRN
- npm install proper files
- react-native link will be necessary for the camera
- awsmobile init (all default, don't worry about build)
- awsmobile user- files and signin
- `react-native link amazon-cognito-identity-js`
