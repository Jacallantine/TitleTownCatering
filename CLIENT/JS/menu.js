async function handleOnLoad(){
    fillMenu();
}
function fillMenu(){
    Breakfast()
    Lunch()
    Dinner()
    Sides()
    Drinks()
}
function Breakfast(){
    let html = `
    <ul>
    <li>Biscuit 
    <span>$50</span></li>
    <li>Sausage Egg and Cheese Biscuit 
    <span>$60</span></li>
    <li>Sausage Biscuit 
    <span>$55</span></li>
    <li>Egg and Cheese Biscuit 
    <span>$55</span></li>
  </ul>`
    document.getElementById("breakfast").innerHTML = html;
}
function Lunch(){
    let html = `<ul>
    <li>Chicken Sandwich
    <span>$50</span></li>
    <li>Hot Dogs
    <span>$40</span></li>
    <li>Burgers 
    <span>$45</span></li>
    <li>Po' Boys 
    <span>$45</span></li>
  </ul>`
    document.getElementById("lunch").innerHTML = html;
}
function Dinner(){
    let html = `<ul>
    <li>Steak 
    <span>$100</span></li>
    <li>Fried Catfish 
    <span>$65</span></li>
    <li>Low Country Boil
    <span>$65</span></li>
    </ul>`
    document.getElementById("dinner").innerHTML = html;
}
function Sides(){
    let html = `<ul>
    <li>Mac and Cheese 
    <span>$20</span></li>
    <li>Mashed Potatoes 
    <span>$20</span></li>
    <li>Cheese and Grits
    <span>$20</span></li>
    </ul>`
    document.getElementById("sides").innerHTML = html;
}
function Drinks(){
    let html = `<ul>
    <li>Sweet Tea 
    <span>$15</span></li>
    <li>Coca Cola 
    <span>$15</span></li>
    <li>Lemonade
    <span>$15</span></li>
    </ul>`
    document.getElementById("drinks").innerHTML = html;
}