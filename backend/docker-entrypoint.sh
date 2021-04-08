#!/bin/bash
set -e

case "$1" in
    start)
        exec yarn start:production
        ;;
    *)
        exec "$@"
esac
