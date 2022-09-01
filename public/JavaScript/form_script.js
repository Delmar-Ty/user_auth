fetch('http://localhost:3000')
.then((response) => {
    return response.body;
})
.then((rb) => {
    console.log(rb.getReader().read());
    return rb.getReader();
});