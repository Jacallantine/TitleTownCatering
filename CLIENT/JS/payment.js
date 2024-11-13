document.addEventListener("DOMContentLoaded", ()=>{
    var email_address = getQueryParam("email_address")
    var reservation_id = getQueryParam("reservation_id")
    var DateTime = getQueryParam("DateTime")
    console.log(email_address)
    console.log(reservation_id)
    console.log(DateTime)
})

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}