// Make connection

const socket = io.connect('http://localhost:4000');

// query DOM

const message = document.getElementById('message'),
	handle = document.getElementById('handle'),
	btn = document.getElementById('send'),
	output = document.getElementById('output'),
	feedback = document.getElementById('feedback');

// Emit events

btn.onclick = () => {
	if (!message.value.length > 0 || !handle.value.length > 0) {
		alert('Please enter your name and message');

		return;
	}

	socket.emit('chat', {
		message: message.value,
		handle: handle.value,
	});
};

message.onkeypress = () => {
	socket.emit('typing', handle.value);
};

// Listen for socket events

socket.on('chat', (data) => {
	feedback.innerHTML = '';
	output.innerHTML += `
        <p>
            <strong>${data.handle}:</strong>
            ${data.message}
        </p>`;
});

socket.on('typing', (data) => {
	feedback.innerHTML = `
        <p>
            <em>${data} is typing a message...</em>
        </p>
    `;
});
