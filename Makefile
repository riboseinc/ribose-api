# (c) 2017 Ribose Inc.

DIRS    := sections
DEPS    := $(foreach dir, $(DIRS), $(wildcard $(dir)/*))
HERCULE  = hercule
TARGET   = apiary.apib

.PHONY: build clean rebuild

$(TARGET): input.apib $(DEPS)
	$(HERCULE) $< -o $@

build: $(TARGET)

clean:
	- rm $(TARGET)

rebuild: clean build
