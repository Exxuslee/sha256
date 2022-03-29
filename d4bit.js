let w = new Array(64);
let s0 = new Array(64);
let s1 = new Array(64);

let i0, i1, i2, i3, i4;
for (i0 = 0; i0 < 64; i0++) {
    w[i0] = new Array(32);
    s0[i0] = new Array(32);
    s1[i0] = new Array(32);
    for (i1 = 0; i1 < 32; i1++) {
        w[i0][i1] = [];
        s0[i0][i1] = [];
        s1[i0][i1] = [];
    }
}
let w1hex= [0x0000c020, 0x8e195e82, 0x5806a5ac, 0x9467a653, 0x00fe9de6, 0xf0c34b81, 0x6f230600, 0x00000000,
    0x00000000, 0x364c0811, 0x8ea34017, 0xb68edc07, 0x9dd9e834, 0xfbf4ced0, 0x9f23a2b2, 0x8d6fda4a];

function wbit (x, n){
    if (x & (1 << n)) return 1;
    else return 0;
}
function shex(a) {
    let word=0;
    for (let i = 0; i < 32; i++) {
        word |= a[i] << i
    }
    if (word < 0) word = 0x100000000+word;
    return word.toString(16)
}
function showhex (a) {
    let word = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (i1 = 0; i1 < 32; i1++) {
        for (i2 = 0; i2 < a[i1].length; i2+=3) {
            word[i1]= wbit(w1hex[a[i1][i2+2]>>5], a[i1][i2+2]&&31)
        }
    }
    return shex(word)
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
        w[i0][i1].push(0, 0, i0<<5|i1)
    }

    // for (i1=0; i1 < 22; i1++) {
    //     for (i2=0; i2 < 16; i2++) {
    //         for (i3=0; i3 < 32; i3++) {
    //             if (i0===i2 && r07(i1)===i3) s0[i0][i1][i2][i3][0] = 1;
    //             if (i0===i2 && r18(i1)===i3) s0[i0][i1][i2][i3][0] = 1;
    //             if (i0===i2 && s03(i1)===i3) s0[i0][i1][i2][i3][0] = 1;
    //
    //             if (i0===i2 && r17(i1)===i3) s1[i0][i1][i2][i3][0] = 1;
    //             if (i0===i2 && r19(i1)===i3) s1[i0][i1][i2][i3][0] = 1;
    //             if (i0===i2 && s10(i1)===i3) s1[i0][i1][i2][i3][0] = 1;
    //         }
    //     }
    // }
    // for (i1=22; i1 < 29; i1++) {
    //     for (i2=0; i2 < 16; i2++) {
    //         for (i3=0; i3 < 32; i3++) {
    //             if (i0===i2 && r07(i1)===i3) s0[i0][i1][i2][i3][0] = 1;
    //             if (i0===i2 && r18(i1)===i3) s0[i0][i1][i2][i3][0] = 1;
    //             if (i0===i2 && s03(i1)===i3) s0[i0][i1][i2][i3][0] = 1;
    //
    //             if (i0===i2 && r17(i1)===i3) s1[i0][i1][i2][i3][0] = 1;
    //             if (i0===i2 && r19(i1)===i3) s1[i0][i1][i2][i3][0] = 1;
    //         }
    //     }
    // }
    // for (i1=29; i1 < 32; i1++) {
    //     for (i2=0; i2 < 16; i2++) {
    //         for (i3=0; i3 < 32; i3++) {
    //             if (i0===i2 && r07(i1)===i3) s0[i0][i1][i2][i3][0] = 1;
    //             if (i0===i2 && r18(i1)===i3) s0[i0][i1][i2][i3][0] = 1;
    //
    //             if (i0===i2 && r17(i1)===i3) s1[i0][i1][i2][i3][0] = 1;
    //             if (i0===i2 && r19(i1)===i3) s1[i0][i1][i2][i3][0] = 1;
    //         }
    //     }
    // }
}

console.log(w[1]);
console.log(showhex(w[1]));
console.log(34&31);