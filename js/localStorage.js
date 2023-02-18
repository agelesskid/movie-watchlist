export const listFromLocalStorage = JSON.parse(localStorage.getItem('myList'))

export function addToLocalStorage(id, arr){
    if(listFromLocalStorage){
        arr = listFromLocalStorage
    }
    if(arr.indexOf(id) === -1){
        arr.push(id)
    }
    localStorage.setItem('myList', JSON.stringify(arr))
}

export function removeFromLocalStorage(item){
    let arr = listFromLocalStorage
    arr.splice(arr.indexOf(item), 1)
    localStorage.setItem('myList', JSON.stringify(arr))
}