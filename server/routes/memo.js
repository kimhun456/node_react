import express from 'express';
import Memo from '../models/memo';
import mongoose from 'mongoose';

const router = express.Router();

/* 
    WRITE MEMO: POST /api/memo
    BODY SAMPLE: { contents: "sample "}
    ERROR CODES
        1: NOT LOGGED IN
        2: EMPTY CONTENTS
*/
router.post('/', (req, res) => {

    if (typeof req.session.logininfo === 'undefined') {
        return res
            .status(403)
            .json({error: 'NOT LOGGED IN', code: 1});
    }

    if (typeof req.body.contents !== 'string') {
        return res
            .status(400)
            .json({error: 'EMPTY CONTENTS', code: 2});
    }

    if (req.body.contents === '') {
        return res
            .status(400)
            .json({error: 'EMPTY CONTENTS', code: 2});
    }

    let memo = new Memo({writer: req.session.logininfo.username, contents: req.body.contents});

    memo.save((err) => {
        if (err) 
            throw err;
        return res.json({success: true});
    });

});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.get('/', (req, res) => {
    Memo
        .find()
        .sort({'_id': -1})
        .limit(6)
        .exec((err, memos) => {
            if (err) 
                throw err;
            res.json(memos);
        });

});

export default router;