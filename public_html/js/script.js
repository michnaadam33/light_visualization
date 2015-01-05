/*//TODO List
 -textury drogi budynki
 -zatrzymywanie na sterowanie
 -pisać o standardzie kodowania
 -pisać o kontroli
 -pisać jquery
 -pisać bootstrap
 */
var doRender = true;
var poslon = 19972000;
var poslat = 50066000;
if (!Detector.webgl) {

    Detector.addGetWebGLMessage();
    document.getElementById('container').innerHTML = "";
}

var fogExp2 = true;
var container, stats;
var camera, controls, scene, renderer;
var mesh, mat;
var worldWidth = 100, worldDepth = 100,
    worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;
//data = generateHeight(worldWidth, worldDepth);

var clock = new THREE.Clock();
$.when(askLims(),
    askMapzenRoads(582459, 355316),
    askMapzenRoads(582460, 355316),
    askMapzenRoads(582460, 355317),
    askMapzenRoads(582460, 355318),
    askMapzenRoads(582460, 355319),
    askMapzenRoads(582461, 355316),
    askMapzenRoads(582461, 355317),
    askMapzenRoads(582461, 355318),
    askMapzenRoads(582461, 355319),
    askMapzenRoads(582462, 355316),
    askMapzenRoads(582462, 355317),
    askMapzenRoads(582462, 355318),
    askMapzenRoads(582462, 355319),
    askMapzenRoads(582463, 355316),
    askMapzenRoads(582463, 355317),
    askMapzenRoads(582463, 355318),
    askMapzenRoads(582463, 355319),
    askMapzenRoads(582464, 355316),
    askMapzenRoads(582464, 355317),
    askMapzenRoads(582464, 355318),
    askMapzenRoads(582464, 355319),
    askMapzenRoads(582465, 355316),
    askMapzenRoads(582465, 355317),
    askMapzenRoads(582465, 355318),
    askMapzenRoads(582465, 355319)
).done(function () {
        console.log("Start");
        init();
        animate();
    });
function init() {

    container = document.getElementById('lv-container');
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.y = 100;
    controls = new THREE.FirstPersonControls(camera);
    controls.movementSpeed = 500;
    controls.lookSpeed = 0.125;
    controls.lookVertical = true;
    controls.constrainVertical = true;
    controls.verticalMin = 1.1;
    controls.verticalMax = 2.2;
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.00015);
    // sides

    var light = new THREE.Color(0xffffff);
    var shadow = new THREE.Color(0x505050);
    var matrix = new THREE.Matrix4();
    var lightPoints = new THREE.BoxGeometry(10, 10, 10);
    var pyGeometryRout = new THREE.PlaneGeometry(100, 100);
    pyGeometryRout.applyMatrix(matrix.makeRotationX(-Math.PI / 2));
    pyGeometryRout.applyMatrix(matrix.makeTranslation(0, 50, 0));
    var pyGeometryPlace = new THREE.PlaneGeometry(100, 100);
    pyGeometryPlace.applyMatrix(matrix.makeRotationX(-Math.PI / 2));
    pyGeometryPlace.applyMatrix(matrix.makeTranslation(0, 50, 0));
    var pyGeometry = new THREE.PlaneGeometry(100, 100);
    //pyGeometry.faces[ 0 ].vertexColors = [light, light, light];
    //pyGeometry.faces[ 1 ].vertexColors = [light, light, light];
    pyGeometry.faceVertexUvs[0][0][1].y = 0.5;
    pyGeometry.faceVertexUvs[0][1][0].y = 0.5;
    pyGeometry.faceVertexUvs[0][1][1].y = 0.5;
    pyGeometry.applyMatrix(matrix.makeRotationX(-Math.PI / 2));
    pyGeometry.applyMatrix(matrix.makeTranslation(0, 50, 0));
    //
    placeLights(scene);
    //

    var geometry = new THREE.Geometry();
    var road = new THREE.Geometry();
    var places = new THREE.Geometry();

    var lightsPoints = new THREE.Geometry();
    var dummy = new THREE.Mesh();
    for (var z = 0; z < worldDepth; z++) {
        for (var x = 0; x < worldWidth; x++) {


            matrix.makeTranslation(
                x * 100 - worldHalfWidth * 100,
                10,
                z * 100 - worldHalfDepth * 100
            );
            if (isHereRoute(x, z)) {
                road.merge(pyGeometryRout, matrix);
            } else if (isHerePlaces(x, z)) {
                places.merge(pyGeometryPlace, matrix);
            }
            else {
                geometry.merge(pyGeometry, matrix);
            }

        }

    }

    var textureRoad = THREE.ImageUtils.loadTexture('textures/minecraft/atlas2.png');
    var textureEarth = THREE.ImageUtils.loadTexture('textures/minecraft/atlas.png');
    textureEarth.magFilter = THREE.NearestFilter;
    textureEarth.minFilter = THREE.LinearMipMapLinearFilter;
    textureRoad.magFilter = THREE.NearestFilter;
    textureRoad.minFilter = THREE.LinearMipMapLinearFilter;
    var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
        map: textureEarth,
        ambient: 0xbbbbbb,
        vertexColors: THREE.VertexColors
    }));
    scene.add(mesh);
    var mesh2 = new THREE.Mesh(road, new THREE.MeshLambertMaterial({
        map: textureRoad,
        ambient: 0xbbbbbb,
        vertexColors: THREE.VertexColors
    }));
    scene.add(mesh2);


    var material = new THREE.MeshBasicMaterial({color: 0xf1f1f1});
    var meshPlace = new THREE.Mesh(places, material);
    scene.add(meshPlace);

    var ambientLight = new THREE.AmbientLight(0xcccccc);
    scene.add(ambientLight);
    var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(1, 1, 0.5).normalize();
    scene.add(directionalLight);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);


    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
}

function loadTexture(path, callback) {

    var image = new Image();
    image.onload = function () {
        callback();
    };
    image.src = path;
    return image;
}

function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}

$('#lv-control-modal').on('hidden.bs.modal', function (e) {
    doRender = true;
})
window.addEventListener('keydown', function (event) {
    var key = event.keyCode;
    if (key == 32) {
        $('#lv-control-modal').modal('show')
        doRender = false;
    }
}, false);
function render() {
    if (doRender === true) {
        controls.update(clock.getDelta());
        renderer.render(scene, camera);
    }
}

function placeLights(scene) {
    $.when.apply(null, lightsCoorData.map(function (lightCoorData) {
        if (lightCoorData.type == "l") {
            return askLimsDet(lightCoorData);
        }
    })).done(function () {
        for (var i in window.lightsCoor) {
            var geometry = new THREE.SphereGeometry(5, 32, 32);
            var material = new THREE.MeshBasicMaterial({color: getColor(lightsCoor[i].params)});
            var lightObj = new THREE.Mesh(geometry, material);

            var lon = lightsCoor[i].lon * 10 - 5000;
            var lat = lightsCoor[i].lat * 10 - 5000;
            lightObj.position.set(lon, 100, lat);
            scene.add(lightObj);


        }
    });


    var light = new THREE.PointLight(0xffffff);
    light.position.set(-10, 100, 10);
    scene.add(light);
}
function isHereRoute(x, z) {
    if (routeCoor.length == 0) {
        console.log("No outeCoor ERRoR");
    }
    for (var i in routeCoor) {

        var lastPoint = routeCoor[i][0];
        for (var j = 1; j < routeCoor[i].length; ++j) {

            var point = routeCoor[i][j];
            var lon = parseInt(point.lon / 10);
            var lat = parseInt(point.lat / 10);

            if (lon == x && lat == z) {
                return true;
            }

            var lonLast = Math.round(lastPoint['lon'] / 10);
            var latLast = Math.round(lastPoint['lat'] / 10);
            if ((Math.min(lat, latLast) <= z) && (z <= Math.max(lat, latLast)) &&
                (Math.min(lon, lonLast) <= x) && (x <= Math.max(lon, lonLast))) {
                return true;
            }

            lastPoint = point;
        }

    }
    return false;
}

function isHerePlaces(x, z) {
    if (placesCoor.length == 0) {
        console.log("places Corr ERRoR");
    }
    for (var i in placesCoor) {
        var lastPoint = placesCoor[i][0];
        for (var j = 1; j < placesCoor[i].length; ++j) {

            var point = placesCoor[i][j];
            var lon = parseInt(point.lon / 10);
            var lat = parseInt(point.lat / 10);
            if (lon == x && lat == z) {
                return true;
            }

            var lonLast = Math.round(lastPoint['lon'] / 10);
            var latLast = Math.round(lastPoint['lat'] / 10);
            if ((Math.min(lat, latLast) <= z) && (z <= Math.max(lat, latLast)) &&
                (Math.min(lon, lonLast) <= x) && (x <= Math.max(lon, lonLast))) {
                return true;
            }

            lastPoint = point;
        }

    }
    return false;
}
function getColor(param) {
    if (param == 0) {
        return 0;
    } else if (param < 10) {
        return 0x7f6000;
    } else if (param < 20) {
        return 0xb28700;
    } else if (param < 30) {
        return 0xcc9a00;
    } else if (param < 40) {
        return 0xffc100;
    } else if (param < 50) {
        return 0xffcd32;
    } else if (param < 60) {
        return 0xffd966;
    } else if (param < 70) {
        return 0xffe07f;
    } else if (param < 80) {
        return 0xffecb2;
    } else if (param < 90) {
        return 0xfff2cc;
    } else {
        return 0xffffff;
    }
}