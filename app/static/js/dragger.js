const postit = document.querySelector('.postit')
const avisos = document.querySelectorAll('.aviso')
let dragging = false
let offsetX, offsetY
let atual = null

// função para pegar as coordenadas do aviso ao pressionar o mouse
avisos.forEach(aviso => {
    aviso.addEventListener('mousedown', (e) => {
        // garante que a função só continue caso seja o botão esquerdo que é pressionado
        if (e.button !== 0) {
            e.preventDefault()
            return
        }

        e.preventDefault()
        dragging = true
        atual = aviso

        const aviso_medida = atual.getBoundingClientRect()
        const postit_medida = postit.getBoundingClientRect()

        offsetX = e.clientX - aviso_medida.left
        offsetY = e.clientY - aviso_medida.top
        
        atual.style.position = 'absolute'
        atual.style.left = `${aviso_medida.left - postit_medida.left}px`
        atual.style.top = `${aviso_medida.top - postit_medida.top}px`
        atual.style.zIndex = 1000

        document.addEventListener('mousemove', onmousemove)
        document.addEventListener('mouseup', onmouseup)

    })
})

// função para salvar a posição do aviso no localstorage do navegador
// garante a posição de cada aviso ao dar f5 na página ou adicionar um novo aviso
function salvar_posicao(id,x,y){
    const posicao = JSON.parse(localStorage.getItem('posicoes') || "{}")
    posicao[id] = {x,y}
    localStorage.setItem('posicoes',JSON.stringify(posicao))
}

// carrega o aviso na posição salva
function carregar_posicao(){
    const posicoes = JSON.parse(localStorage.getItem('posicoes') || "{}")
    Object.entries(posicoes).forEach(([id,pos]) => {
        const aviso = document.querySelector(`.aviso[data-id="${id}"]`)
        if (aviso){
            aviso.style.left = `${pos.x}px`
            aviso.style.top = `${pos.y}px`
            aviso.style.position = 'absolute'
        }
    })
}

// chamada da função de carregar o aviso assim que a página for carregada
window.addEventListener('DOMContentLoaded', carregar_posicao)

// função que muda a posição do aviso na direção em que o mouse é arrastado
function onmousemove(e){
    if(!dragging || !atual) return

    postit_medida = postit.getBoundingClientRect()

    let newX = e.clientX - postit_medida.left - offsetX
    let newY = e.clientY - postit_medida.top  - offsetY

    atual.style.left = `${newX}px`
    atual.style.top = `${newY}px`
}

// função para soltar o postit no quadro assim que se soltar o mouse
// também chama a função de salvar a posição do aviso
function onmouseup(){
    dragging = false
    
    const medida_postit = postit.getBoundingClientRect()
    const medida_atual = atual.getBoundingClientRect()

    const x = medida_atual.left - medida_postit.left
    const y = medida_atual.top - medida_postit.top

    salvar_posicao(atual.dataset.id, x, y)

    document.removeEventListener('mousemove', onmousemove)
    document.removeEventListener('mouseup', onmouseup)

    atual.style.position = 'absolute'
    atual = null
}
