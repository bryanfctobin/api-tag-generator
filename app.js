const https = require('https');
const apiUrl = 'INSERT ADMIRAL ENDPOINT HERE';
const propId = ['AN ARRAY OF YOUR PROPERTYIDS, PASSED AS STRINGS'];
function getBootstrap(pId) {
    let a = pId;
    let fullUrl = apiUrl + pId + '/bootstrap';
    https.get(fullUrl, (resp)=> {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', ()=> {
            let x = '<script type="text/javascript">';
            let y = "</script>"
            let z = x + data + y;
            console.log("<!--Admiral Visitor Relationship Management Tag for " + a + "--->");
            console.log(z);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
}
propId.forEach(getBootstrap);