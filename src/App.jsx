import { useState } from "react"
import "./styles.css"

export default function App() {
  const [newItem, setNewItem] = useState("")
  //quand setNewItem est appelé ==> re-run tout le component. On peut changer la valeur directement dans lec omponent car unique
  const [todos, setTodos] = useState([]) // empty array (reviendra vide a chaque fois)=> pour modifier les todos, necessité de passer par une fonction qui prend currentTodo comme parametre et qui cumulera les todos

  const submit = (event) => {
    event.preventDefault() //empeche la page de se rafraichir quand on clique sur add

    setTodos((currentTodos) => {
      //return a brand new state object
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ]
    })

    // Vider le champ après avoir add un new Item
    setNewItem("")
  }

  const toggleTodo = (id, completed) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          //todo.completed = completed ====> non!
          return { ...todo, completed } // inmutable ==> create brand new state todo
        }
        return todo
      })
    })
  }

  const deleteTodo = (id) => {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id)
    })
  }

  return (
    <>
      <form onSubmit={submit} className="new-item-form" action="">
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            value={newItem}
            onChange={(event) => setNewItem(event.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(event) =>
                    toggleTodo(todo.id, event.target.checked)
                  }
                />
                {todo.title}
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

// !!! Premiers pas en REACT, les termes et les concepts notés ci dessous sont sans doute encore mal compris. Peut contenir des erreurs!!!""
// fonction : lettre capitale, retourne un component (ici jsx) donc la fonction = componant
// Ne peut renvoyer qu'un seul component

// a frangment = an empty tag

// useState() = hook from react
// => newItem  =state est inmutable donc on ne peut pas en changer sa valeur autrement qu'en passant par sa fonction setNewItem

// Pour actualiser une valeur :
// -> directement dans le code si 1 valeur
// -> sinon, currentValue a modifier dans une fonction pour que les valeurs puissent etre compilées.

//toggleTodo : to determine if checked or not
