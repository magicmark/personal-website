all: build

node_modules: yarn.lock
	yarn

.SILENT:
.env:
	echo "ENGINE_API_KEY=${ENGINE_API_KEY}" > .env

.PHONY: build
build: .env node_modules
	yarn build

publish-schema: .env build
	./tools/printSDL.js > schema.graphql
	yarn publish-schema