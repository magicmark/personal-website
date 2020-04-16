all: build

node_modules: yarn.lock
	yarn

functions/build:
	make -C functions build

build: node_modules functions/build
	yarn build