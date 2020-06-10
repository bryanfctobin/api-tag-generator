const got = require('got');
// const apiUrl = 'INSERT ADMIRAL ENDPOINT HERE';
// const propId = ['AN ARRAY OF YOUR PROPERTYIDS, PASSED AS STRINGS'];
function retrieveBootstrap(pId) {
    let fullUrl = apiUrl + pId + '/bootstrap';
    got(fullUrl, {json :true}).then(response => {
        console.log(response.body.url);
        console.log(response.body.explanation);
    }).catch(error => {
        let x = error.response.body;
        let y = '<script type="text/javascript">';
        let z = '</script>'
        let a = y + x + z;
        console.log(a);
        console.log("============================");
    })
}
propId.forEach(retrieveBootstrap);