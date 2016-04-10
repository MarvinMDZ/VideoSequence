# VideoSequence
Con este script podrás reproducir una secuencia de imágenes para tus creatividades de Sizmek.

Para utilizar el script, cárgalo en tu creatividad de la siguiente forma:

```html
<script type="text/javascript" src="videoSequence.js"></script>
``` 

Una vez tengamos cargado el script, podemos crear nuestra instancia para la video secuencia, pasandole los parámetros que queramos. El contenedor para imágenes,número de estas, duración y el listado de ficheros a cargar son obligatorios.

```javascript
var miSecuencia = new videoSequence({ secondsNum:30,
                                        imageNum:200,
                                        filesToBuffer: 2,
                                        sequenceContainer: imageHolder,
                                        filesPath: ["/assets/images01.js",
                                                    "/assets/images02.js",
                                                    "/assets/images03.js",
                                                    "/assets/images04.js",
                                                    "/assets/images05.js",
                                                    "/assets/images06.js"]
                                      });
```
Este script permite ejecutar funciones en los quartiles de reproducción. Este es el listado de parámetros que podemos utilizar al crear la instancia.

| Nombre | Descripción |
| --- | --- |
| secondsNum | Duración de la secuencia. |
| imageNum | Número total de imágenes de la secuencia. |
| filesToBuffer | Número de ficheros a cargar antes de comenzar la reproducción. |
| filesPath |	Array con las rutas relativas a los ficheros de imágenes. |
| onBufferStart | Función que se ejecutará cuando comience la carga de ficheros. |
| onBufferComplete | Función que se ejecutará cuando se hayan cargado todos los ficheros. |
| onSequenceStart | Función que se ejecutará cuando comience la reproducción de la secuencia. |
| onSequence25 | Función que se ejecutará en el 25% de la reproducción. |
| onSequence50 | Función que se ejecutará en el 50% de la reproducción. |
| onSequence75 | Función que se ejecutará en el 75% de la reproducción. |
| onSequenceComplete | Función que se ejecutará en el 100% de la reproducción. |
| onSequencePlay | Función que se ejecutará cuando comience la reproducción de la secuencia. |
| onSequenceStop | Función que se ejecutará cuando se detenga la secuencia. |

Ya tenemos nuestra instancia lista para inicializarse. 

```javascript
miSecuencia.init();
```

Podemos controlar nuestra secuencia de imágenes mediante uno de los siguientes métodos:

```javascript

//Inicializa la video secuencia y comienza la carga de ficheros.Cuando se han cargado
//el numero de ficheros marcados por la propiedad filesToBuffer comienza la reproducción de la secuencia.
miSecuencia.init()


//Detiene la carga de ficheros de imágenes. Si posteriormente se necesita utilizar
//la video secuencia habría que volver a inicializarla con el método init().
miSecuencia.stopBuffering()


//Comienza la reproducción de la secuencia. Este metodo fuerza a la secuencia a mostrarse
//incluso si no se han cargado el número de ficheros marcados por la propiedad filesToBuffer,
//sólo se recomienda su uso cuando estamos seguros de tener nuestras imágenes disponibles.
miSecuencia.startSequence()


//Reanuda la reproducción de la secuencia de imágenes.
miSecuencia.resumeSequence()


//Detiene la reproducción de la secuencia de imágenes.
miSecuencia.stopSequence()


```
