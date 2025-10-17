const botao = document.getElementById('abrir-form')
const botao2 = document.getElementById('fechar-form')
const form_container = document.getElementById('form-container')


botao.addEventListener('click', () => {
    form_container.classList.toggle('hidden')
});

botao2.addEventListener('click', (e) => {
    e.preventDefault()
    form_container.classList.add('hidden')
    
})