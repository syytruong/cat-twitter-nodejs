
console.log('Hello World!');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const mewsElement = document.querySelector('.mews');
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/mews' :  'https://meowtwitter-api.now.sh/';

loadingElement.style.display = '';

listAllMews();

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const formData = new FormData(form);
	const name = formData.get('name');
	const content = formData.get('content');

	const mew = {
		name,
		content
	};

	loadingElement.style.display = '';
	form.style.display = 'none';

	fetch(API_URL, {
		method: 'POST',
		body: JSON.stringify(mew),
		headers: {
			'content-type': 'application/json'
		}
	}).then(response => response.json())
	  .then(createdMew => {
	  	form.reset();
	  	setTimeout(() => {
	  		form.style.display = '';
	  	}, 2000);
	  	listAllMews();
	  });
});

function listAllMews() {
	mewsElement.innerHTML = '';
	fetch(API_URL)
		.then(response => response.json())
		.then(mews => {
			mews.reverse();
			mews.forEach(mews => {
				const div = document.createElement('div');

				const header = document.createElement('h3');
				header.textContent = mews.name;

				const contents = document.createElement('p');
				contents.textContent = mews.content;

				const date = document.createElement('small');
				date.textContent = new Date(mews.created);

				div.appendChild(header);
				div.appendChild(contents);
				div.appendChild(date);

				mewsElement.appendChild(div);
			});
			loadingElement.style.display = 'none';
		});
}