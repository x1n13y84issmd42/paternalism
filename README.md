## patternalism
A study on software design patterns

### The cover generator
Requires Typescript. Builds with `tsc`.

#### ffmpeg
Generate a GIF using a generated palette image
`ffmpeg -i 01.png -vf palettegen palette.png`
`ffmpeg -f image2 -i %02d.png -i palette.png -filter_complex “fps=15,scale=400:-1:flags=lanczos[x];[x][1:v]paletteuse” -y sacred.gif`