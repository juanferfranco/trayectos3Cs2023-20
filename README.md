## Visualización de la presentación

La presentación se puede ver [aquí](https://juanferfranco.github.io//trayectos3Cs2023-20/).

## Control remoto

Se pueden hacer pruebas de control remoto de la presentación usando la consola de depuración de pubnub.

* En la raíz del proyecto se debe crear el archivo config.js con la siguiente información:

```js
var CONFIG = {
    pubnub_publish_key: 'pub-c-key',
    pubnub_subscribe_key: 'sub-c-key',
    userId: 'set any name'
};
```
* Las key se obtienen luego de configurar una aplicación en pubnub

## Correr localmente la presentación

Seguir las recomendaciones de la página oficial de reveal.js [aquí](https://revealjs.com/installation/#full-setup).  
