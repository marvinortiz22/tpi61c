var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td><td class='eliminar'><u>Eliminar</u></td></tr>";
var productos=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "electronicos":code="c1";break;
	    case "joyerias":code="c2";break;
		case "caballeros":code="c3";break;
		case "damas":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	function listarProductos(productos) {
	  var precio=document.getElementById("price");
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	  var num=productos.length;
	  var listado=document.getElementById("listado");
	  var ids,titles,prices,descriptions,categories,fotos;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price");
	  eliminar=document.getElementsByClassName("eliminar");   
	  
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=productos[nfila].id;
		titles[nfila].innerHTML=productos[nfila].title;
		descriptions[nfila].innerHTML=productos[nfila].description;
		categories[nfila].innerHTML=productos[nfila].category;
		eliminar[nfila].setAttribute("onclick","eliminiarProducto('"+productos[nfila].id+"')")
		catcode=codigoCat(productos[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+productos[nfila].price;
		fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
		
		}
	}


function eliminiarProducto(id){
	
	var delresult;
	fetch("https://retoolapi.dev/gyKpqF/productos/"+id+"",
	{method:"DELETE"})
	.then(response=>response.json())
	.then(data=>delresult=data);
	delresult;
	obtenerProductos()
}



function ingresarProducto(){
	var producto={
		title:document.getElementById("titulo").value,
		price:document.getElementById("precio").value,
		description:document.getElementById("descripcion").value,
		image:document.getElementById("imagen").value,
		category:document.getElementById("categoria").value
	}
	var addresult	
	fetch("https://retoolapi.dev/gyKpqF/productos",
	{method:"POST",
	body: JSON.stringify(producto),
	headers: {
		'Accept': 'application/json',
		'Content-type': 'application/json; charset=UTF-8',
	}
})
.then(response=>response.json())
.then(data=>addresult=data);
obtenerProductos()
}

function obtenerProductos() {
	  fetch('https://retoolapi.dev/gyKpqF/productos')
	  
            .then(res=>res.json())
            .then(data=>{productos=data;
				productos.forEach(
					function(producto){
						producto.price=parseFloat(producto.price)
					}
				);
				
				listarProductos(data)})
}

