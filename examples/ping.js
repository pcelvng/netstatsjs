const net = require("../net.js");
const util = require('util');

// do a bunch of pings
let cfg = net.newPingsCfg();
cfg.target = "www.google.com";
cfg.num_pings = 10;
net.pings(cfg, (result) => {
    console.log('do a bunch of pings and get stats');
    console.log(util.inspect(result, false, null, true));
    console.log('');
});

net.ping("www.google.com", (result) => {
    console.log('do a single ping');
    console.log(util.inspect(result, false, null, true));
    console.log('');
});

// url accessibility/liveness check
net.pingUrl("www.google.com/", (pErr, url) => {
    console.log("err since the url is not complete - poorly formed");
    if (pErr) {
        console.log(util.inspect(pErr.toString(), false, null, true));
    }
    console.log(util.inspect(url, false, null, true));
    console.log('');
});

// urls accessibility/liveness check
// an unreachable url wil simply return an empty string value
// in the returned 'urls' array. The order matches the original
// input urls order so the user can know which urls are unreachable.
net.pingUrls(["https://www.google.com/", "https://www.bad.com:8080"], (pErr, urls) => {
    console.log('check accessibility of a series of urls');
    if (pErr) {
        console.log(util.inspect(pErr.toString(), false, null, true));
    }
    console.log(util.inspect(urls, false, null, true));
    console.log('');
});

// how a bad url comes back
net.pingUrls(["https://www.google.com/", "www.bad.com"], (pErr, urls) => {
    console.log('poorly formed url will come back as empty when presented with a group of urls');
    // improperly formed url will result in err.
    if (pErr) {
        console.log(util.inspect(pErr.toString(), false, null, true));
    }
    console.log(util.inspect(urls, false, null, true));
    console.log('');
});