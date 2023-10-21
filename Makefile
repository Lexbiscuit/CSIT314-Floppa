.PHONY: install
install: # Install the project dependencies defined in the requirements.txt file.
	npm --prefix ./frontend install
	npm --prefix ./backend install
	rm -rf ./backend/prisma/migrations
