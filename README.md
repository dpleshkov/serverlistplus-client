# ServerList+ Client

Front-end source code for ServerList+.

### Installation

To run, you will need Git and Node.js installed.

First, clone the repo

```bash
git clone https://github.com/dpleshkov/serverlistplus-client
```

Then, install dependencies

```bash
cd serverlistplus-client
npm install
```

Then, copy `config.example.json` to `config.json` and edit the config
file.

Run using

```bash
node main.js
```

Explanation of config values (do not copy-paste the `const config =`):

```js
const config = {
    "server": {
        "port": 3000, // port on which to run the webserver
        "logging": true, // whether to log requests or not
        "production": false // whether the server is running in production or not
    },
    "site": {
        "analytics": {
            // if you want to enable site analytics, set this to true
            // and put your analytics tag in views/index/analytics.ejs
            "enabled": false
        },
        // set to "standalone" if you don't want features like
        // player listing or live view. You won't need an external API
        // server for that. 
        
        // If you want player listing however, you need to set the mode 
        // to "live"
        "mode": "standalone",
        "live-api-provider": "wss://example.com:1234/",
        "static-api-provider": "https://example.com/"
    }
}
```