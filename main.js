function createProgram(gl, vc, fs){

	const shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vc);
	gl.attachShader(shaderProgram, fc);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
		alert("failed linking the 2 shaders");
		gl.deleteProgram(shaderProgram);
		return null;
	}

	return shaderProgram;
}

function createShader(gl, type, source){
	var shader = gl.createShader(type);
	
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		alert("An error occured when compiling shaders");
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}

function main() {
	const canvas = document.querySelector("#glCanvas");
	const gl = canvas.getContext("webgl");

	if (gl===null){
		alert("Browser doesn't support webgl");
		return;
	}

	var vc = document.querySelector("#vertex-shader");
	var fc = document.querySelector("#fragment-shader");

	vc = createShader(gl, gl.VERTEX_SHADER, vc);
	fc = createShader(gl, gl.FRAGMENT_SHADER, fc);

	var program = createProgram(gl, vs, fc);
	
	var pLocation = gl.getAttribLocation(program, "aPosition");
	var pBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
	
	var position = [0, 0,
					0, 0.5,
					0.7, 0
	];
	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);
	webglUtils.resizeCanvasToDisplay(g.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	gl.useProgram(program)
	gl.enableVertextAttribArray(pLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
		
	var size = 2;
	var type = gl.FLOAT; 
	var normalize = false;
	var stride = 0;
	var offset = 0;
	
	gl.vertexAttribPointer(pLocation, size, type, normalize, stride, offset);
	
	var pType = gl.TRAINGLES;
	var offset = 0;
	var count = 3;
	
	gl.drawArrays(pType, offset, count);
}

window.onload = main;
