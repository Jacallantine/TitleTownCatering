document.addEventListener("DOMContentLoaded",()=>{
    const object = getQueryParam("object")
    let deserializedObject = JSON.parse(decodeURIComponent(object));
    const reservation_id = getQueryParam("reservation_id")
    console.log(deserializedObject)
    console.log(reservation_id)
})

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);}