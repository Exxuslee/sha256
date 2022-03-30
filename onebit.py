import math

w1 = [0]*64
s0 = [0]*64
s1 = [0]*64

for i in range (64):
    w1[i] = [0]*32
    s0[i] = [0]*32
    s1[i] = [0]*32

w1hex= [0x0000c020, 0x8e195e82, 0x5806a5ac, 0x9467a653, 0x00fe9de6, 0xf0c34b81, 0x6f230600, 0x00000000, 
        0x00000000, 0x364c0811, 0x8ea34017, 0xb68edc07, 0x9dd9e834, 0xfbf4ced0, 0x9f23a2b2, 0x8d6fda4a];

def wbit (x, n):
    return 1 if (x & (1 << n)) else  0

def shex(a):
    word=0;
    for i in range (len(a)):
        word |= a[i] << i        
    return hex(word)

def r2(a):
    return (a+2)%32

def r6(a):
    return (a+6)%32

def r7(a):
    return (a+7)%32

def r11(a): 
    return (a+11)%32

def r13(a):
    return (a+13)%32

def r18(a):
    return (a+18)%32

def r17(a):
    return (a+17)%32

def r19(a):
    return (a+19)%32

def r22(a):
    return (a+22)%32

def r25(a):
    return (a+25)%32

def shr3(a):
    return a+3

def shr10(a):
    return a+10


for j in range (16): 
    for i in range (len(w1[j])): 
        w1[j][i] = wbit(w1hex[j], i)    
        
    for i in range (0, 22):
        s0[j][i] = w1[j][r7(i)] ^ w1[j][r18(i)] ^ w1[j][shr3(i)]
        s1[j][i] = w1[j][r17(i)] ^ w1[j][r19(i)] ^ w1[j][shr10(i)]
        
    for i in range (22, 29):
        s0[j][i] = w1[j][r7(i)] ^ w1[j][r18(i)] ^ w1[j][shr3(i)]
        s1[j][i] = w1[j][r17(i)] ^ w1[j][r19(i)]
        
    for i in range (29, 32):
        s0[j][i] = w1[j][r7(i)] ^ w1[j][r18(i)]
        s1[j][i] = w1[j][r17(i)] ^ w1[j][r19(i)]


for j in range (16, 64):
    for i in range (32):
        u=i
        while u >= 0:
            w1[j][i] += (w1[j-16][i-u] + s0[j-15][i-u] + w1[j-7][i-u] + s1[j-2][i-u]) / math.pow(2,u)
            u-=1
        w1[j][i] = int(w1[j][i])%2


    for i in range (0, 22):
        s0[j][i] = w1[j][r7(i)] ^ w1[j][r18(i)] ^ w1[j][shr3(i)]
        s1[j][i] = w1[j][r17(i)] ^ w1[j][r19(i)] ^ w1[j][shr10(i)]
        
    for i in range (22, 29):
        s0[j][i] = w1[j][r7(i)] ^ w1[j][r18(i)] ^ w1[j][shr3(i)]
        s1[j][i] = w1[j][r17(i)] ^ w1[j][r19(i)]
        
    for i in range (29, 32):
        s0[j][i] = w1[j][r7(i)] ^ w1[j][r18(i)]
        s1[j][i] = w1[j][r17(i)] ^ w1[j][r19(i)]
    

h0 = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19]
k0 = [
    0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
    0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
    0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
    0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
    0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
    0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
    0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
    0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2]

a = [0]*66
b = [0]*66
c = [0]*66
d = [0]*66
e = [0]*66
f = [0]*66
g = [0]*66
h = [0]*66

k = [0]*65
q0 = [0]*65
ma = [0]*65
t2 = [0]*65
q1 = [0]*65
ch = [0]*65
t1 = [0]*65

for j in range (len(a)):  
    a[j] = [0]*32
    b[j] = [0]*32
    c[j] = [0]*32
    d[j] = [0]*32
    e[j] = [0]*32
    f[j] = [0]*32
    g[j] = [0]*32
    h[j] = [0]*32
for j in range (len(k)):      
    k[j] = [0]*32
    q0[j] = [0]*32
    ma[j] = [0]*32
    t2[j] = [0]*32
    q1[j] = [0]*32
    ch[j] = [0]*32
    t1[j] = [0]*32

for i in range (32):
    a[0][i] = wbit(h0[0], i)
    b[0][i] = wbit(h0[1], i)
    c[0][i] = wbit(h0[2], i)
    d[0][i] = wbit(h0[3], i)
    e[0][i] = wbit(h0[4], i)
    f[0][i] = wbit(h0[5], i)
    g[0][i] = wbit(h0[6], i)
    h[0][i] = wbit(h0[7], i)
    
for j in range (64):
    for i in range (32):
        k[j][i] = wbit(k0[j], i)

for j in range (64):
    for i in range (32):
        q0[j][i] =  a[j][r2(i)] ^ a[j][r13(i)] ^ a[j][r22(i)]
        ma[j][i] =  (a[j][i] & b[j][i]) ^ (a[j][i] & c[j][i]) ^ (b[j][i] & c[j][i])

#       t2[j][i] =  q0[j][i] + ma[j][i]
        u=i
        while u >= 0:
            t2[j][i] += (q0[j][i-u] + ma[j][i-u] )/math.pow(2,u)
            u-=1
        t2[j][i] = int(t2[j][i])%2

        q1[j][i] =  e[j][r6(i)] ^ e[j][r11(i)] ^ e[j][r25(i)]
        ch[j][i] =  (e[j][i] & f[j][i]) ^ ((not(e[j][i])) & g[j][i])

#       t1[j][i] = h[j][i] + q1[j][i] + ch[j][i] + k[j][i] + w1[j][i]
        u=i
        while u >= 0:
            t1[j][i] += (h[j][i-u] + q1[j][i-u] + ch[j][i-u] + k[j][i-u] + w1[j][i-u])/math.pow(2,u)
            u-=1
        t1[j][i] = int(t1[j][i])%2

        h[j+1][i] = g[j][i]
        g[j+1][i] = f[j][i]
        f[j+1][i] = e[j][i]
        
#       e[j][i] = d[j][i] + t1[j][i]
        u=i
        while u >= 0:
            e[j+1][i] += (d[j][i-u] + t1[j][i-u])/math.pow(2,u)
            u-=1
        e[j+1][i] = int(e[j+1][i])%2

        d[j+1][i] = c[j][i]
        c[j+1][i] = b[j][i]
        b[j+1][i] = a[j][i]
        
#       a[j][i] = t1[j][i] + t2[j][i]
        u=i
        while u >= 0:
            a[j+1][i] += (t1[j][i-u] + t2[j][i-u])/math.pow(2,u)
            u-=1
        a[j+1][i] = int(a[j+1][i])%2


for i in range (32):    
    u=i
    while u >= 0:
        a[65][i] += (a[0][i-u] + a[64][i-u])/math.pow(2,u);
        b[65][i] += (b[0][i-u] + b[64][i-u])/math.pow(2,u);
        c[65][i] += (c[0][i-u] + c[64][i-u])/math.pow(2,u);
        d[65][i] += (d[0][i-u] + d[64][i-u])/math.pow(2,u);
        e[65][i] += (e[0][i-u] + e[64][i-u])/math.pow(2,u);
        f[65][i] += (f[0][i-u] + f[64][i-u])/math.pow(2,u);
        g[65][i] += (g[0][i-u] + g[64][i-u])/math.pow(2,u);
        h[65][i] += (h[0][i-u] + h[64][i-u])/math.pow(2,u);
        u-=1
    a[65][i] = int(a[65][i]) % 2
    b[65][i] = int(b[65][i]) % 2
    c[65][i] = int(c[65][i]) % 2
    d[65][i] = int(d[65][i]) % 2
    e[65][i] = int(e[65][i]) % 2
    f[65][i] = int(f[65][i]) % 2
    g[65][i] = int(g[65][i]) % 2
    h[65][i] = int(h[65][i]) % 2

print('a '+shex(a[65]));
print('b '+shex(b[65]));
print('c '+shex(c[65]));
print('d '+shex(d[65]));
print('e '+shex(e[65]));
print('f '+shex(f[65]));
print('g '+shex(g[65]));
print('h '+shex(h[65]));

