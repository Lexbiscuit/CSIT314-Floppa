.PHONY: install
<<<<<<< Updated upstream
install: # Install the project dependencies defined in the requirements.txt file.
	npm --prefix ./frontend install
	npm --prefix ./backend install
	rm -rf ./backend/prisma/migrations
=======
install: # install the project dependencies defined in the package.json file.
	npm --prefix frontend install
	npm --prefix backend install
	rm -rf ./backend/prisma/migrations
	npx --prefix backend prisma generate --schema=backend/prisma/schema.prisma
	database_url=postgresql://postgres:password@localhost:5432/postgres?schema=public npx --prefix backend prisma migrate dev --name init --schema=backend/prisma/schema.prisma

.PHONY: update
update: # update the project dependencies defined in the package.json file.
	npm --prefix frontend install
	npm --prefix backend install

>>>>>>> Stashed changes
