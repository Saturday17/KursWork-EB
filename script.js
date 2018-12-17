var points = ":";
const goods = [{
	img: 'resource/4.gif',
	name: 'Honor 10',
	price: 711.99,
	amount: 20,
	},
	{
	img: 'resource/galaxy-s9-black-new.300x300.jpg',
	name: 'Samsung Galaxy S9',
	price: 1198.99,
	amount: 12,
	},
	{
	img: 'resource/iphoneXR.jpg',
	name: 'Apple iPhone XR',
	price: 1854.99,
	amount: 10,
	},
	{
	img: 'resource/Oneplus-6T-purple-new.180x180.jpg',
	name: 'OnePlus 6T',
	price: 1397.99,
	amount: 20,
	},
	{
	img: 'resource/ipad-2018-silver.300x300.jpg',
	name: 'Apple iPad 2018',
	price: 749.99,
	amount: 15,
	},
	{
	img: 'resource/Samsung-Galaxy-Tab-A-32GB-SM-T590-face.300x300.png',
	name: 'Samsung Galaxy Tab A',
	price: 687.11,
	amount: 18,
	},
	{
	img: 'resource/Mi-Notebook-Air-13.3.300x300 (1).png',
	name: 'Xiaomi Mi Notebook Air 13.3',
	price: 711.99,
	amount: 20,
	},
	{
	img: 'resource/30028713b2.300x300.png',
	name: 'ASUS VivoBook Max',
	price: 823.18,
	amount: 17,
	},
	{
	img: 'resource/LG-55UK67.300x300.png',
	name: 'LG 55UK6750',
	price: 1591.99,
	amount: 6,
	},
	{
	img: 'resource/Philips-49PUS8303.300x300.png',
	name: 'Philips 49PUS8303',
	price: 1597.99,
	amount: 8,
	},
	{
	img: 'resource/Samsung-UE43NU7470.300x300.png',
	name: 'Samsung UE43NU7470',
	price: 1198.99,
	amount: 7,
	},
	{
	img: 'resource/Sony-KD-55AF8.300x300.png',
	name: 'Sony KD 55AF8',
	price: 4289.99,
	amount: 4,
	}
];
var Cart = [];
const Roudes = {
	"#home": {
		path: "home.html",
		// handler: function taimer(){
		// 		var clock = document.getElementById("taim");
		// 		var date = new Date();
		// 		var hours = 23 - date.getHours();
		// 			if (hours<10) hours = "0"+hours;
		// 		var minutes = 59 - date.getMinutes();
		// 			if (minutes<10) minutes = "0"+minutes;
		// 		var seconds = 60 - date.getSeconds();
		// 			if (seconds<10) seconds = "0"+seconds;
		// 		document.getElementById("taim").innerHTML=hours+points+minutes+points+seconds; 
		// 			points = points == ':' ? ' ' : ':';
		// 		setTimeout("taimer()",500); 
		// }
	},
	"#katalog" : {
		path: "katalog.html",
		handler: function showGoods(){
				const list = document.getElementById("itemlist");
				var str='';
				goods.forEach(function(items){
					str+=`<div class="col-md-4 tovar">
					<img src="${items.img}"/>
					<h3> ${items.name} </h3>
					<h6> Цена: ${items.price}, осталось ${items.amount} шт </h6>
					<p class="cart"> 
						<input type = "number" max="${items.amount}" value="1" min="1"</>
						<input type = "button" value="В корзину" class="addToCart"</>
						</p>
					</div>`;
				});
				list.innerHTML = str;
				const addButtons = document.getElementsByClassName("addToCart");
				for (let i=0; i<addButtons.length; i++){
					addButtons[i].addEventListener("click", function(){
						const amount = this.previousElementSibling.value;
						addToCart(goods[i], amount);
					});
				}
				addToCart = function(item, amount){
						Cart.push({item, amount});
						console.log(Cart);
						const totalAmount = Cart.reduce((prev, curr) => Number(prev + Number(curr.amount)), 0);
						const totalPrice = Cart.reduce((prev, curr) => prev + curr.amount * curr.item.price, 0);
						const span = document.getElementById("cartStatus");
						span.innerHTML = `${totalAmount} товаров на сумму ${totalPrice}`;
						item.amount -= amount; // удаление из магазина товаров, которые добавляются в корзину
						showGoods(goods);
				}
				const showCartBtn = document.getElementById("showCart");
				showCartBtn.addEventListener("click", function(){
					showCart();
				});
				showCartBtn.addEventListener("dblclick", function(){
					showGoods();
				});
				showCart = function(){
					const list = document.getElementById("itemlist");
					var s = "";
					for (var i in Cart){
						s += `<div class="col-md-4">
							<img src="${Cart[i].item.img}"/>
							<h3> ${Cart[i].item.name} </h3>
							<p> Кол-во: ${Cart[i].amount} |
								Цена: ${Cart[i].item.price} |
								Стоимость: ${Cart[i].amount * Cart[i].item.price}
							</p>
						</div>`;
						list.innerHTML = s;
						Cart[i].item.price.toFixed(2); // не больше 2ух знаков после запятой цены
					}
				}
			}
	},
	"#delivery" : {
		path: "delivery.html"
	},
	"#contacts": {
		path: "contacts.html"
	}
}
function refreshContainer(){
	const hash = location.hash;
	if(hash in Roudes){
		const path = Roudes[hash].path;
		const xhr = new XMLHttpRequest();
		xhr.open("GET", path, true);
		xhr.onload = function(){
			onPageLoaded(this.responseText, hash)
		}
		xhr.send(null);
	}
}
function onPageLoaded(text, hash){
	const div = document.getElementById("page-wrapper");
	div.innerHTML = text;
	if(typeof Roudes[hash].handler == "function"){
		Roudes[hash].handler();
	}
}
window.onhashchange = refreshContainer;
refreshContainer();


