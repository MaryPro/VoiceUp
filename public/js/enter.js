// // const startBtn = document.querySelector('#startBtn');
// const addName = document.getElementById('addName')

// addName.addEventListener('submit', async (e) => {
//   e.preventDefault()
//   const {action, method, username: {value: username}} = e.target;
//   const response = await fetch(action, {
//     method,
//     headers: {"Content-type": "application/json"},
//     body: JSON.stringify({username: username})
//   })
//   const data = await response.json();
//   console.log(data);
//   left.innerText = ''
//   left.innerHTML = `
//   <p class="userName">Name: ${data}</p>
//   `;
// })
