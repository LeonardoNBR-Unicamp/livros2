
let url = "https://tt905livrosleo.herokuapp.com/database"


async function callFetchWithPost(titulo, autor){
    const options ={
        method : 'POST',
        mode: 'cors',
        headers: {
            'Accept' : 'application/json',
            'content-type' : 'application/json'
        },
        body :JSON.stringify({
            'titulo' : titulo,
            'autor': autor
            
        })
    }
     await fetch (url,options);
}
    async function callFetchWithPut(id, titulo2,autor2){
        const options = {
            method : 'PUT',
            mode: 'cors',
            headers: {
                'Accept' : 'application/json',
                'content-type' : 'application/json'            
            }, 
            body :JSON.stringify({
                banco_dados:{
                    'titulo': titulo2,
                    'autor': autor2
                }
            })
        }
        await fetch(`${url}${id}`, options);
//         .then (async (res)=>{
//             if (res.status >= 200 && res.status <= 300)
//             console.log('deu bom')
//             else
//             console.log('deu ruim')
//     })
//         .catch(e => console.log(e.message))
 }
 async function callFetchWithDelete(id){
    const options = {
        method : 'DELETE',
        mode: 'cors',
        headers: {
            'Accept' : 'application/json',
            'content-type' : 'application/json' 
        }
    }
     await fetch(`${url}${id}`, options);
        //   .then (async (res)=>{
        //             if (res.status >= 200 && res.status <= 300)
        //             console.log('deu bom')
        //             else
        //             console.log('deu ruim')
        //     })
        //         .catch(e => console.log(e.message))
}
function submitPost(){
    console.log("entrei na função");

    const form = document.forms['postForm'];    
    const titulo = form["titulo"].value;
    const autor = form["autor"].value;
    callFetchWithPost(titulo,autor);
    return false; // Evitar o reload da tela.
}

function submitPut(){
    const form = document.forms['putForm'];  
    const id = form["id"].value;  
    const titulo2 = form["titulo2"].value;
    const autor2 = form["autor2"].value;
    callFetchWithPut(id, titulo2,autor2);
    return false; // Evitar o reload da tela.
}

function submitDelete(){
    const form = document.forms['deleteForm'];  
    const id2 = form["id2"].value;  
    callFetchWithDelete(id2);
    return false; // Evitar o reload da tela.}
}