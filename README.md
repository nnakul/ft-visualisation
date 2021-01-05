## ABOUT
The project uses the *discrete Fourier transform (DFT)* algorithm to build an application that replicates whatever is drawn by representing it as a series of epicycles. In other words, the application aims at obtaining the fourier series representation of the drawing, in a similar way in which it is obtained for a sqaure or a triangular wave. The DFT converts a finite sequence of equally-spaced samples of a function into a same-length sequence of equally-spaced samples of the discrete-time Fourier transform (DTFT), which is a complex-valued function of frequency. Each *complex-valued* term in this sequence can be interpreted as an epicycle which has certain specific characteristics -- radius, frequency of the phasor and initial phase. For simplicity, the terms in the sequence are ordered by decreasing magnitude. The center of the epicycle corresponding to the first term is chosen strategically to fit the drawing on the black-board. The center of every epicycle depends on the current phase of the previous epicycle. The trajectory of the circumferential point on the last epicycle where it intersects its phasor, creates the drawing.

**NOTE : INDEX.html is the main page of the site**

### PAGE O1 - REPLICATING A DRAWING
On the main page, the user can draw anything. The algorithm computes its discrete Fourier transform and then shows the visualisation to verify how the generated sequence actually represents that drawing. The original number of epicycles (which is also the maximum number of epicycles possible) depends on the number of discrete points in the drawing. The precision and sharpness of the mimicked drawing depends on the number of epicycles the user wants to use. This number can be customised using the scroller below the drawing board. 

<img src = 'README_IMAGES/PIC01.png'>

### PAGE O2 - VISUALIZING DFT ON A PICTURE FROM GALLERY
The main page links to the second page where the user can select any of the available pictures from the gallery. It is interesting to see how the algorithm can represent any drawing by a sequence of sinusoids/epicycles, pretty much like how the Fourier series is calculated for any simple function. Note that the points on the silhouette of these available drawings were not determined manually but a procedure was followed to convert any picture into an **ordered** sequence of points that when joined one after the other, form that very picture. 
<ol>
  <li> Pick any image from the internet. It is strongly advised to select <em>simple line drawings</em> without any filled shapes/components.
  <li> Drop the image in the <a href='https://online.rapidresizer.com/photograph-to-pattern.php'><em>ONLINE STENCIL MAKER</em></a> to turn the image to a black-n-white design/stencil. Adjusting the edges and the sharpness/darkness of the picture, cleans any random or isolated strokes/blots in it that might lead to some stray lines in the replicated drawing. This step is however redundant if the image selected in the first place is a perfect line drawing but anyway, it was observed that passing the image through this stencil-maker improves the results obtained in the final step.
   <li> Keep the stencil's picture in the same directory/folder as the <em>FIND_CONTOUR.py</em> file. Put the name of the picture in its code and execute it. The contour-points will be written in a text document in JSON notation. Copy the entire content and assign it intact to a javascript variable and add this new .js file in the <em>LINE_DRAWINGS</em> folder. Besides, the new javascript file will have to be tethered to the second html page and a button will have to be designed to draw a <em>Fourier replica</em> of the picture.
</ol>
<em>FIND_CONTOUR.py</em> basically solves the Travelling Salesman problem in a naiive manner. Firstly, the pixels in the image are scanned in row-major fashion and the coordinates of the black-colored pixels are pushed in the list. This jumbled sequence of points is ordered by choosing any starting point and finding the nearest unvisited point. This process is continued iteratively until all the points are visited. Note that the contour-points obtained by this method might give some or quite a few stray lines in its replicated version; but still the picture finally created is recognizable and very similar to the picture selected in the first step of the procedure.
<br>

&nbsp;<img src = 'README_IMAGES/PIC02.png' width="400" height="470">&nbsp;&nbsp;&nbsp;&nbsp;<img src = 'README_IMAGES/PIC03.png' width="400" height="470">
