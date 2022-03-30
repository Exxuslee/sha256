#import math
import os

w1 = [0]*64
s0 = [0]*64
s1 = [0]*64

for i in range (64):
    w1[i] = [0]*32
    s0[i] = [0]*32
    s1[i] = [0]*32

w1hex= [0x0000c020, 0x8e195e82, 0x5806a5ac, 0x9467a653, 0x00fe9de6, 0xf0c34b81, 0x6f230600, 0x00000000, 
        0x00000000, 0x364c0811, 0x8ea34017, 0xb68edc07, 0x9dd9e834, 0xfbf4ced0, 0x9f23a2b2, 0x8d6fda4a]
        
eng = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P']
rus = ['а','б','в','г','д','е','ё','ж','з','и','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я']


def wbit (x, n):
    return '1' if (x & (1 << n)) else  '0'

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

def save(w, j, i, text):
    if not os.path.exists('./data/'+str(w)+str(j)):
        os.makedirs('./data/'+str(w)+str(j))
    
    text_file = open('./data/'+str(w)+str(j)+'/'+str(w)+'`'+str(j)+'`'+str(i)+'.txt', "w")
    text_file.write(text)
    text_file.close()

for j in range(16):
    for i in range (32):
        w1[j][i] = str(eng[j])+str(rus[i])
        save ('w', j, i, w1[j][i])
    for i in range (0, 22):
        s0[j][i] = w1[j][r7(i)]+'^'+w1[j][r18(i)]+'^'+w1[j][shr3(i)]
        s1[j][i] = w1[j][r17(i)]+'^'+w1[j][r19(i)]+'^'+w1[j][shr10(i)]
        
    for i in range (22, 29):
        s0[j][i] = w1[j][r7(i)]+'^'+w1[j][r18(i)]+'^'+w1[j][shr3(i)]
        s1[j][i] = w1[j][r17(i)]+'^'+w1[j][r19(i)]
        
    for i in range (29, 32):
        s0[j][i] = w1[j][r7(i)]+'^'+w1[j][r18(i)]
        s1[j][i] = w1[j][r17(i)]+'^'+w1[j][r19(i)]  
    
        
print('start')
        
for j in range (16, 64):
    print('start '+ str(j))
    for i in range (32):
        w1[j][i] = '{'+w1[j-16][i] +'+'+ s0[j-15][i] +'+'+ w1[j-7][i] +'+'+ s1[j-2][i]+'}';
        save ('w', j, i, w1[j][i])   
    
    for i in range (0, 22):
        s0[j][i] = w1[j][r7(i)]+'^'+w1[j][r18(i)]+'^'+w1[j][shr3(i)]
        s1[j][i] = w1[j][r17(i)]+'^'+w1[j][r19(i)]+'^'+w1[j][shr10(i)]
        
    for i in range (22, 29):
        s0[j][i] = w1[j][r7(i)]+'^'+w1[j][r18(i)]+'^'+w1[j][shr3(i)]
        s1[j][i] = w1[j][r17(i)]+'^'+w1[j][r19(i)]
        
    for i in range (29, 32):
        s0[j][i] = w1[j][r7(i)]+'^'+w1[j][r18(i)]
        s1[j][i] = w1[j][r17(i)]+'^'+w1[j][r19(i)]
        






              
