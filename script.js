function centrarMapa(fromProjection, toProjection) {
    let lat = 41.3887900;
    let lon = 2.1589900;

    map = new OpenLayers.Map("demoMap");
    var mapnik = new OpenLayers.Layer.OSM();
    var position = new OpenLayers.LonLat(lon, lat).transform(fromProjection, toProjection);
    var zoom = 13; 

    map.addLayer(mapnik);
    map.setCenter(position, zoom);

}
function marcador(fromProjection, toProjection) {
    layer_marcador = new OpenLayers.Layer.Markers("Marcador");

    map.addLayer(layer_marcador);

    var marker = new OpenLayers.Marker(new
        OpenLayers.LonLat(2.1589900, 41.3887900).transform(
            fromProjection,
            toProjection
        ));

    layer_marcador.addMarker(marker);

    layer_marcador.events.register('mousedown', marker, function() {

            const popup = new OpenLayers.Popup(
                "popup",
                this.lonlat,
                new OpenLayers.Size(150, 200),
                "Barcelona",
                true
            )
            map.addPopup(popup);
 
    })
}

let click = document.getElementById("enviar");

click.addEventListener("click", function() {
    let fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    let toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection

    layer_marcador = new OpenLayers.Layer.Markers("Marcador");

    map.addLayer(layer_marcador);

    let latitud = document.getElementById("latitud").value;
    let longitud = document.getElementById("longitud").value;
    let nom = document.getElementById("nom").value;

    var marker = new OpenLayers.Marker(new
        OpenLayers.LonLat(longitud, latitud).transform(
            fromProjection,
            toProjection
        ));

    layer_marcador.addMarker(marker);

    layer_marcador.events.register('mousedown', marker, function() {
 
            const popup = new OpenLayers.Popup(
                "popup",
                this.lonlat,
                new OpenLayers.Size(150, 200),
                nom,
                true
            )
            map.addPopup(popup);
 
    })
})

function buscarMuseu() {
    let xhr = new XMLHttpRequest();
    let url = `http://dades.eicub.net/api/1/ateneus`;

    xhr.onreadystatechange = function() {
        if(this.status == 200 && this.readyState == 4) {
            let datos = JSON.parse(this.responseText);

            for(let i = 0; i < datos.length; i++) {

                let fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
                let toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
            
                layer_marcador = new OpenLayers.Layer.Markers("Marcador");
            
                map.addLayer(layer_marcador);
    
                
                var marker = new OpenLayers.Marker(new
                    OpenLayers.LonLat(datos[i].Longitud, datos[i].Latitud).transform(
                        fromProjection,
                        toProjection
                    ));
            
                layer_marcador.addMarker(marker);
            
                layer_marcador.events.register('mousedown', marker, function() {
             
                        const popup = new OpenLayers.Popup(
                            "popup",
                            this.lonlat,
                            new OpenLayers.Size(150, 200),
                            datos[i].Equipament,
                            true
                        )
                        map.addPopup(popup);
             
                })

            }

        }
    }

    xhr.open("GET", url);
    xhr.send();
}


function inicio() {
    let fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    let toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection

    centrarMapa(fromProjection, toProjection);
    marcador(fromProjection, toProjection);
    buscarMuseu();
}


window.addEventListener("load", inicio);