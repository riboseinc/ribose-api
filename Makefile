# (c) 2017 Ribose Inc.

DIRS    := sections
DEPS    := $(foreach dir, $(DIRS), $(wildcard $(dir)/*))
HERCULE  = hercule
TARGET   = apiary.apib

$(TARGET): input.apib $(DEPS)
	$(HERCULE) $< -o $@
