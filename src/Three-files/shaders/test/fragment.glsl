varying vec2 vUv;
  
void main() {

    //Patern 3
    // float strength = vUv.x;
    // //Patern 4
    // float strength = vUv.y;
    // //Patern 5
    // float strength = 1.0 - vUv.y;
    // //Patern 6
    // float strength = vUv.y * 10.0;
    // //Patern 7
    // // float strength = mod(vUv.y * 10.0, 1.0);
    // //Patern 8
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.5, strength);

    // //Patern 9
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);
    // //Patern 10
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.8, strength);
    // //Patern 11
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength +=  step(0.8, mod(vUv.y * 10.0, 1.0));
    // // //Patern 12
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength *=  step(0.8, mod(vUv.y * 10.0, 1.0));
    // //Patern 13
    // float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
    // strength *=  step(0.8, mod(vUv.y * 10.0, 1.0));
    // //Patern 14
    float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    barX *=  step(0.8, mod(vUv.y * 10.0, 1.0));
    float barY = step(0.8, mod(vUv.x * 10.0, 1.0));
    barY *=  step(0.4, mod(vUv.y * 10.0, 1.0));

    float strength = barX + barY;



    gl_FragColor = vec4(strength, strength, strength, 1.0); // black-white
    // gl_FragColor = vec4(vUv.x, vUv.y, 0.5, 1.0); // violet orange
    // gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0); // violet color
    // gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);

}