const https = require('https');
const apiUrl = 'INSERT ADMIRAL ENDPOINT HERE';
const propId = ['AN ARRAY OF YOUR PROPERTYIDS, PASSED AS STRINGS'];
const fs = require('fs');
function getBootstrap(pId) {
    let a = pId;
    let fullUrl = apiUrl + pId + '/bootstrap';
    https.get(fullUrl, (resp)=> {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', ()=> {
            let t = "<!-- Admiral Visitor Relationship Management Tag for: -->";
            let x = '<script type="text/javascript">';
            let y = "</script>"
            let z = t + x + data + y;
            fs.writeFile(a + ".txt",z,function(err) {
                if (err) console.log(err);
            })
            console.log("<!--Admiral Visitor Relationship Management Tag for " + a + "--->");
            console.log(z);
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    })
}
propId.forEach(getBootstrap);