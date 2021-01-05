## ABOUT
The project uses the *discrete Fourier transform (DFT)* algorithm to build an application that replicates whatever is drawn by representing it as a series of epicycles. In other words, the application aims at obtaining the fourier series representation of the drawing, in a similar way in which it is obtained for a sqaure or a triangular wave. The DFT converts a finite sequence of equally-spaced samples of a function into a same-length sequence of equally-spaced samples of the discrete-time Fourier transform (DTFT), which is a complex-valued function of frequency. Each *complex-valued* term in this sequence can be interpreted as an epicycle which has certain specific characteristics -- radius, frequency of the phasor and initial phase. For simplicity, the terms in the sequence are ordered by decreasing magnitude. The center of the epicycle corresponding to the first term is chosen strategically to fit the drawing on the black-board. The center of every epicycle depends on the current phase of the previous epicycle. The trajectory of the circumferential point on the last epicycle where it intersects its phasor, creates the drawing.

<img src = 'README_IMAGES/PIC_O1.png'>
<img src = 'README_IMAGES/PIC_O2.png'>
