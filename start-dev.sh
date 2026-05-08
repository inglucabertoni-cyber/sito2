#!/bin/bash
export PATH="/opt/homebrew/bin:$PATH"
cd /Users/luca.bertoni/test/prestazioni-app
exec npm run dev -- --port 3001
