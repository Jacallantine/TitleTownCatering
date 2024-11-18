document.addEventListener('DOMContentLoaded', ()=>{

   hideAll(menuItem)
   var DateTime = getQueryParam("DateTime")
   var email_address = getQueryParam("email_address")
   console.log(DateTime)
   console.log(email_address)
   console.log(reservation_id)
   
    
})


const menuItem = ["breakFast-entree", "lunch-entree", "dinner-entree", "drink-option", "side-option" ]

const email_address = getQueryParam("email_address")
const DateTime = getQueryParam("DateTime")
const reservation_id = GUID()

const Biscuit = document.getElementById("biscuit")
const SENC = document.getElementById("SENC")
const SB = document.getElementById("SB")
const ENC = document.getElementById("ENC")

const CS = document.getElementById("chickenSandwich")
const HD = document.getElementById("hotDog")
const CB = document.getElementById("cheeseBurger")
const PB = document.getElementById("poBoy")

const S = document.getElementById("steak")
const FC = document.getElementById("friedCatfish")
const B = document.getElementById("boil")

Biscuit.addEventListener('input', TotalEntreeCost)
SENC.addEventListener('input', TotalEntreeCost)
ENC.addEventListener('input', TotalEntreeCost)
SB.addEventListener('input', TotalEntreeCost)

CS.addEventListener('input', TotalEntreeCost)
PB.addEventListener('input', TotalEntreeCost)
CB.addEventListener('input', TotalEntreeCost)
PB.addEventListener ('input', TotalEntreeCost)
HD.addEventListener('input', TotalEntreeCost)

S.addEventListener('input', TotalEntreeCost)
FC.addEventListener('input', TotalEntreeCost)
B.addEventListener('input', TotalEntreeCost)




const ReservationData = {

    reservation_id: reservation_id,
    email_address: email_address,
    date: DateTime,
    address: "123 Example Street"
};







function RetrieveInstances(){
    const AllFoodInstances = [
        // Breakfast
        { reservation_id: reservation_id, food_id: 1234, quantity: parseInt(Biscuit.value) },
        { reservation_id: reservation_id, food_id: 1235, quantity: parseInt(SENC.value) },
        { reservation_id: reservation_id, food_id: 1236, quantity: parseInt(SB.value) },
        { reservation_id: reservation_id, food_id: 1237, quantity: parseInt(ENC.value) },
        // Lunch
        { reservation_id: reservation_id, food_id: 1238, quantity: parseInt(CS.value) },
        { reservation_id: reservation_id, food_id: 1239, quantity: parseInt(HD.value) },
        { reservation_id: reservation_id, food_id: 1240, quantity: parseInt(CB.value) },
        { reservation_id: reservation_id, food_id: 1241, quantity: parseInt(PB.value) },
        // Dinner
        { reservation_id: reservation_id, food_id: 1242, quantity: parseInt(S.value) },
        { reservation_id: reservation_id, food_id: 1243, quantity: parseInt(FC.value) },
        { reservation_id: reservation_id, food_id: 1244, quantity: parseInt(B.value) }
    ];
    
    let reservationRequest = {
        Reservation: ReservationData,
        FoodInstances: AllFoodInstances.filter(item => item.quantity > 0)
    };
    console.log(reservationRequest)
    return reservationRequest
}




function makePayment() {


    let reservationRequest = RetrieveInstances();  
  
    let combinedData = {
        Reservation: reservationRequest.Reservation,
        FoodInstances: reservationRequest.FoodInstances
    };

    let combinedDataStr = encodeURIComponent(JSON.stringify(combinedData));

    window.location.href = `payment.html?combinedData=${combinedDataStr}`;
}






// function totalBeverageCost(){

//     let sweetTeaQuantity = parseFloat(document.getElementById('sweetTea').value) || 0
//     let unsweetTeaQuantity = parseFloat(document.getElementById('unsweetTea').value) || 0
//     let blackCoffeeQuantity = parseFloat(document.getElementById('blackCoffee').value) || 0
//     let cappuccinoQuantity = parseFloat(document.getElementById('cappuccino').value) || 0
//     let latteQuantity = parseFloat(document.getElementById('latte').value) || 0
//     let greenTeaQuantity = parseFloat(document.getElementById('greenTea').value) || 0
//     let mDewQuantity = parseFloat(document.getElementById('mDew').value) || 0
//     let cokeQuantity = parseFloat(document.getElementById('coke').value) || 0
//     let drPepperQuantity = parseFloat(document.getElementById('drPepper').value) || 0

//     let drinkCost = (mDewQuantity * priceSoda) + (drPepperQuantity * priceSoda) + 
//     (cokeQuantity * priceSoda) + (greenTeaQuantity * priceGreenTea) + (sweetTeaQuantity * priceSweetTea) + 
//     (blackCoffeeQuantity * priceCoffee) + (unsweetTeaQuantity *PriceUnsweetTea) + 
//     (cappuccinoQuantity * priceCoffee) + (latteQuantity *priceCoffee)

//     document.getElementById('beverages').value = drinkCost.toFixed(2)
//     totalCost()

// }

// function totalSideCost(){

//     let appleQuantity = parseFloat(document.getElementById('apple').value) || 0; 
//     let bananaQuantity = parseFloat(document.getElementById('orange').value) || 0; 
//     let orangeQuantity =parseFloat(document.getElementById('banana').value) || 0; 
//     const sideCost = (appleQuantity * priceApple) + (bananaQuantity * priceBanana) + (orangeQuantity * priceOrange)

//     document.getElementById('sides').value = sideCost.toFixed(2)
//     totalCost()
// }

function TotalEntreeCost() {

    let entreeCost = (bencQuantity * priceBENC) + (sencQuantity * priceSENC) + (encQuantity * priceENC) + (hncQuantity * priceHNC) + (tncQuantity * priceTNC) + (bncQuantity * priceBNC)
    + (gcQuantity * priceGC) + (pcsQuantity * pricePCS) * (csQuantity * priceCS)
    
    document.getElementById('entrees').value = entreeCost.toFixed(2) 
    TotalCost()
}


// function TotalCost() {
//     let totalEntree = parseFloat(document.getElementById('entrees').value) || 0;
//     let totalSide = parseFloat(document.getElementById('sides').value) || 0;
//     let totalBeverages = parseFloat(document.getElementById('beverages').value) || 0;
 
//     let totalCost = totalEntree + totalSide + totalDeserts + totalBeverages;
//     document.getElementById('total').value = totalCost.toFixed(2);
//  }



async function displayMenuItem(selectedId) {
    menuItem.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (element.id !== selectedId) {
                element.style.display = "none";
            } else {
                element.style.display = "flex";
            }
        }
    });
}



async function hideAll(x){
    x.forEach(id =>{
        let element = document.getElementById(id)
        if(element){
            element.style.display = "none"
        }
    })
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
function GUID() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}