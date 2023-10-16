## IMPORTANTE

Esta versión de la presentación no tiene el control remoto. Para 
hacer el control remoto dejo algunas indicaciones más abajo.

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
* Las key se obtienen luego de configurar una aplicación en pubnub.

El index.html se debe modificar así:

```html
<script src="dist/reveal.js"></script>
<script src="plugin/notes/notes.js"></script>
<script src="plugin/markdown/markdown.js"></script>
<script src="plugin/highlight/highlight.js"></script>
<script src="https://cdn.pubnub.com/sdk/javascript/pubnub.7.3.3.min.js"></script>
<script src="plugin/pubnub-remote-control.js"></script>
<script src="config.js"></script>

<script>
    // More info about initialization & config:
    // - https://revealjs.com/initialization/
    // - https://revealjs.com/config/
    Reveal.initialize({
        hash: true,
        width: 1280,
        height: 720,
        transition: "slide",
        autoPlayMedia: true,
        pubnubRemoteControl:{
        publishKey : CONFIG.pubnub_publish_key,
        subscribeKey : CONFIG.pubnub_subscribe_key,
        userId : CONFIG.userId},
        // Learn about plugins: https://revealjs.com/plugins/
        plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ],
        dependencies: [
        { src: 'plugin/pubnub-remote-control.js', async: true, condition: function() { return !!document.body.classList; } },
        
        ]
    });
</script>
```

## Correr localmente la presentación

Seguir las recomendaciones de la página oficial de reveal.js [aquí](https://revealjs.com/installation/#full-setup).  
