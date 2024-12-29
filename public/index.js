let signup =false;
let todoload = false;

document.getElementById('signup-form').addEventListener("submit",async function(e){
    e.preventDefault();

    console.log("Preventing default form submission."); 

    if(signup) return;
    signup = true;

    let username = document.getElementById("signup-username").value;
    let password = document.getElementById("signup-password").value;

    try{
         const response = await fetch('http://localhost:3000/user/signup',{
                method : 'Post',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({ username, password }),
            });

            let result =  await response.json();
            signup = false;

            if(response.ok){
                document.getElementById("response-message").innerText = result.message || 'Signup successful, please sign in';
                document.getElementById("signup-container").style.display ='none';
                document.getElementById("signin-container").style.display ='block';
            }
            else{
                document.getElementById("response-message").innerText = result.message || 'Signup failed';
            }
    }catch(e){
             signup = false;
             document.getElementById("response-message").innerText = result.message || 'error in singup';
    }
})

    document.getElementById("signin-container").addEventListener("submit",async function(e){
        e.preventDefault();

        let username = document.getElementById("signup-username").value;
       let password = document.getElementById("signup-password").value;

       try{
        const response = await fetch('http://localhost:3000/user/signin',{
               method : 'Post',
               headers:{ 'Content-Type': 'application/json' },
               body:JSON.stringify({ username, password }),
           });

           let result = await response.json();

           if(response.ok){
            localStorage.setItem('token', result.token);
            document.getElementById("signin-container").style.display ='none';
            document.getElementById("todo-container").style.display = 'block';
            document.getElementById('response-message').innerHTML = 
            `Logged in successfully. <a href="#" id="logout-link">Logout</a>`;
            loadTodos();

            document.getElementById("logout-link").addEventListener('click',async function(e){
                e.preventDefault();

                localStorage.removeItem('token');
                document.getElementById("signin-container").style.display ='block';
                document.getElementById("todo-container").style.display = 'none';
                document.getElementById("response-message").innerText = 'you are logged out';
    

               })
              
           }
           else{
            document.getElementById("response-message").innerText =   result.message || 'signin failed';  
           }

        }
        catch(e){
            document.getElementById("response-message").innerText = 'error during sign in';  
        }

    })


    document.getElementById("todo-form").addEventListener('click',async function(e){
        e.preventDefault();
        if(todoload){
            return;
        }
        todoload =true;

        const todoInput = document.getElementById('todo-input');
        const todoText = todoInput.value.trim();

     if (!todoText) {
        todoload = false;
        return;
    }
    const token = localStorage.getItem('token');
    try{

        let response = await fetch('http://localhost:3000/todo' ,{
            method : 'Post',
           headers:{
    'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`,
           },
      body : JSON.stringify({title : todoText})
         });

         const result = await response.json();
         todoload = false;

         if(response.ok){
            todoInput.value = '';
            loadTodos();
         }
         else{
          console.error(result.message);
         }
    
    }
    catch(e){
    todoload = false;
        console.error('Error adding todo:', e); 
    }
    })


   async function loadTodos(){
        const token = localStorage.getItem("token");

        try{
        let response  = await fetch("http://localhost:3000/todo",{
            method :"GET",
           headers : {
            'Authorization': `Bearer ${token}`,
           }

        })

        const {todos} =  await response.json();
        const todosList = document.getElementById("todo-list");
console.log(todos);
        todosList.innerHTML ="";

        todos.forEach((todo)=>{
          const li = document.createElement('li');
          li.textContent = todo.title;

          if (todo.completed) {
            li.style.textDecoration = 'line-through';
        }

         
          else if(!todo.completed){
            const completeButton = document.createElement("button");
            completeButton.textContent = 'Complete';
             completeButton.onclick = () => {
                 completeTodo(todo._id, !todo.completed);
             };
            li.appendChild(completeButton)
           }

        todosList.appendChild(li);
    });
    }
    catch(e){
        console.error("error loading todo",e);
    }
}


async function  completeTodo(id,completed){
    const token = localStorage.getItem("token");
try{
 await fetch(`http://localhost:3000/todo/${id}`,{
    method : "PUT",
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
  body :JSON.stringify({completed})

})
loadTodos();
}
catch(e){
  console.error("error during complition" ,e);
}
}



document.getElementById("show-signin").addEventListener("click",(e)=>{
    e.preventDefault();

    document.getElementById("signup-container").style.display ='none';
    document.getElementById("signin-container").style.display ='block';
})

document.getElementById("show-signup").addEventListener("click",(e)=>{
    e.preventDefault()

    document.getElementById("signup-container").style.display ='block';
    document.getElementById("signin-container").style.display ='none';
})







