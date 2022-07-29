const loadInicialTemplate =  () =>{
    const template = `
    <h1>Usuarios</h1>
    <form id="user-form">
        <div>
            <label>Nombre</label>
            <input name="name"/>
        </div>
        <div>
            <label>Apellido</label>
            <input name="lastname"/>
        </div>
        <div>
            <label>Edad</label>
            <input name="edad"/>
        </div>
        <button type="submit">Enviar</button>
    </form>
    <ul id="user-list"></ul>
    `
    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = template
}

const templateUser = user => `<li>${user.name} ${user.lastname} ${user.edad} <button data-id="${user._id}">Eliminar</button></li>`


const getUsers = async ()=>{
    const res = await fetch('/users')
    const data = await res.json()
    const userList = document.getElementById('user-list')
    userList.innerHTML = data.map(user => templateUser(user)).join('')
    data.forEach(user => {
        const  userNode = document.querySelector(`[data-id="${user._id}"]`)
        userNode.onclick = async () => {
            await fetch(`/users/${user._id}`, {
                method:'DELETE'
            })
            userNode.parentNode.remove()
            alert('Elemento Eliminado')
        }
    });

}

const addListenerForm = ()=>{
    let userFrom = document.getElementById('user-form')
    userFrom.onsubmit = async (e) =>{
        e.preventDefault()
        const fromData = new FormData(userFrom)
        const data = Object.fromEntries(fromData.entries())
        await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers : {
                'Content-Type': 'application/json'
            }
        })
        userFrom.reset()
        getUsers()
    }
}


window.onload = ()=>{
    loadInicialTemplate()
    addListenerForm()
    getUsers()
}
