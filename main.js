var x = 0;



function load(){		
		var canvas = document.getElementById('canvas');
        gl = canvas.getContext('experimental-webgl');

        var vertices = [
           -0.5,1,0.0,
           -0.5,-0.5,0.0,
           0.5,-1,0.0,
           0.5,0.5,0.0
        ];

        indices = [3,2,1,3,1,0];

        var vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        var Index_Buffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		
        var vertCode =
           'attribute vec3 coordinates;' +
           'void main(void) {' +
              ' gl_Position = vec4(coordinates, 1.0);' +
           '}';

        var vertShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertShader, vertCode);
        gl.compileShader(vertShader);

        var fragCode =
           'void main(void) {' +
              ' gl_FragColor = vec4(0, 0, 0, 1);' +
           '}';

        var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragShader, fragCode);
        gl.compileShader(fragShader);
		
        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertShader);
        gl.attachShader(shaderProgram, fragShader);
        gl.linkProgram(shaderProgram);
        gl.useProgram(shaderProgram);
		
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

        var coord = gl.getAttribLocation(shaderProgram, "coordinates");
        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coord);
		
		function animate()
		{
			vertices[1] = 0;
			gl.useProgram(shaderProgram);
			gl.enableVertexAttribArray(coord);
			gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
			x += 0.005;
			gl.enable(gl.DEPTH_TEST);
			gl.clearColor(x,x,x,1);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.viewport(0,0,canvas.width,canvas.height);
			gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);
			window.requestAnimationFrame(function(){
				animate(vertices, vertex_buffer);
			});
			//animate(0);
			//console.log("Running twice check for loop print");
		}

		animate();
}

window.onload = load();
