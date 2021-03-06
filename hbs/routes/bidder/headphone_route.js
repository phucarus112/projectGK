const express = require('express');
const mysql = require('mysql');
const router = express.Router();
router.use(express.static('public'));
const db = require('../../utils/db');
const headphone_model = require('../../models/headphone_model');
const config = require('../../config/default.json');

router.get('/', async(req,res)=>{
  const limit = config.paginate.limit;
  const catId = req.params.id;

  const page = req.query.page || 1;
  if(page<1)page=1;
  const offset = (page-1)*config.paginate.limit;

  const [total,rows] = await Promise.all([
      headphone_model.countByCat(catId),
      headphone_model.pageByCat(catId,offset)
  ])


  let nPages = Math.floor(total/limit);
  if(total % limit > 0 )nPages++;
  const page_numbers = [];

  for(i = 1;i <= nPages ;i++)
  {
      page_numbers.push({
          value:i,
          isCurrentPage: i==+page,
      });
  }
        //const rows = await headphone_model.all();
        res.render('vwHeadphoneList_Bidder/HeadphoneList',{
        headphone: rows,
        empty: rows.length === 0,
        page_numbers,
        pre_value: +page -1,
        next_value: +page +1,
    });
});

router.get('/detail/:id',async(req,res)=>{

    const rows = await headphone_model.detail(req.params.id);
    res.render('vwHeadphoneList_Bidder/detail',{
        detail: rows[0],
        empty: rows.length === 0,
    });
    
});

router.post('/detail/:id',async(req,res)=>{

   
    
});

module.exports = router;