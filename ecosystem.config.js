module.exports = {
	apps : [{
		name: 'vts-service',
		script: 'keystone.js',

		// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
		args: 'one two',
		instances: 1,
		autorestart: true,
		watch: false,
		max_memory_restart: '1G',
		env: {
			NODE_ENV: 'development'
		},
		env_production: {
			NODE_ENV: 'production',
			MONGO_URL: 'mongodb://slavon360:slavaUkraini1@ds245647.mlab.com:45647/keystoneapp',
			TELEGRAM_CHATID: '251733133',
			CLOUDINARY_API_SECRET: '4nF764o7kB98DEbb0b9YPnAicrQ',
			CLOUDINARY_API_KEY: '712556615644867',
			CLOUDINARY_NAME: 'dxnslfgii',
			CURRENCY_ID: '5d3ccdd4ffb25d3b12a13164',
			CURRCONV_KEY: 'afa8ca9a116db966afa7'
		}
	}],

	deploy : {
		production : {
			user : 'node',
			host : '212.83.163.1',
			ref  : 'origin/master',
			repo : 'git@github.com:repo.git',
			path : '/var/www/production',
			'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
		}
	}
};
