import scipy.stats
import math
mat1 = [
    [60,54,46,41,201],
    [40,44,53,57,194],
    [100,98,99,98,395]
    
]
mat2=[]
for r in range(2):
    row=[]
    for c in range(4):
         exp = (mat1[2][c]/mat1[2][4])*mat1[r][4]
         row.append(exp)
    mat2.append(row)
    
    
mat3=[]

for r in range(2):
    row = []
    for c in range(4):
        m = math.pow((mat1[r][c]-mat2[r][c]),2)/mat2[r][c]
        row.append(m)
    mat3.append(row)
row = []    
for c in range(4):
    x = 0
    for r in range(2):
        
        x = x + mat3[r][c]
    row.append(x)     
mat3.append(row)

    
print(mat3)
x=0
for i in range(len(row)):
    x = x +row[i]
    
print(x)
df =1*3
y= scipy.stats.chi2.ppf(1 -.05,df)
print(y)
        
