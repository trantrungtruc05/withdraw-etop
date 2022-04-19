import { Request, Response } from 'express';
import axios from 'axios';
import * as withdrawService from './service/withdrawService';

export let withdraw = async (req, res) => {
    const { category } = req.params;
    let currDate = new Date();
    const hour = currDate.getHours();
    console.log(`>>>> ${hour}`);
    // withdrawService.withdraw(category);
    return res.status(200).send('withdraw_success');
};