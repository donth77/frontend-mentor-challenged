#!/bin/bash 
if [ -f "./config.js" ] ; then
    rm "./config.js"
fi
if [[ ! -e ./config.js ]]; then
    touch ./config.js
fi
echo "export const API_TOKEN = '$1';" >> ./config.js