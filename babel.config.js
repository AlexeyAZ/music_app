module.exports = function(api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				require.resolve('babel-plugin-module-resolver'),
				{
					root: ['./src/'],
					extensions: ['.js', '.jsx', '.android.js', '.ios.js', '.web.js'],
					alias: {
						assets: './src/assets',
						components: './src/components',
						containers: './src/containers',
						screens: './src/screens',
						config: './src/config',
						constants: './src/constants',
						helpers: './src/helpers',
						images: './src/images',
						mocks: './src/mocks',
						modules: './src/modules',
						styles: './src/styles',
						store: './src/store',
						navigation: './src/navigation',
						hocs: './src/hocs',
					},
				},
			],
		],
	}
}
