#!/usr/bin/env bash
ansible-playbook --private-key ~/.ssh/girlsday.pem --become-user root playbook.yml  -vv