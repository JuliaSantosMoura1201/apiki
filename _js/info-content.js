function getDados(post){

    var item = {
        title : post.title.rendered,
        excerpt : post.excerpt.rendered,
        image: post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url,
        alt_image: post._embedded['wp:featuredmedia'][0].alt_text,
        link : post.link,
        slug : post.slug,
        content : post.content.rendered,
        authorName : post._embedded['author'][0].name,
        authorDescription : post._embedded['author'][0].description,
        authorImage : post._embedded['author'][0]['avatar_urls']['96'],
        date : post.date
    }

    return item;
}


function criaElemento(elemento, classeElemento ){
    var elemento = document.createElement(elemento);
    elemento.classList.add(classeElemento);

    return elemento;
}
function criaTitulo(elemento, dado, classeElemento){
    var titulo = criaElemento(elemento, classeElemento);
    titulo.innerHTML = dado;
    titulo.title = dado;
    return titulo;
}

function criaNomeAutor(elemento, dado, classeElemento){
    var nomeAutor = criaElemento(elemento, classeElemento);
    nomeAutor.textContent = "" + dado;
    nomeAutor.title = dado;
    return nomeAutor;
}

function criaImagem(element, data, elClass, altImg){
    var imagem = criaElemento(element, elClass);
    imagem.src = data;
    imagem.alt = altImg;

    return imagem;
}


function criaCard(post){
    var referencia = document.createElement("a");
    referencia.classList.add("post");

    var card = document.createElement("div");
    card.classList.add("card");

    var titulo = criaTitulo("h3", post.title,"post-title");

    var cardIMG = criaImagem("img", post.image, "icone", post.alt_image);

    card.appendChild(cardIMG);
    card.appendChild(titulo);

    card.title = post.title;
    referencia.appendChild(card);
    referencia.href = "interna.html?slug=" + post.slug;

    return referencia;
}

function listOfPost(post, i){
    var dados = getDados(post);
    
    var areaPost = criaCard(dados);

    var area = document.querySelector(".card" + i);

    area.appendChild(areaPost);
}

function createInterna(post){

    var dados = getDados(post);

    //titulo
    document.querySelector("#content-title").innerHTML = dados.title;

    //imagem destacada
    var postIMG = criaImagem("img", dados.image, "interna-thumbnail", dados.alt_image);
    var imgArea = document.querySelector("#content-image");
    imgArea.appendChild(postIMG);


    //resumo

    document.getElementById("content-subtitulo").innerHTML = dados.excerpt;

    //data e nome do autor
    var d = new Date(dados.date);

    var day = ("0" + d.getDate()).slice(-2);
    console.log(d.getMonth());
    var month = parseInt(d.getMonth()) + 1;
    var year = d.getFullYear();

    var m =  ("0" + month).slice(-2);

    var infoAutorNome = dados.authorName;
    var infoData = day + "/" + m + "/" + year;
    
    var authorIMG = criaImagem("img", dados.authorImage, "julia", "");
    var imgAutor = document.querySelector("#imagem_autor");
    imgArea.appendChild(authorIMG);

    document.getElementById("content-publish").textContent = infoAutorNome  + "  " + infoData;


    document.getElementById('content-article').innerHTML = dados.content;


    var authorName = criaNomeAutor("","span", dados.authorName,"nome");
    var nameAuthor = document.querySelector("#area-autor__nome");
    nameAuthor.appendChild(authorName);
}