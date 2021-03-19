// precision mediump float;

// varying float vRandom;
uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;
  
void main() {
    
    // gl_FragColor = vec4(vRandom, vRandom * 0.5, 1.0, 1.0);
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 2.0 + 0.5;
    // vec4 textureColor = texture2D(uTexture, vUv);
    gl_FragColor = textureColor;
    gl_FragColor = vec4(vUv, 1.0, 1.0);
    // gl_FragColor = vec4(uColor, 1.0);
    gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}