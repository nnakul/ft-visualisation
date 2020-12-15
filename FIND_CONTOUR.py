
import matplotlib.pyplot as plt
import numpy as np
from sklearn.neighbors import NearestNeighbors
import networkx as nx
import pygame

pygame.init()
img = pygame.image.load('image.png')  # choose an image first
SCR_WIDTH , SCR_HEIGHT = img.get_rect().size
root = pygame.display.set_mode( (SCR_WIDTH , SCR_HEIGHT) )
img.convert()
POINTS = list()
file = open('object.txt', 'w')

def main(window) :
    root.blit(img, (0,0))
    pygame.display.update()
    for x in range(SCR_WIDTH):
            for y in range(SCR_HEIGHT):
                if (root.get_at( (x,y) )[0] != 255 ):
                    POINTS.append((x,y))
    pygame.quit()

def distance(P1, P2):
    return ((P1[0] - P2[0])**2 + (P1[1] - P2[1])**2) ** 0.5

def optimized_path(coords, start=None):
    if start is None:
        start = coords[0]
    pass_by = coords
    path = [start]
    pass_by.remove(start)
    while pass_by:
        nearest = min(pass_by, key=lambda x: distance(path[-1], x))
        path.append(nearest)
        pass_by.remove(nearest)
    return path

main(root)
start = None
List = POINTS[::2] # choose slicing factor to omit unneccesarily large number of pixels
new_x = list()
new_y = list()
for p in List:
    new_x.append(p[0])
    new_y.append(p[1])

# to view the figure with points connected in the same order
plt.plot(new_x, new_y)
plt.show()

P = list()
path = optimized_path(List)
new_x = list()
new_y = list()
for p in path:
    new_x.append(p[0])
    new_y.append(p[1])

# to view the figure with points connected in the new order
plt.plot(new_x, new_y)
plt.show()

for i in range(len(path)):
    P.append({'x':new_x[i], 'y':new_y[i]})
    file.write(str(P[i])+',\n')
 
file.close()

# now copy the text from the file and store it in the form of an object
# in a javascript variable to be used by the visualisation tool

