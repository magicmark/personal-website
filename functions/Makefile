all: build

node_modules: yarn.lock
	yarn

.env:
	echo "ENGINE_API_KEY=${ENGINE_API_KEY}" > .env

build: .env node_modules
	yarn build