## patternalism
A study on software design patterns

### The cover generator
Requires Typescript. Builds with `tsc`, runs in `index.html`.
`index.html#FPS=25,frames=125`

#### Frame saver
Is an Express Node app, builds with everything else, runs separately as `node out/framesaver.js`

```
TODO
Moving point fields
Additional FX:
	sum all forces, highpass filter them, render smth cool at maximum points
	force-based color split on elements
More elements and animations:
	not only rotating, but also growing variously
	introduce more solid 3D elements
```

#### ffmpeg
Generate a GIF using a generated palette image
`ffmpeg -i 0001.png -vf palettegen palette.png`
`ffmpeg -f image2 -i %04d.png -i palette.png -filter_complex "fps=15,scale=1920:-1:flags=lanczos[x];[x][1:v]paletteuse" -y sacred.gif`
