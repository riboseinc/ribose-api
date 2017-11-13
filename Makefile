# (c) 2017 Ribose Inc.

DIRS    := sections
DEPS    := $(foreach dir, $(DIRS), $(wildcard $(dir)/*))
NPM_BIN := $(shell npm bin)
HERCULE := $(NPM_BIN)/hercule
TARGET   = apiary.apib

.PHONY: build clean rebuild

$(TARGET): input.apib $(DEPS)
	$(HERCULE) $< -o $@

build: $(TARGET)

clean:
	- rm $(TARGET)

rebuild: clean build
