function load() {
    var canv = document.querySelector("#canvas");
    var gl = canv.getContext("webgl");

    if (!gl){
        console.log("Not supported. Trying experminental version");
        gl = canv.getContext("experimental-webgl");
    }

    if (!gl){
        console.log("Webgl not supported on this browser");
    }

    var vertex_text = 
    `attribute vec4 position;
    attribute vec3 vertColor;
    varying vec3 fragColor; 
    
    void main(){
        fragColor = vertColor;
        gl_Position = position;
    }`;

    var fragment_text = 
    `precision mediump float;

    varying vec3 fragColor;
    
    void main(){
        gl_FragColor = vec4(fragColor, 1);
    }`;

    var vertices = [
        0.5, 0.5,   0, 0, 0,
        -0.5, 0.5,  .5, .5, .5,
        0.0, -0.5,  .5, .5, .5
    ];

    var vBuff = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuff);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    
    var vertex_shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertex_shader, vertex_text);
    gl.compileShader(vertex_shader);
    
    var fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragment_shader, fragment_text);
    gl.compileShader(fragment_shader);

    var program = gl.createProgram();
    gl.attachShader(program, vertex_shader);
    gl.attachShader(program, fragment_shader);

    gl.linkProgram(program);
    gl.useProgram(program);

    var origin = gl.getAttribLocation(program, "position");
    gl.vertexAttribPointer(origin, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(origin);

    var color = gl.getAttribLocation(program, "vertColor");
    gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.enableVertexAttribArray(color);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

window.onload = load();