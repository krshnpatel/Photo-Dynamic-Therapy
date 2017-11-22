from PIL import Image
import sys
import time
import os

basewidth = 23
file_path = sys.argv[1]
im = Image.open(file_path)

wpercent = (basewidth/float(im.size[0]))
hsize = int((float(im.size[1])*float(wpercent)))
im = im.resize((basewidth,hsize), Image.ANTIALIAS)

current_time = str(int(time.time()))

im.save('./processed_images/python_resize' + current_time + '.jpg', 'JPEG')


pix = im.load()
im_size = im.size
redValue = 0
brownValue = 0
blackValue = 0
total_Val = 0

melanin_level = 3;

for i in range(1,im_size[0]):
    for j in range(1,im_size[1]):
        chosen_pixel = pix[i-1,j-1]
        if (chosen_pixel[0] > 140) and (chosen_pixel[0] < 165) and (chosen_pixel[2] > 70) and (chosen_pixel[2] < 90):
            brownValue = brownValue + 1;
        if (chosen_pixel[0] < 120) and (chosen_pixel[1] < 120) and (chosen_pixel[2] < 120):
            blackValue = blackValue + 1
        if (chosen_pixel[0] > 200):
            redValue = redValue + 1;

if brownValue > blackValue:
    melanin_level = 3;
elif blackValue > brownValue:
    melanin_level = 4;
    
os.remove(file_path)

print (redValue)
print (melanin_level)