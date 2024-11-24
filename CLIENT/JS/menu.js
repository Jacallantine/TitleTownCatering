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
    <li>Biscuits <span class="quantity">Feeds 20</span>
    <span class="price">$50</span></li>
    <li>Sausage Egg and Cheese Biscuits <span class="quantity">Feeds 20</span>
    <span class="price">$60</span></li>
    <li>Sausage Biscuits <span class="quantity">Feeds 20</span>
    <span class="price">$55</span></li>
    <li>Egg and Cheese Biscuits <span class="quantity">Feeds 20</span> 
    <span class="price">$55</span></li>
  </ul>`
    document.getElementById("breakfast").innerHTML = html;
}
function Lunch(){
    let html = `<ul>
    <li>Chicken Sandwiches <span class="quantity">Feeds 20</span>
    <span class="price">$50</span></li>
    <li>Hot Dogs <span class="quantity">Feeds 20</span>
    <span class="price">$40</span></li>
    <li>Burgers <span class="quantity">Feeds 20</span> 
    <span class="price">$45</span></li>
    <li>Po' Boys <span class="quantity">Feeds 20</span> 
    <span class="price">$45</span></li>
  </ul>`
    document.getElementById("lunch").innerHTML = html;
}
function Dinner(){
    let html = `<ul>
    <li>Steaks <span class="quantity">Feeds 20</span> 
    <span class="price">$100</span></li>
    <li>Fried Catfishes <span class="quantity">Feeds 20</span> 
    <span class="price">$65</span></li>
    <li>Low Country Boils <span class="quantity">Feeds 20</span>
    <span class="price">$65</span></li>
    </ul>`
    document.getElementById("dinner").innerHTML = html;
}
function Sides(){
    let html = `<ul>
    <li>Mac and Cheese <span class="quantity">Feeds 20</span> 
    <span class="price">$20</span></li>
    <li>Mashed Potatoes <span class="quantity">Feeds 20</span> 
    <span class="price">$20</span></li>
    <li>Cheese and Grits <span class="quantity">Feeds 20</span>
    <span class="price">$20</span></li>
    </ul>`
    document.getElementById("sides").innerHTML = html;
}
function Drinks(){
    let html = `<ul>
    <li>Sweet Tea <span class="quantity">Feeds 20</span> 
    <span class="price">$15</span></li>
    <li>Coca Cola <span class="quantity">Feeds 20</span> 
    <span class="price">$15</span></li>
    <li>Lemonade <span class="quantity">Feeds 20</span>
    <span class="price">$15</span></li>
    </ul>`
    document.getElementById("drinks").innerHTML = html;
}