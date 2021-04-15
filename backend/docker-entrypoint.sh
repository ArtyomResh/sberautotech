#!/bin/bash
set -e

[ -f /vault/.env ] && . /vault/.env

case "$1" in
    start)
        exec yarn start:production
        ;;
    *)
        exec "$@"
esac
