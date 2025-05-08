default: help

include .make/*.mk

## start
start:
	npm start

## build
build:
	npm run build
	@$(call log-success,"Successfully built")

## build with watch flag
build-watch:
	@echo TODO: implement it

## Install the dependencies
npm/i:
	npm i

## Run npm audit
npm/audit:
	npm audit

## Run npm audit fix (force)
npm/audit-fix:
	npm audit fix --force

## Run update deps for all of them
update-deps:
	ncu -x react-loader-spinner -x web-vitals -x react -x react-dom -u && npm i && npm test

.PHONY: list test build
.PHONY: tag 
.PHONY: all install node_modules
