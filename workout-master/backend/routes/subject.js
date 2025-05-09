const express = require('express');
const router = express.Router();

const subject = '{"contactSubject": ["Software Developer","System Administrator","Data Analyst","Cybersecurity Specialist","Cloud Engineer","UX/UI Designer","Other"]}'

router.get('/', (req,res)=> {
  res.end(subject);
})

module.exports = router