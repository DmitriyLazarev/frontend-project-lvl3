# Makefile
build:
	npm run build

lint:
	npx eslint .

install:
	npm ci

start:
	npx webpack serve
