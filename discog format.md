# discog format

https://music.astronomy487.com/discog.js is a big json record of every song i've ever released in any capacity. the big object (called `discog`) has two attributes :

- `discog.albums`, an array of Albums i've released
- `discog.remixes`, an array of Songs, each being a remix i have released (i.e. based on someone else's music)

for each of the types below, all fields are optional unless marked as required.

## Album format

an Album contains the following fields :

- `title` (required), a string title for the album
- `compilation`, a boolean indicating if this is a compilation album
- `released` (required), a string in YYYY-MM-DD format for the release date of the album
- `artwork` (required), a url to the album artwork
- `length` (required), the total length of the album (excluding bonus tracks) in seconds. may differ a little from the sum of song lengths because of rounding
- `bcid`, a string identifier used for bandcamp album embeds
- `url`, a Url object (more details below) that links to this album on various platforms
- `color`, a Color object (more details below) for a three-color palette that complements the artwork
- `songs`, a list of Songs present on the album, including bandcamp-exclusive bonus tracks
- `about`, a string message that describes the album

## Song format

songs can either be remixes (found in `discog.remixes`) or non-remixes (found in `discog.albums[i].songs`)

- `title` (required), a string title for the song. a fully formatted song title should include artist ("[Artist] - [Title]").
- `artist`, a string for the artist of the song. if not present, artist is assumed to be "Astro". remixers and featured artists are kept in the title. if a remix has no primary artist listed, then no artist should be presented in a fully formatted song title.
- `length` (required), the length of the song in seconds
- `released`, a string in YYYY-MM-DD format for the release date of the song. required for remixes; non-remixes may inherit release date from the parent album
- `url`, a Url object (more details below) that links to the song on various platforms
- `artwork`, a url to the song artwork. non-remixes may inherit artwork from the parent album
- `bonus`, a boolean indicating if this is a bandcamp-exclusive bonus track. ROSALIE is categorized as a bonus track on mint gum cos i did put it there :P sorry if that's messy
- `lyrics`, a string of lyrics (lines separated by newlines, sections separated by double newlines)
- `color`, a Color object (more details below) for a three-color palette that complements the artwork. non-remixes may inherit color palette from the parent album
- `samples`, a list of strings, where each string is the full name of a song sampled on this song
- `event` a boolean indicating if this is a dj set for an event. if so, then a fully formatted song title should appear as "Astro @ [Title]" (the artist field won't be supplied!)

## Color format

Color objects have just three properties, each of which are a string hex code (e.g. "#FF0000"). they form a little color palette for use with a particular song or album.

- `bg`, the background
- `fg`, the foreground
- `acc`, the accent color

the foreground and accent colors should appear on top of the background. the accent color should only be used for larger/bolder text. the foreground color and accent color should not appear on top of one another!

the foreground and background colors have a contrast ratio of at least 4.5. the accent and background colors have a contrast ratio of at least 3. these meet the WCAG AA accessibility guidelines.

## Url format

a Url object holds urls to an item across streaming platforms. the possible keys are `Bandcamp`, `YouTube`, `YouTube Full Mix`, `Apple Music`, `Spotify`, `Soundcloud`, and `Amazon Music`

## Notes on album artwork

all artworks are stored as urls to a 1200x1200 jpg hosted by bandcamp. these filenames always end with "_10.jpg". the "_10.jpg" in their urls can be replaced with other numbers to obtain different sizes (thanks bandcamp for that):

- "_0.jpg" : the original, max size album artwork (is sometimes actually a png, with a jpg filename!)
- "_1.jpg" : the original, max size album artwork converted to png
- "_2.jpg" : 350x350 jpg
- "_3.jpg" : 100x100 jpg
- "_4.jpg" : 300x300 jpg
- "_5.jpg" : 700x700 jpg
- "_6.jpg" : 100x100 jpg (again!)
- "_7.jpg" : 150x150 jpg
- "_8.jpg" : 124x124 jpg
- "_9.jpg" : 210x210 jpg
- "_10.jpg" : 1200x1200 jpg
- "_11.jpg" : 172x172 jpg
- "_12.jpg" : 138x138 jpg
- "_13.jpg" : 380x380 jpg
- "_14.jpg" : 368x368 jpg
- "_15.jpg" : 135x135 jpg
- "_16.jpg" : 700x700 jpg (again!)