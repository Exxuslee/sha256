let w = new Array(64);
let s0 = new Array(64);
let s1 = new Array(64);

let i0, i1, i2, i3, i4;
let j = [];
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
    0x00000000, 0x364c0811, 0x8ea34017, 0xb68edc07, 0x9dd9e834, 0xfbf4ced0, 0x9f23a2b2, 0x8d6fda4a, 0x00000002];

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
        for (i2 = 0; i2 < a[i1].length; i2=i2+3) {
            word[i1]+= wbit(w1hex[a[i1][i2]>>5], a[i1][i2]&31) ^
                wbit(w1hex[a[i1][i2+1]>>5], a[i1][i2+1]&31) ^
                wbit(w1hex[a[i1][i2+2]>>5], a[i1][i2+2]&31);
        }
        if (i1 !== 31) word[i1+1]=word[i1]/2 |0;
 //       console.log(word+'')
        word[i1]= word[i1] % 2 | 0;

    }
    return shex(word)
}

function showxor (a) {
    let word = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (i1 = 0; i1 < 32; i1++) {
        for (i2 = 0; i2 < a[i1].length; i2=i2+3) {
            word[i1]+= wbit(w1hex[a[i1][i2]>>5], a[i1][i2]&31) ^
                wbit(w1hex[a[i1][i2+1]>>5], a[i1][i2+1]&31) ^
                wbit(w1hex[a[i1][i2+2]>>5], a[i1][i2+2]&31);
        }
        //       console.log(word+'')
        word[i1]= word[i1] % 2 | 0;

    }
    return shex(word)
}

// function isArray (ar) {
//     return ar instanceof Array
//         || Array.isArray(ar)
//         || (ar && ar !== Object.prototype && isArray(ar.__proto__));
// }
//
// function recursion(arr) {
//     if (isArray(arr[0])) {
//         j.push(arr.length);
//         recursion (arr[0]);
//     }
// }
//
// function showhex (a) {
//
//     let word = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//     for (i1 = 0; i1 < 32; i1++) {
//         j = [];
//         recursion(a[i0]);
//         for (i2 = 0; i2 < a[i1].length; i2=i2+3) {
//             word[i1]+= wbit(w1hex[a[i1][i2]>>5], a[i1][i2]&31) ^
//                 wbit(w1hex[a[i1][i2+1]>>5], a[i1][i2+1]&31) ^
//                 wbit(w1hex[a[i1][i2+2]>>5], a[i1][i2+2]&31);
//         }
//         if (i1 !== 31) word[i1+1]=word[i1]/2 |0;
//         //       console.log(word+'')
//         word[i1]= word[i1] % 2 | 0;
//
//     }
//     return shex(word)
// }

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
        w[i0][i1].push(512, 512, i0<<5|i1)
    }

    for (i1=0; i1 < 22; i1++) {
        s0[i0][i1].push(i0<<5|r07(i1), i0<<5|r18(i1), i0<<5|s03(i1));
        s1[i0][i1].push(i0<<5|r17(i1), i0<<5|r19(i1), i0<<5|s10(i1));
    }
    for (i1=22; i1 < 29; i1++) {
        s0[i0][i1].push(i0<<5|r07(i1), i0<<5|r18(i1), i0<<5|s03(i1));
        s1[i0][i1].push(i0<<5|r17(i1), i0<<5|r19(i1), 512);
    }
    for (i1=29; i1 < 32; i1++) {
        s0[i0][i1].push(i0<<5|r07(i1), i0<<5|r18(i1), 512);
        s1[i0][i1].push(i0<<5|r17(i1), i0<<5|r19(i1), 512);
    }
}

//16-64 Слова
for (i0=16; i0 < 32; i0++){
    for (i1=0; i1 < 32; i1++) {
        w[i0][i1].push(w[i0-16][i1], w[i0-7][i1], s0[i0-15][i1], s1[i0-2][i1]);
//        w[i0][i1] = w[i0-16][i1].concat(w[i0-7][i1]).concat(s0[i0-15][i1]).concat(s1[i0-2][i1]);
    }
    for (i1=0; i1 < 22; i1++) {
        // s0[i0][i1].push(w[i0][r07(i1)], w[i0][r18(i1)], w[i0][s03(i1)]);
        // s1[i0][i1].push(w[i0][r17(i1)], w[i0][r19(i1)], w[i0][s10(i1)]);
       s0[i0][i1] = w[i0][r07(i1)].concat(w[i0][r18(i1)]).concat(w[i0][s03(i1)]);
       s1[i0][i1] = w[i0][r17(i1)].concat(w[i0][r19(i1)]).concat(w[i0][s10(i1)]);
    }
    for (i1=22; i1 < 29; i1++) {
        s0[i0][i1] = w[i0][r07(i1)].concat(w[i0][r18(i1)]).concat(w[i0][s03(i1)]);
        s1[i0][i1] = w[i0][r17(i1)].concat(w[i0][r19(i1)]).concat(512);
    }
    for (i1=29; i1 < 32; i1++) {
        s0[i0][i1] = w[i0][r07(i1)].concat(w[i0][r18(i1)]).concat(512);
        s1[i0][i1] = w[i0][r17(i1)].concat(w[i0][r19(i1)]).concat(512);
    }
}

console.log(w[16][0]);
//console.log(s1[17][0]);
console.log(showhex(w[16]));
console.log(showxor(w[16]));
//console.log(showhex(s1[17]));