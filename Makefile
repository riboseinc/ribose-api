# (c) 2017 Ribose Inc.

HERCULE = hercule

apiary.apib: input.apib
	$(HERCULE) $< -o $@

