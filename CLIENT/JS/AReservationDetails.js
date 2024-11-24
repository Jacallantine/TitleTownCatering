document.addEventListener("DOMContentLoaded",()=>{
    const object = getQueryParam("object")
    let deserializedObject = JSON.parse(decodeURIComponent(object));
    const reservation_id = getQueryParam("reservation_id")
    console.log(deserializedObject)
    console.log(reservation_id)
    FetchFoods()
})

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);}




    async function FetchFoods(){ 
        fetch(`http://localhost:5220/api/reservation/food`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async (response) => {
            let data = await response.json();
            
                console.log("Food List:", data);  
                FoodList = data
          
        })}