const https = require('https');
const fs = require('fs');
const csvFilePath='book.csv';
const csv=require('csvtojson')
const apiUrl = 'INSERT ADMIRAL ENDPOINT HERE';
const ObjectsToCsv = require('objects-to-csv');
let u = new Array;
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
                    let t = "<!-- Admiral Visitor Relationship Management Tag for: " + d + " --> \n";
                    let x = '<script type="text/javascript">';
                    let y = "</script>"
                    let z = t + x + data + y;
                    let n = x + data + y;
                    let m = {
                        propertyID: pid,
                        domain: d,
                        tag: n
                    }
                    u.push(m)
                    fs.writeFile(d + "_admiral_tag.txt",z,function(err) {
                        if (err) console.log(err);
                    })
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            })
        }
    })
}
function createCSV() {
    let h = new ObjectsToCsv(u);
    h.toDisk('props.csv');
    console.log("Finished");
}
processCSV();
setTimeout(createCSV, 2000);