# (c) 2017 Ribose Inc.

DIRS    := sections
DEPS    := $(foreach dir, $(DIRS), $(wildcard $(dir)/*))
HERCULE  = hercule

apiary.apib: input.apib $(DEPS)
	$(HERCULE) $< -o $@

