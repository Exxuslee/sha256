let w1 = new Array(64);
let s0 = new Array(64);
let s1 = new Array(64);

let i, j, u;
for (i = 0; i < w1.length; i++) {
    w1[i] = new Array(32);
    s0[i] = new Array(32);
    s1[i] = new Array(32);
}
 let w1hex= [0x0000c020, 0x8e195e82, 0x5806a5ac, 0x9467a653, 0x00fe9de6, 0xf0c34b81, 0x6f230600, 0x00000000,
             0x00000000, 0x364c0811, 0x8ea34017, 0xb68edc07, 0x9dd9e834, 0xfbf4ced0, 0x9f23a2b2, 0x8d6fda4a];
// let w1hex= [0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000,
//     0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000];

// function wbit (x, n){
//     return !!(x & (1 << n));
// }
function wbit (x, n){
    if (x & (1 << n)) return 1;
    else return 0;
}
function shex(a) {
    let word=0;
    for (i = 0; i < a.length; i++) {
        word |= a[i] << i
    }
    if (word < 0) word = 0x100000000+word;
    return word.toString(16)
}

function rotr2(a) {
    return (a+2)%32
}
function rotr6(a) {
    return (a+6)%32
}
function rotr7(a) {
    return (a+7)%32
}
function rotr11(a) {
    return (a+11)%32
}
function rotr13(a) {
    return (a+13)%32
}
function rotr18(a) {
    return (a+18)%32
}
function rotr17(a) {
    return (a+17)%32
}
function rotr19(a) {
    return (a+19)%32
}
function rotr22(a) {
    return (a+22)%32
}
function rotr25(a) {
    return (a+25)%32
}

function shr3(a) {
    return a+3
}
function shr10(a) {
    return a+10
}

for (j=0; j< 16; j++){
    // w in binary
    for (i=0; i < w1[j].length; i++) {
        w1[j][i] = wbit(w1hex[j], i);
    }
    for (i=0; i < 32; i++) {
        s0[j][i] = w1[j][rotr7(i)]^w1[j][rotr18(i)]^w1[j][shr3(i)];
        s1[j][i] = w1[j][rotr17(i)]^w1[j][rotr19(i)]^w1[j][shr10(i)];
    }
}

for (j=16; j< w1.length; j++){
    for (i=0; i < w1[j].length; i++) {
        w1[j][i]=0;
        for(u=i; u>-1; u--){
            w1[j][i] += (w1[j-16][i-u] + s0[j-15][i-u] + w1[j-7][i-u] + s1[j-2][i-u])/Math.pow(2,u);
        }
        w1[j][i] =w1[j][i] % 2|0
    }
    for (i=0; i < 32; i++) {
        s0[j][i] = w1[j][rotr7(i)]^w1[j][rotr18(i)]^w1[j][shr3(i)];
        s1[j][i] = w1[j][rotr17(i)]^w1[j][rotr19(i)]^w1[j][shr10(i)];
    }
}

let h0 = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19];
// let h0 = 0x6A09E667;
// let h1 = 0xBB67AE85;
// let h2 = 0x3C6EF372;
// let h3 = 0xA54FF53A;
// let h4 = 0x510E527F;
// let h5 = 0x9B05688C;
// let h6 = 0x1F83D9AB;
// let h7 = 0x5BE0CD19;

let k0 = [
    0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
    0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
    0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
    0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
    0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
    0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
    0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
    0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2];

let a = new Array(66);
let b = new Array(66);
let c = new Array(66);
let d = new Array(66);
let e = new Array(66);
let f = new Array(66);
let g = new Array(66);
let h = new Array(66);

let k = new Array(65);
let q0 = new Array(65);
let ma = new Array(65);
let t2 = new Array(65);
let q1 = new Array(65);
let ch = new Array(65);
let t1 = new Array(65);

for (j = 0; j < 66; j++) {
    a[j] = new Array(32);
    b[j] = new Array(32);
    c[j] = new Array(32);
    d[j] = new Array(32);
    e[j] = new Array(32);
    f[j] = new Array(32);
    g[j] = new Array(32);
    h[j] = new Array(32);
    k[j] = new Array(32);
    q0[j] = new Array(32);
    ma[j] = new Array(32);
    t2[j] = new Array(32);
    q1[j] = new Array(32);
    ch[j] = new Array(32);
    t1[j] = new Array(32);
}

for (i=0; i < 32; i++) {
    a[0][i] = wbit(h0[0], i);
    b[0][i] = wbit(h0[1], i);
    c[0][i] = wbit(h0[2], i);
    d[0][i] = wbit(h0[3], i);
    e[0][i] = wbit(h0[4], i);
    f[0][i] = wbit(h0[5], i);
    g[0][i] = wbit(h0[6], i);
    h[0][i] = wbit(h0[7], i);
}

for (j=0; j < 64; j++) {
    for (i=0; i < 32; i++) {
        k[j][i] = wbit(k0[j], i);
    }
}

for (j=0; j < 64; j++) {
    for (i=0; i < 32; i++) {
        q0[j][i] =  a[j][rotr2(i)] ^ a[j][rotr13(i)] ^ a[j][rotr22(i)];
        ma[j][i] =  (a[j][i]&b[j][i]) ^ (a[j][i]&c[j][i]) ^ (b[j][i]&c[j][i]);

        //t2[j][i] =  q0[j][i] + ma[j][i];
        t2[j][i]=0;
        for(u=i; u>-1; u--){
            t2[j][i] += (q0[j][i-u] + ma[j][i-u] )/Math.pow(2,u);
        }
        t2[j][i] =t2[j][i] % 2|0;

        q1[j][i] =  e[j][rotr6(i)] ^ e[j][rotr11(i)] ^ e[j][rotr25(i)];
        ch[j][i] =  (e[j][i]&f[j][i]) ^ ((!e[j][i])&g[j][i]);

        //t1[j][i] = h[j][i] + q1[j][i] + ch[j][i] + k[j][i] + w1[j][i];
        t1[j][i]=0;
        for(u=i; u>-1; u--){
            t1[j][i] += (h[j][i-u] + q1[j][i-u] + ch[j][i-u] + k[j][i-u] + w1[j][i-u])/Math.pow(2,u);
        }
        t1[j][i] =t1[j][i] % 2|0;

        // Сдвиг
        h[j+1][i] = g[j][i];
        g[j+1][i] = f[j][i];
        f[j+1][i] = e[j][i];
 //       e[j][i] = d[j][i] + t1[j][i];
        e[j+1][i]=0;
        for(u=i; u>-1; u--){
            e[j+1][i] += (d[j][i-u] + t1[j][i-u])/Math.pow(2,u);
//            e[j+1][i] += (d[j][i-u] + h[j][i-u] + q1[j][i-u] + ch[j][i-u] + k[j][i-u] + w1[j][i-u])/Math.pow(2,u);
        }
        e[j+1][i] =e[j+1][i] % 2|0;

        d[j+1][i] = c[j][i];
        c[j+1][i] = b[j][i];
        b[j+1][i] = a[j][i];
//        a[j][i] = t1[j][i] + t2[j][i];
        a[j+1][i]=0;
        for(u=i; u>-1; u--){
            a[j+1][i] += (t1[j][i-u] + t2[j][i-u])/Math.pow(2,u);
        }
        a[j+1][i] = a[j+1][i] % 2|0;

    }
}
// console.log('d:  '+d[0]);
// console.log('h:  '+h[0]);
// console.log('q1: '+q1[0]);
// console.log('ch: '+ch[0]);
// console.log('k:  '+k[0]);
// console.log('w1: '+w1[0]);
// console.log('\ne1: '+e[1]);

// console.log('\nf:  '+f[0]);
// console.log('e:  '+e[0]);
// console.log('g:  '+g[0]);
// console.log('ch: '+ch[0]);

// console.log('e0:  '+shex(e[0]));
// console.log('e1:  '+shex(e[1]));
// console.log('e63:  '+shex(e[63]));
// console.log('e64:  '+shex(e[64]));

for (i=0; i < 32; i++) {
    a[65][i] = 0;
    b[65][i] = 0;
    c[65][i] = 0;
    d[65][i] = 0;
    e[65][i] = 0;
    f[65][i] = 0;
    g[65][i] = 0;
    h[65][i] = 0;
    for(u=i; u>-1; u--){
        a[65][i] += (a[0][i-u] + a[64][i-u])/Math.pow(2,u);
        b[65][i] += (b[0][i-u] + b[64][i-u])/Math.pow(2,u);
        c[65][i] += (c[0][i-u] + c[64][i-u])/Math.pow(2,u);
        d[65][i] += (d[0][i-u] + d[64][i-u])/Math.pow(2,u);
        e[65][i] += (e[0][i-u] + e[64][i-u])/Math.pow(2,u);
        f[65][i] += (f[0][i-u] + f[64][i-u])/Math.pow(2,u);
        g[65][i] += (g[0][i-u] + g[64][i-u])/Math.pow(2,u);
        h[65][i] += (h[0][i-u] + h[64][i-u])/Math.pow(2,u);
    }
    a[65][i] = a[65][i] % 2|0;
    b[65][i] = b[65][i] % 2|0;
    c[65][i] = c[65][i] % 2|0;
    d[65][i] = d[65][i] % 2|0;
    e[65][i] = e[65][i] % 2|0;
    f[65][i] = f[65][i] % 2|0;
    g[65][i] = g[65][i] % 2|0;
    h[65][i] = h[65][i] % 2|0;

}

console.log(a[65]+
    '\n'+b[65]+
    '\n'+c[65]+
    '\n'+d[65]+
    '\n'+e[65]+
    '\n'+f[65]+
    '\n'+g[65]+
    '\n'+h[65]);

let dig = a[65]||b[65]||c[65]||d[65]||e[65]||f[65]||g[65]||h[65];

//console.log(dig);
console.log('a '+shex(a[65]));
console.log('b '+shex(b[65]));
console.log('c '+shex(c[65]));
console.log('d '+shex(d[65]));
console.log('e '+shex(e[65]));
console.log('f '+shex(f[65]));
console.log('g '+shex(g[65]));
console.log('h '+shex(h[65]));
