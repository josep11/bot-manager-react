
function testPost() {
    const itemRenew = {
        'pk': '999',
        'sk': 'example-to-delete',
        "date": "2021-09-18"
    }
    axios.post(baseURL, itemRenew, {
        headers:
            { 'Content-Type': 'application/json' }
    })
        .then((response) => {
            console.log('post data');
            console.log(response.data)

        })
}
