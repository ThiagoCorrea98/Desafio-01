import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle)
      return;
    
    const newTask = {
      id: Math.random(), // função Math.random()) -> gera um id random para a aplicação
      title: newTaskTitle, //setado no input
      isComplete: false // começar como false, não há razão para adicionar uma task já completa, por isso o false
    }

    setTasks(oldState => [...oldState, newTask]); // uso do oldstate para manter o valor antigo e adicionar um novo, criando um novo espaço na memória
    //salvando no array a nova task  [...] -> spread operator para buscar os valores 'antigos'
    setNewTaskTitle(''); // reseta o input para criar a nova task
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const selectedTasks = tasks.filter(task => task.id !== id); //uso do filter para retornar todos os itens menos o selecionado
    // aqui retornar todas as tasks que forem diferentes da task do id selecionado
    setTasks(selectedTasks); //setando/criando o novo array
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}