
function main() {
	 canvas = document.getElementById('glCanvas');
	var gl = canvas.getContext('webgl');
	
	var vertices = [
		-0.5, 0.5, 0.0,
		-0.5, -0.5, 0.0,
		0.5, -0.5, 0.0,
		0.5, 0.5, 0.0,
	];
	
	var indices = [3,2,1,3,1,0];

	var vertex_buffer = gl.createBuffer();
	var index_buffer = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	var vertCode =
	'attribute vec2 coordinates;' + 
	'void main(void) {' + ' gl_Position = vec4(coordinates,0, 1);' + '}';

	var vertShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vertShader, vertCode);
	gl.compileShader(vertShader);

	var fragCode = 'void main(void) {' + 'gl_FragColor = vec4(100.0, 0.0, 0.0, .75);' + '}';

	var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragShader, fragCode);
	gl.compileShader(fragShader);

	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertShader); 
	gl.attachShader(shaderProgram, fragShader);

	gl.linkProgram(shaderProgram);

	gl.useProgram(shaderProgram);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
	gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

	gl.enable(gl.DEPTH_TEST);

	var coord = gl.getAttribLocation(shaderProgram, "coordinates");
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(coord);
	
	gl.viewport(0,0,canvas.width,canvas.height);
	gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 3);
}

window.onload = main;
