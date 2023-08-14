const express = require('express');
const axios = require('axios');
const GoldItem = require('../models/gold-items');

const { goldPriceGenerate, filterPricesByTimeRange, calculateBestPrice } = require('../utils');

const router = express.Router();
router.use(express.json());

// -------------------- Main ---------------------------

router.get('/gold-price', (req,res) => {  // Mock gold Price -- on
    try{
        const price = goldPriceGenerate();

        res.send({ gold_price: price});
    }
    catch (error){
        res.status(500).json({ error: 'Internal Server error'})
    }
});

router.post('/gold-item', async (req, res) => {  // just to add an item -- on
    try {
        const { name, grams } = req.body;
        const response = await axios.get('http://localhost:3000/gold-price');
        const currentGoldPrice = response.data.gold_price;

        const goldItem = new GoldItem({
            name,
            grams,
            currentPrice: currentGoldPrice * grams,
            priceHistory: [{ price: currentGoldPrice * grams }],
        });

        await goldItem.save();

        res.json(goldItem);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/update-price/:itemId', async (req, res) => {  // update the price of item and adds it to the history -- on
    try {
        const itemId = req.params.itemId;
        const goldItem = await GoldItem.findById(itemId);

        if(!goldItem) return res.status(404).json({ error: 'Item not found' });

        const response = await axios.get('http://localhost:3000/gold-price'); 
        const currentGoldPrice = response.data.gold_price; 

        goldItem.currentPrice = currentGoldPrice * goldItem.grams;

        goldItem.priceHistory.push({ price: goldItem.currentPrice });

        await goldItem.save();

        res.json(goldItem);

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/gold-prices', async (req, res) => {  //get current and the best price -- on
    try {
      const itemId = req.query.itemId;
      const timeRange = parseInt(req.query.timeRange) || 30;
  
      const query = itemId ? { _id: itemId } : {};
  
      const goldItems = await GoldItem.find(query);
  
      const response = goldItems.map((item) => {
        const pricesWithinTimeRange = filterPricesByTimeRange(item.priceHistory, timeRange);
  
        const bestPrice = calculateBestPrice(pricesWithinTimeRange);
  
        return {
          currentPrice: item.currentPrice,
          bestPriceWithinTimeRange: bestPrice || null,
        };
      });
  
      res.json(response);
      
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router