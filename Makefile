# (c) 2017 Ribose Inc.

HERCULE = hercule

apiary.apib: input.md
	$(HERCULE) $< -o $@

