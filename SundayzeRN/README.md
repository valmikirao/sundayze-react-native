# Running

First, @valmikirao will have to give you access to the aws mobile app I think.

To run (untested):

Global things you need:

```
# node and watchman, if you don't have them
brew install node
brew install watchman

# aws access tools
# You will need a valid aws use in this account, you can sign in here:
# https://463568659849.signin.aws.amazon.com/console
pip install awscli
# TODO: Add other setup stuff to like to the account

# other tools
npm install -g react-native-cli
npm install -g awsmobile-cli

awsmobile configure

# Also: Have JDK >= 1.7 installed

```

Setting up the repo:
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
