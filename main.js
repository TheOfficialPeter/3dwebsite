function main() {
	const canvas = document.querySelector("#glCanvas");
	const gl = canvas.getContext("webgl");

	if (gl===null){
		alert("Browser doesn't support webgl");
		return;
	}

	gl.clearColor(0,0,0,1);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	var vc = `
			attribute vec4 a_position;

			void main() {
				gl_Position = a_position;
			}
		`;
	
	var fc = `
			precision mediump float;

			void main() {
				gl_FragColor = vec4(1, 0, 0.5, 1);
			}
		`;

	vcShader = gl.createShader(gl.VERTEX_SHADER);
	fcShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vcShader, vc);
	gl.shaderSource(fcShader, fc);
	
	gl.compileShader(vcShader);
	console.log(gl.getShaderParameter(vcShader, gl.COMPILE_STATUS));
	gl.compileShader(fcShader);
	console.log(gl.getShaderParameter(fcShader, gl.COMPILE_STATUS));

	const shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vcShader);
	gl.attachShader(shaderProgram, fcShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
		alert("failed linking the 2 shaders");
		gl.deleteProgram(shaderProgram);
		return null;
	}

	gl.validateProgram(shaderProgram);
	console.log(gl.getProgramParameter(shaderProgram, gl.LINK_STATUS));
	
	var triangleVerts = 
	[	0, 0,
		0, 0.5,
		0.7, 0
	];
	
	var pBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, pBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerts), gl.STATIC_DRAW);

	var pLocation = gl.getAttribLocation(shaderProgram, "a_position");
	
	gl.vertexAttribPointer(pLocation, 2, gl.FLOAT, gl.FALSE, 5* Float32Array.BYTES_PER_ELEMENT, 0);
	gl.enableVertexAttribArray(pLocation);

	gl.useProgram(shaderProgram);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}

window.onload = main;
