## patternalism
A study on software design patterns

### The cover generator
Requires Typescript. Builds with `tsc`.

#### ffmpeg
Generate a GIF using a generated palette image
`ffmpeg -i 0001.png -vf palettegen palette.png`
`ffmpeg -f image2 -i %04d.png -i palette.png -filter_complex “fps=15,scale=1920:-1:flags=lanczos[x];[x][1:v]paletteuse” -y sacred.gif`