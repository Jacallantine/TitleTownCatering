document.addEventListener('DOMContentLoaded', ()=>{

   hideAll(menuItem)
   var DateTime = getQueryParam("DateTime")
   var email_address = getQueryParam("email_address")
   let name = getQueryParam("first_name")
   let signIn = document.getElementById("signIn")
   signIn.textContent = name
   console.log(DateTime)
   console.log(email_address)
   console.log(reservation_id)

   FetchFoods()

   
    
})

function customerDash(){
    window.location.href = `customerDash.html?email_address=${email_address}&first_name=${first_name}`
}


const menuItem = ["breakFast-entree", "lunch-entree", "dinner-entree", "drink-option", "side-option" ]

const email_address = getQueryParam("email_address")
const first_name = getQueryParam("first_name")
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

const sweetTea = document.getElementById('sweetTea')
const coke = document.getElementById('coke')
const lemonade = document.getElementById('lemonade')

const mac = document.getElementById('mac')
const mash = document.getElementById("mashP")
const CNG = document.getElementById('CNG')


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

sweetTea.addEventListener('input',totalBeverageCost)
coke.addEventListener('input', totalBeverageCost)
lemonade.addEventListener('input', totalBeverageCost)

mac.addEventListener('input',totalSideCost)
mash.addEventListener('input', totalSideCost)
CNG.addEventListener('input', totalSideCost)


const ReservationData = {

    reservation_id: reservation_id,
    email_address: email_address,
    date: new Date(DateTime).toISOString(),
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
        { reservation_id: reservation_id, food_id: 1244, quantity: parseInt(B.value) },
        // Side
        { reservation_id: reservation_id, food_id: 1245, quantity: parseInt(mac.value) },
        { reservation_id: reservation_id, food_id: 1246, quantity: parseInt(mash.value) },
        { reservation_id: reservation_id, food_id: 1247, quantity: parseInt(CNG.value) },

        { reservation_id: reservation_id, food_id: 1248, quantity: parseInt(sweetTea.value) },
        { reservation_id: reservation_id, food_id: 1249, quantity: parseInt(coke.value) },
        { reservation_id: reservation_id, food_id: 1250, quantity: parseInt(lemonade.value) },
    ];
    
    let currentReservation = {
        reservation_id: ReservationData.reservation_id,
        email_address: ReservationData.email_address,
        date: new Date(DateTime).toISOString(),
        address: ReservationData.address,
        FoodInstances: AllFoodInstances.filter(item => item.quantity > 0)
    };
    console.log(currentReservation)
    return currentReservation
}




function makePayment() {

    let first_name = getQueryParam("first_name")

    let reservationRequest = RetrieveInstances();  
  
    

    let combinedDataStr = encodeURIComponent(JSON.stringify(reservationRequest));

    window.location.href = `payment.html?combinedData=${combinedDataStr}&first_name=${first_name}&email_address=${email_address}`;
}






function totalBeverageCost() {
    const beverages = [
        { id: 'sweetTea', price: 15 },
        { id: 'coke', price: 15 },
        { id: 'lemonade', price: 15 }
    ];

    let drinkCost = beverages.reduce((total, beverage) => {
        const quantity = parseFloat(document.getElementById(beverage.id).value) || 0;
        return total + (quantity * beverage.price);
    }, 0);

    document.getElementById('beverages').value = drinkCost.toFixed(2);
    totalCost();
}





function totalSideCost(){
    const sides = [
        {id: 'mac', price: 20},
        {id: 'mashP', price: 20},
        {id: 'CNG', price : 20}
    ]

    let sideCost = sides.reduce((total, side) =>{
        const quantity = parseFloat(document.getElementById(side.id).value) || 0;
        return total + (quantity * side.price)
    }, 0)

    document.getElementById('sidesInput').value = sideCost.toFixed(2)
    TotalCost()
}



function TotalEntreeCost() {

    const entrees = [
        {id: 'biscuit', price: 50},
        {id: 'SENC', price: 60},
        {id: 'ENC', price : 55},
        {id: 'SB', price: 55},
        {id: 'chickenSandwich', price: 50},
        {id: 'poBoy', price : 45},
        {id: 'cheeseBurger', price: 45},
        {id: 'hotDog', price: 40},
        {id: 'steak', price: 100},
        {id: 'friedCatfish', price: 65},
        {id: 'boil', price: 85}
    ]

    let entreeCost = entrees.reduce((total, entree) =>{
        const Equantity = parseFloat(document.getElementById(entree.id).value) || 0;
        return total + (Equantity * entree.price)
    }, 0)

    document.getElementById('entrees').value = entreeCost.toFixed(2)
    TotalCost()
}


function TotalCost() {
    let totalEntree = parseFloat(document.getElementById('entrees').value) || 0;
    let totalSide = parseFloat(document.getElementById('sidesInput').value) || 0;
    let totalBeverages = parseFloat(document.getElementById('beverages').value) || 0;
 
    let totalCost = totalEntree + totalSide + totalBeverages;
    document.getElementById('total').value = totalCost.toFixed(2);
 }



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
    return Math.floor(1000 + Math.random() * 9000)
}


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