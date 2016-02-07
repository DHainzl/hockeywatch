// TODO Replace with a gulp

const fs = require('fs');

fs.readFile('assets/js/config.sample.js', 'utf8', (err, data) => {
	if (err) throw err;
	data = data.replace('__API_KEY__', process.env.HOCKEYWATCH_API_KEY);
	data = data.replace('__API_REF__', process.env.HOCKEYWATCH_API_REF);

	fs.writeFile('assets/js/config.js', data, 'utf8', (err) => {
		if (err) throw err;
		console.log('Deployment successful!');
	});
});