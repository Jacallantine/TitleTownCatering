async function handleOnLoad(){
    await fillMenu();
}
function fillMenu(){
    Breakfast()
    Lunch()
    Dinner()
    Bakery()
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
    <li>Cheeseburger 
    <span>$45</span></li>
    <li>Pizza 
    <span>$45</span></li>
  </ul>`
    document.getElementById("lunch").innerHTML = html;
}
function Dinner(){
    let html = `<ul>
    <li>Steak 
    <span>$100</span></li>
    <li>Chicken Alfredo 
    <span>$65</span></li>
    <li>Chicken with Herbs 
    <span>$65</span></li>
    </ul>`
    document.getElementById("dinner").innerHTML = html;
}

function Bakery(){
    let html = `<ul>
    <li>Blue Berry Muffins 
    <span>$60</span></li>
    <li>Apple Pie 
    <span>$65</span></li>
    <li>Glazed Donuts 
    <span>$65</span></li>
    </ul>`
    document.getElementById("bakery").innerHTML = html;
}