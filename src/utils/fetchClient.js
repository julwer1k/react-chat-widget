
function wait(delay) {
	return new Promise((resolve) => {
		setTimeout(resolve, delay);
	});
}

// Функція для виконання запиту
function request(
	url = '../api/message.json',
	method = 'GET',
	data = null,
) {
	const options = { method };

	if (data) {
		options.body = JSON.stringify(data);
		options.headers = {
			'Content-Type': 'application/json; charset=UTF-8',
		};
	}

	return wait(100)
		.then(() => fetch( url, options))
		.then((response) => {
			if (!response.ok) {
				throw new Error();
			}

			return response.json();
		});
}

export const client = {
	post: (url, data) => request(url, 'POST', data),
};
