const avisos_delete = document.querySelectorAll('.aviso')

// função para pegar o token csrf do django
// por motivos de segurança para alterar dados(POST, DELETE) o django requer esse token
function getCookie(nome){
    let cookie_csrf = null
    if (document.cookie && document.cookie !== ''){
        const cookies = document.cookie.split(';')
        for (let i = 0; i < cookies.length; i++){
            const cookie = cookies[i].trim()
            
            if (cookie.startsWith(nome + "=")){
                cookie_csrf = decodeURIComponent(cookie.substring(nome.length + 1))
                break
            }
        }
    }
    return cookie_csrf
}

// função pra deletar o aviso
async function deletar_aviso(id,aviso) {
    try {
        const res = await fetch(`/delete/${id}/`, {
            method: 'DELETE',
            headers: {'X-CSRFToken': getCookie('csrftoken')}
        })

        const data = await res.json()

        if (data.status == 'ok'){
            aviso.remove()
        } else {
            alert('erro ao deletar')
        }
    } catch (error) {
        console.log("falha na requisição:", error)
    }
}

// chama a função de deletar aviso sempre que apertar o botão direito
avisos_delete.forEach(aviso => {
    aviso.addEventListener('contextmenu', async e => {
        if (!aviso) return
        e.preventDefault()

        const id = aviso.dataset.id
        if (!id) return

        const confirmar = confirm("deseja excluir esse aviso?")
        if (!confirmar) return

        await deletar_aviso(id,aviso)
    })
})