import Image, ImageDraw
from random import randint as rint

def randgradient():
    img = Image.new("RGB", (300,300), "#FFFFFF")
    draw = ImageDraw.Draw(img)

    r,g,b = rint(0,255), rint(0,255), rint(0,255)
    rh, gh, bh = hex(r)[2:], hex(g)[2:], hex(b)[2:]
    for i in range(300):
        draw.line((i,0,i,300), fill=(int(r),int(g),int(b)))

    img.save(rh + gh + bh + ".png", "PNG")

if __name__ == "__main__":
    randgradient()