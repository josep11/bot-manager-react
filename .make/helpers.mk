## Help
help:
	@printf "Available targets:\n\n"
	@awk '/^[a-zA-Z\-\_0-9%:\\]+/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
		helpCommand = $$1; \
		helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
	gsub("\\\\", "", helpCommand); \
	gsub(":+$$", "", helpCommand); \
		printf "  \x1b[32;01m%-35s\x1b[0m %s\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST) | sort -u
	@printf "\n"

## Lists all targets defined in the makefile.
list:
	@$(MAKE) -pRrn : -f $(MAKEFILE_LIST) 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | command grep -v -e '^[^[:alnum:]]' -e '^$@$$command ' | sort

define log-info
	printf "\033[34m%-8s\033[0m %s\n" "info" $(1)
endef

define log-success
	printf "\033[32m%-8s\033[0m %s\n" "success" $(1)
endef

define log-error
	printf "\033[31m%-8s\033[0m %s\n" "error" $(1) >&2
endef

_check-requirement:
	@${COMMAND} --version >/dev/null 2>&1 || (echo "ERROR: ${COMMAND} is required."; exit 1)