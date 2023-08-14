# GPT-API

1. If your current directory is Main run : node src/server.js : Server is running on 3000 should be the output
2. If dependencies are not installed run : npm i express, npm i axios, npm i node-cron

API End-Points

1. '/gold-price' : No parameter
2. '/gold-item' : JSON body with required fields
3. '/update-price/:itemId' : ItemId as parameter
4. '/gold-prices' : Optional query parameter ItemId, Timerange

More on PostMan Documentation
