const dt = 0.01;
let points = [];
let x = 0.001;
let y = 0;
let z = 0;

let betaInput, sigmaInput, rhoInput, restartButton;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight, WEBGL);
	colorMode(HSB, 100);

	betaInput = createInput(`${8 / 3}`);
	betaInput.position(20, 20);
	sigmaInput = createInput('10');
	sigmaInput.position(20, 50);
	rhoInput = createInput('28');
	rhoInput.position(20, 80);
	restartButton = createButton('Restart');
	restartButton.position(20, 110);
	restartButton.mousePressed(restart);
}

function restart() {
	x = 0.001;
	y = 0;
	z = 0;
	points = [];
}

function draw() {
	background(0);
	scale(5);
	rotateY(millis() / 10000);

	const beta = parseInt(betaInput.value());
	const sigma = parseInt(sigmaInput.value());
	const rho = parseInt(rhoInput.value());
	const dx = sigma * (y - x);
	const dy = x * (rho - z) - y;
	const dz = x * y - beta * z;
	x += dx * dt;
	y += dy * dt;
	z += dz * dt;

	points.push(createVector(x, y, z));

	strokeWeight(3);
	for (let i = 0; i < points.length - 1; i++) {
		const current = points[i];
		const next = points[i + 1];

		stroke((i * 0.1) % 100, 100, 100);
		line(current.x, current.y, current.z, next.x, next.y, next.z);
	}
}

window.addEventListener('resize', () => {
	resizeCanvas(window.innerWidth, window.innerHeight);
});
