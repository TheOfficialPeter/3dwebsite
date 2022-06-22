function getRandomPosition(){
	return [Math.random(), Math.random()];
}

let positionsX = [];
let positionsY = [];

function loadShapes(amount){
	for (let i = 0; i < amount; i++) {
			var randomPosition = getRandomPosition();
			var posX = randomPosition[0]*window.innerWidth;
			var posY = randomPosition[1]*window.innerHeight;

			posX = posX.toFixed(0);
			posY = posY.toFixed(0);

			positionsX.push(posX);
			positionsY.push(posY);
			console.log(posX, posY);

			randomPosition = getRandomPosition();
			var radius = randomPosition[0]*100+50;
			radius = radius.toFixed(0);

			var circle = document.querySelector('#circle');
			var newCircle = circle.cloneNode(true);
			newCircle.id = "newCircle";

			newCircle.style.height = radius.toString()+"px";
			newCircle.style.width = radius.toString()+"px";

			document.body.appendChild(newCircle);
			newCircle.style.marginTop = posY.toString()+"px";
			newCircle.style.marginLeft = posX.toString()+"px";

			randomPosition = getRandomPosition();
			posX = randomPosition[0]*window.innerWidth;
			posY = randomPosition[1]*window.innerHeight;

			posX = posX.toFixed(0);
			posY = posY.toFixed(0);

			positionsX.push(posX);
			positionsY.push(posY);
			console.log(posX, posY);

			var pill = document.querySelector('#pill');
			var newPill = pill.cloneNode(true);
			newPill.id = "newPill";
			document.body.appendChild(newPill);
			
			randomPosition = getRandomPosition();
			thick = randomPosition[0]*100;
			thick = thick.toFixed(0);
			newPill.style.paddingLeft = thick.toString()+"px";

			let rotate = Math.random();
			rotate = rotate*100;
			newPill.style.marginTop = posY.toString()+"px";
			newPill.style.marginLeft = posX.toString()+"px";
			newPill.style.transform = "rotate("+rotate.toString()+"deg)";

	}
}

function main(){
	var randomMult = 5;
	var amount = Math.random();
	amount = amount * randomMult;
	loadShapes(amount);
}

window.onload = main();
