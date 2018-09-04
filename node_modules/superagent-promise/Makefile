node_modules: package.json
	npm install

build: components index.js
	@./node_modules/.bin/component build --dev

components: component.json
	@./node_modules/.bin/component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean
