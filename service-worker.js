const CACHE_NAME = "vendedor-agua-v1";

const ARQUIVOS = [
    "./",
    "./index.html",
    "./venda.html",
    "./clientes.html",
    "./entregas.html",
    "./produtos.html",
    "./fiado.html",
    "./caixa.html",
    "./relatorios.html",
    "./css/estilo.css",
    "./manifest.json"
];


// INSTALAÇÃO
self.addEventListener("install", function(event) {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(function(cache) {

                return cache.addAll(ARQUIVOS);

            })

    );

    self.skipWaiting();

});


// ATIVAÇÃO
self.addEventListener("activate", function(event) {

    event.waitUntil(

        caches.keys().then(function(nomes) {

            return Promise.all(

                nomes.map(function(nome) {

                    if (
                        nome !== CACHE_NAME
                    ) {

                        return caches.delete(nome);

                    }

                })

            );

        })

    );

    self.clients.claim();

});


// FUNCIONAMENTO OFFLINE
self.addEventListener("fetch", function(event) {

    event.respondWith(

        caches.match(event.request)

            .then(function(resposta) {

                if (resposta) {

                    return resposta;

                }

                return fetch(event.request);

            })

            .catch(function() {

                return caches.match(
                    "./index.html"
                );

            })

    );

});