.PHONY: install
install: # install the project dependencies defined in the package.json file.
	npm --prefix frontend install
	npm --prefix backend install
	rm -rf ./backend/prisma/migrations
	npx --prefix backend prisma generate --schema=backend/prisma/schema.prisma
	DATABASE_URL=mysql://root:password@localhost:3306/floppa

.PHONY: update
update: # update the project dependencies defined in the package.json file.
	npm --prefix frontend install
	npm --prefix backend install

