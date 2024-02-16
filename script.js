document.getElementById('send-button').addEventListener('click', function() {
    sendMessage();
  });
  
  document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
      appendMessage('user', userInput);
     appendMessage('bot', 'Sorry, I am just a basic replica. I cannot respond to your query.');
      // getChatGPTResponse(userInput)
      // .then(response => {
      //   appendMessage('bot', response);
      // })
      // .catch(error => {
      //   console.error('Error fetching response:', error);
      //   appendMessage('bot', 'Sorry, something went wrong.');
      // });
      document.getElementById('user-input').value = '';
      document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    }
  }
  
  function appendMessage(sender, message) {
    var chatBox = document.getElementById('chat-box');
    var newMessage = document.createElement('div');
    newMessage.classList.add('chat-message', sender);
    newMessage.textContent = message;
    chatBox.appendChild(newMessage);
  }
  


  async function getChatGPTResponse(userInput) {
    const apiKey = '';
  
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userInput }
          ]
        })
      });
  
      const responseData = await response.json();
      console.log(responseData.choices[0].message.content);
      return responseData.choices[0].message.content;
    } catch (error) {
      throw new Error('Error fetching GPT response: ' + error.message);
    }
  }
