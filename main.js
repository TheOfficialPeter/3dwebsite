function initShaders(gl, vsSource, fsSource){
	const vShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

	const shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	return shaderProgram;
}

function loadShader(gl, type, source){
	const shader = gl.createShader(type);
	
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		alert("An error occurec when compiling shaders");
		return null;
	}
}

function main() {
	const canvas = document.querySelector("#glCanvas");
	const gl = canvas.getContext("webgl");

	if (gl===null){
		alert("Browser doesn't support webgl");
		return;
	}

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onload = main;
