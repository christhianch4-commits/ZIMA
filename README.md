# Zima

Landing page para un growth partner (marketing digital, diseño, AI).
Estética oscura y cinematográfica sobre negro puro, paleta crema cálida
(`#E1E0CC` / `#DEDBC8`), grano SVG y tipografía Almarai + Instrument Serif
itálica.

## Stack

Vite + React 18 + TypeScript + Tailwind CSS 3, framer-motion para las
animaciones y lucide-react para los iconos.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + build de produccion en dist/
npm run preview  # sirve el build de produccion
```

## El hero dia / noche

Dos fotogramas del mismo acantilado, generados con Gemini y alineados entre si,
que se funden con el interruptor del navbar.

- `public/hero-day.mp4` / `hero-night.mp4` — los bucles ya procesados
  (1924x988, 476 fotogramas, 24 fps, ciclo de 19.8 s, ~1.8 MB cada uno)
- `public/hero-day.jpg` / `hero-night.jpg` — los fotogramas fijos: hacen de
  `poster` mientras el video carga, y sustituyen al video por completo si el
  visitante pidio menos animacion
- `assets-src/` — los originales sin tocar, fuera del build

El segundo video no se monta hasta 2.5 s despues de la carga: la primera
pintada solo descarga el de la escena activa. Hasta entonces su capa muestra
el fotograma fijo, asi que el cambio nunca se ve roto.

Los `.mp4` publicados ya vienen recortados y comprimidos. Si regeneras los
originales, vuelve a pasarlos por esto (necesita `brew install ffmpeg`):

```bash
N=$(ffprobe -v error -select_streams v:0 -count_frames \
      -show_entries stream=nb_read_frames -of csv=p=0 assets-src/ORIGINAL-day.mp4)

ffmpeg -y -i assets-src/ORIGINAL-day.mp4 \
  -filter_complex "[0:v]crop=iw:trunc(ih*0.92/2)*2:0:0,split[a][b];\
[b]reverse,trim=start_frame=1:end_frame=$((N-1)),setpts=PTS-STARTPTS[r];\
[a][r]concat=n=2:v=1[v]" \
  -map "[v]" -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p \
  -movflags +faststart public/hero-day.mp4
```

Que hace cada parte: `crop` se lleva el 8% inferior, donde el export estampa su
logo. `reverse` + `concat` montan el bucle en palindromo. `-an` tira el audio,
que va silenciado. `+faststart` mueve el indice al principio del archivo para
que empiece a reproducir antes de descargarse entero. El nombre de salida
**tiene que acabar en `.mp4`**: ffmpeg deduce el formato de la extension.

El `trim` de la vuelta **no es opcional**. Sin el, la vuelta conserva su primer
y ultimo fotograma, que son copias del ultimo de la ida y del primero del
bucle. Son dos imagenes congeladas por ciclo, y a 24 fps se ven como un tiron.
La comprobacion es contar fotogramas: el resultado debe tener `2N-2`, no `2N`.

La camara lenta va **antes**, en un paso aparte, y con interpolacion:

```bash
ffmpeg -y -i assets-src/ORIGINAL-day.mp4 -filter_complex \
  "[0:v]crop=iw:trunc(ih*0.92/2)*2:0:0,setpts=2*PTS,\
minterpolate=fps=24:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1[v]" \
  -map "[v]" -an -c:v libx264 -crf 20 -preset medium slow-day.mp4
```

`setpts=2*PTS` reparte el clip en el doble de tiempo, y `minterpolate` **inventa
los fotogramas que faltan** para llegar a 24 fps reales. Sin ese segundo filtro
tendrias 12 fps con cada imagen repetida, que es lo que se percibe como falta de
fluidez. El paso del palindromo va despues, sobre este archivo, y el `crf 20`
de aqui es a proposito: es intermedio y no conviene comprimirlo dos veces.

El de dia sale a `crf 28` y el de noche a `crf 26`. El plano diurno es luminoso
y con mucho detalle, asi que aguanta mas compresion; el nocturno tiene
degradados oscuros, que son los primeros en mostrar bandas si les quitas bits.

Para cambiar las imagenes basta con reemplazar esos dos archivos manteniendo el
nombre. Si vienen de otra fuente, cuida que **el encuadre coincida**: la mujer,
el poste y la cabana deben caer en las mismas coordenadas, o el fundido se nota.

Dos movimientos en elementos separados (`src/components/HeroScene.tsx`):
parallax ligado al scroll por fuera, y el cross-fade dia/noche de 1.6 s por
dentro.

Hubo un tercero, un Ken Burns en CSS, y esta retirado a proposito. Existia
cuando el hero era una imagen fija; con video encima escalaba de forma continua
una capa de 1924 px, que hay que resamplear en cada fotograma, y competia con
el movimiento que ya trae el propio plano.

Por el mismo motivo el grano del hero **no usa `mix-blend-mode`**. Mezclar a
pantalla completa sobre un video en marcha obliga al navegador a releer el
fondo en cada fotograma y saca al video de la ruta rapida de composicion del
sistema. Se nota sobre todo en equipos sin motor de video dedicado.

Al cambiar de escena, el video entrante salta a la posicion exacta del
saliente. Las dos tomas son el mismo acantilado con la camara fija, asi que si
no se alinean el fundido arrastra las nubes de un sitio a otro y se lee como
dos clips distintos en vez de un mismo lugar cambiando de luz. Si el entrante
aun no tiene metadatos —el primer cambio puede pillarlo sin cargar— el salto
queda pendiente de su evento `loadedmetadata`.

Cada plancha lleva **su propio scrim**, porque la de dia es mucho mas brillante
y se comeria el texto crema. La de dia ademas lleva un `contrast(1.08)` para
compensar la neblina del render original.

El estado vive en `src/useScene.ts`, se refleja en `<html data-scene>` y se
guarda en `localStorage`. Un script inline en el `<head>` lo restaura antes del
primer pintado, para que no parpadee dia si dejaste noche.

Si una imagen falta o falla, un `onError` la retira y queda un degradado que
aproxima la escena — tambien es lo que se ve mientras descarga.

## Estructura

| Archivo | Contenido |
| --- | --- |
| `src/components/Hero.tsx` | Navbar colgante, interruptor y el titulo "Zima*" |
| `src/components/HeroScene.tsx` | Las dos planchas, parallax, Ken Burns y fundido |
| `src/components/SceneToggle.tsx` | El interruptor sol / luna |
| `src/components/About.tsx` | Titular mixto y parrafo que se revela con el scroll |
| `src/components/Services.tsx` | Los cuatro pilares colgados del tendido electrico |
| `src/components/PillarDiagram.tsx` | Un esquema animado por pilar |
| `src/components/Contact.tsx` | Banda de cierre con la curva y la llamada a la accion |
| `src/components/GrowthPanel.tsx` | Dos trayectorias sobre el ruido, en formato apaisado |
| `src/useReducedMotion.ts` | Detecta `prefers-reduced-motion` |
| `src/components/WordsPullUp.tsx` | Entrada palabra a palabra (con asterisco opcional) |
| `src/components/WordsPullUpMultiStyle.tsx` | Igual, mezclando estilos por segmento |

Las utilidades `.noise-overlay` y `.bg-noise` estan en `src/index.css` y usan
`feTurbulence` embebido como data URI, sin peticiones externas.

## Textos que querras cambiar

- `PROFILE_NAME` y `PROFILE_ROLE` en `About.tsx` — ahora mismo es un marcador.
- `NAV_ITEMS` en `Hero.tsx`.
- `PILLARS` en `Services.tsx` — los cuatro pilares y sus servicios.

## La seccion de servicios

Los cuatro pilares cuelgan de un cable, con los postes del hero como
navegacion. El cable se enciende hasta el pilar activo, que es la forma de
decir que los servicios son un sistema conectado y no cuatro cosas sueltas.

La seccion se auto-avanza cada 5.5 s y **cede el control de forma definitiva**
en cuanto alguien interactua. Tampoco corre si esta fuera de pantalla ni si el
visitante pidio menos animacion.

El tramo encendido se revela con un **rectangulo de recorte**, no con
`strokeDasharray`. Con `pathLength` normalizado, `preserveAspectRatio="none"` y
`vectorEffect="non-scaling-stroke"` a la vez, el patron de guiones se mide en
pixeles de pantalla mientras `pathLength` normaliza en unidades del viewBox: no
coinciden y el trazo se queda corto. El recorte se mide en espacio de usuario y
sigue el estirado exacto.

Los pilares son un `tablist` real: se navegan con flechas y anuncian cual esta
seleccionado.

Cada pilar trae su propio esquema dibujado, no una foto. El hero fija un mundo
muy concreto y una imagen de banco al lado se lee como otra web pegada. Los
esquemas muestran el mecanismo de cada pilar —una interfaz montandose, una
senal expandiendose, trabajo cruzando un nucleo, fases corriendo a un plan— y
se repiten cada vez que cambias de pilar, porque el componente va **keyed** por
id.

El flujo de Automate usa un **patron de guiones en movimiento**, no
`offset-path`. Seria mas limpio con motion path, pero su soporte sobre SVG es
irregular y ademas exige animar `offsetDistance`, no solo declarar la ruta.

La unica dependencia externa que queda son las Google Fonts.
