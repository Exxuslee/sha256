let w = new Array(64);
let s0 = new Array(64);
let s1 = new Array(64);

let i0, i1;

for (i0 = 0; i0 < 64; i0++) {
    w[i0] = new Array(32);
    s0[i0] = new Array(32);
    s1[i0] = new Array(32);
}

function r02(a) {
    return (a+2)%32
}
function r06(a) {
    return (a+6)%32
}
function r07(a) {
    return (a+7)%32
}
function r11(a) {
    return (a+11)%32
}
function r13(a) {
    return (a+13)%32
}
function r18(a) {
    return (a+18)%32
}
function r17(a) {
    return (a+17)%32
}
function r19(a) {
    return (a+19)%32
}
function r22(a) {
    return (a+22)%32
}
function r25(a) {
    return (a+25)%32
}
function s03(a) {
    return a+3
}
function s10(a) {
    return a+10
}


// Первые 16 слов
for (i0=0; i0< 16; i0++) {
    for (i1 = 0; i1 < 32; i1++) {
        w[i0][i1] = 1;
    }

    for (i1=0; i1 < 22; i1++) {
        s0[i0][i1] = w[i0][r07(i1)] + w[i0][r18(i1)] + w[i0][s03(i1)];
        s1[i0][i1] = w[i0][r17(i1)] + w[i0][r19(i1)] + w[i0][s10(i1)];
    }
    for (i1=22; i1 < 29; i1++) {
        s0[i0][i1] = w[i0][r07(i1)] + w[i0][r18(i1)] + w[i0][s03(i1)];
        s1[i0][i1] = w[i0][r17(i1)] + w[i0][r19(i1)];
    }
    for (i1=29; i1 < 32; i1++) {
        s0[i0][i1] = w[i0][r07(i1)] + w[i0][r18(i1)];
        s1[i0][i1] = w[i0][r17(i1)] + w[i0][r19(i1)];
    }

}

for (i0=16; i0< 64; i0++) {
    for (i1 = 0; i1 < 32; i1++) {
        w[i0][i1] = w[i0-16][i1] + w[i0-7][i1] + s0[i0-15][i1] + s1[i0-2][i1];
    }
    for (i1=0; i1 < 22; i1++) {
        s0[i0][i1] = w[i0][r07(i1)] + w[i0][r18(i1)] + w[i0][s03(i1)];
        s1[i0][i1] = w[i0][r17(i1)] + w[i0][r19(i1)] + w[i0][s10(i1)];
    }
    for (i1=22; i1 < 29; i1++) {
        s0[i0][i1] = w[i0][r07(i1)] + w[i0][r18(i1)] + w[i0][s03(i1)];
        s1[i0][i1] = w[i0][r17(i1)] + w[i0][r19(i1)];
    }
    for (i1=29; i1 < 32; i1++) {
        s0[i0][i1] = w[i0][r07(i1)] + w[i0][r18(i1)];
        s1[i0][i1] = w[i0][r17(i1)] + w[i0][r19(i1)];
    }
}

let max =0;
for (i0=0; i0< 64; i0++) {
    for (i1=0; i1< 32; i1++) if (w[i0][i1]>max) max = w[i0][i1];
}
console.table(w);
console.log('max=%d', max);


let a = new Array(65);
let b = new Array(65);
let c = new Array(65);
let d = new Array(65);
let e = new Array(65);
let f = new Array(65);
let g = new Array(65);
let h = new Array(65);

let q0 = new Array(65);
let ma = new Array(65);
let t2 = new Array(65);
let q1 = new Array(65);
let ch = new Array(65);
let t1 = new Array(65);

for (i0 = 0; i0 < 65; i0++) {
    a[i0] = new Array(32);
    b[i0] = new Array(32);
    c[i0] = new Array(32);
    d[i0] = new Array(32);
    e[i0] = new Array(32);
    f[i0] = new Array(32);
    g[i0] = new Array(32);
    h[i0] = new Array(32);
    q0[i0] = new Array(32);
    ma[i0] = new Array(32);
    t2[i0] = new Array(32);
    q1[i0] = new Array(32);
    ch[i0] = new Array(32);
    t1[i0] = new Array(32);
}

for (i1=0; i1 < 32; i1++) {
    a[0][i1] = 1;
    b[0][i1] = 1;
    c[0][i1] = 1;
    d[0][i1] = 1;
    e[0][i1] = 1;
    f[0][i1] = 1;
    g[0][i1] = 1;
    h[0][i1] = 1;
}

for (i0=0; i0 < 64; i0++) {
    for (i1=0; i1 < 32; i1++) {
        q0[i0][i1] =  a[i0][r02(i1)] + a[i0][r13(i1)] + a[i0][r22(i1)];
        ma[i0][i1] =  a[i0][i1] + b[i0][i1] + c[i0][i1];

        t2[i0][i1] =  q0[i0][i1] + ma[i0][i1];

        q1[i0][i1] =  e[i0][r06(i1)] + e[i0][r11(i1)] + e[i0][r25(i1)];
        ch[i0][i1] =  f[i0][i1] + e[i0][i1] + g[i0][i1];

        t1[i0][i1] = h[i0][i1] + q1[i0][i1] + ch[i0][i1] + 1 + w[i0][i1];


        // Сдвиг
        h[i0+1][i1] = g[i0][i1];
        g[i0+1][i1] = f[i0][i1];
        f[i0+1][i1] = e[i0][i1];
        e[i0+1][i1] = d[i0][i1] + t1[i0][i1];
        d[i0+1][i1] = c[i0][i1];
        c[i0+1][i1] = b[i0][i1];
        b[i0+1][i1] = a[i0][i1];
        a[i0+1][i1] = t1[i0][i1] + t2[i0][i1];


    }
}

console.table(a);
console.log(2**256);




