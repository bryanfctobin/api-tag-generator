const https = require('https');
const fs = require('fs');
const csvFilePath='book.csv';
const csv=require('csvtojson')
const apiUrl = 'INSERT ADMIRAL ENDPOINT HERE';
//Process csv
function processCSV() {
    csv().fromFile(csvFilePath).then((x)=>{
        let count = x.length;
        for (let i = 0; i < count; i++) {
            let pid = x[i].PropertyID;
            let d = x[i].Domains;
            let fullUrl = apiUrl + pid + '/bootstrap';
            https.get(fullUrl, (resp)=> {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', ()=> {
                    let t = "<!-- Admiral Visitor Relationship Management Tag for: " + d + "--> \n";
                    let x = '<script type="text/javascript">';
                    let y = "</script>"
                    let z = t + x + data + y;
                    fs.writeFile(d + "admiral_tag.txt",z,function(err) {
                        if (err) console.log(err);
                    })
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            })
        }
    })
}
processCSV();