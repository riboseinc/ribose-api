# (c) 2017 Ribose Inc.

DIRS    := sections
DEPS    := $(foreach dir, $(DIRS), $(wildcard $(dir)/*))
TARGET   = apiary.apib

.PHONY: build clean rebuild

$(TARGET): input.apib $(DEPS)
	npm run compile

build: $(TARGET)

clean:
	- rm $(TARGET)

rebuild: clean build
