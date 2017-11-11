#!/bin/bash

if [[ $(git status --short) ]]
then
  echo "$(tput setaf 3)$(tput setab 1)$(tput bold)"\
    '!!! Apiary.apib is outdated, compile it before merging !!!'\
    "$(tput sgr 0)"
  exit 1
fi
