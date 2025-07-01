function removerMajor(id) {
    fetch(`/major/remove/${id}`, { method: 'POST'}).then((response) =>{
        if (response.ok){
            console.log('Major deletado com sucesso');
            window.location.href = '/major'
        }
        else{
            console.log("Erro ao deletar")
        }
    });
}

function removerUser(id) {
    fetch(`/user/remove/${id}`, { method: 'POST'}).then((response) =>{
        if (response.ok){
            console.log('User deletado com sucesso');
            window.location.href = '/user'
        }
        else{
            console.log("Erro ao deletar")
        }
    })
}