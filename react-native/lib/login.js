const _ = require('lodash');
const qs =  require('qs');

const request = require('request');

function login({username, password}) {

  const form = {
    Login: {username, password}
  };

  const headers = {
    'Pragma': 'no-cache',
    'Origin': 'http://ec2-54-235-233-111.compute-1.amazonaws.com',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.9',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Cache-Control': 'no-cache',
    'Referer': 'http://ec2-54-235-233-111.compute-1.amazonaws.com/humhub/index.php?r=user%2Fauth%2Flogin',
    'Cookie': 'pm_getting-started-panel=expanded; pm_space-members-panel=expanded; language=5d61d394b8678f9a3444effe2350223f3ebeb0711201f73153517afe27834b7ca%3A2%3A%7Bi%3A0%3Bs%3A8%3A%22language%22%3Bi%3A1%3Bs%3A5%3A%22en_gb%22%3B%7D; _csrf=1927166b31e62dfe1c1f7342b286911c017673a36f811f21512cbceccb92bb68a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22_%A9%2B%EC%1AQqY%D3r%D2%0E%03%18L%E2%27%0E%0ENL%C7G%BF%EE_M%BE1%19%EA%18%22%3B%7D; PHPSESSID=s8rr7siqg93dmsvpqgbnip1q26',
    'Connection': 'keep-alive'
  };

  var options = {
    method: 'POST',
    url: 'http://ec2-54-235-233-111.compute-1.amazonaws.com/humhub/index.php',
    qs: { r: 'user/auth/login' },
    headers,
    form
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    debugger;
    console.log(response.statusCode, response.statusMessage);
    // console.log(body);
  });
}

exports.login = login