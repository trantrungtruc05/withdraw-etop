import { Request, Response } from 'express';
import axios from 'axios';
import { ConfigInfo } from './entity/ConfigInfo';

const { QueryTypes } = require('sequelize');
import connection from './db/connection';

var cron = require('node-cron');
var querystring = require('querystring');

export let withdraw = async (req, res) => {


    cron.schedule('*/2 * * * * *', async () => {
        console.log('Connect withdraw etop');
        var proxyLisy = ['45.131.212.199:6248', '45.131.212.96:6145', '45.131.212.239:6288', '45.131.212.154:6203', '45.131.212.54:6103', '45.131.212.147:6196', '45.131.212.134:6183', '45.131.212.230:6279', '45.131.212.8:6057', '45.131.212.223:6272'
            , '45.131.212.243:6292', '45.131.212.110:6159', '45.131.212.139:6188', '45.131.212.116:6165', '45.131.212.164:6213', '45.131.212.196:6245', '45.131.212.250:6299', '45.131.212.228:6277', '45.131.212.240:6289', '45.131.212.211:6260']

        var proxy = proxyLisy[Math.floor(Math.random() * proxyLisy.length)];

        const cookieEtopWithdrawItem: ConfigInfo[] = await ConfigInfo.findAll({ where: { key: "etop_withdraw", type: "cookie" } });

        const withdrawLink = 'https://www.etopfun.com/api/ingotitems/realitemback/exchange.do';

        const items = await connection.query("select eip.name, eip.id_item idItem, eip.quantity as quantity from queue_etop_item_with_draw qd inner join etopfun_item_page eip on qd.name = eip.name where qd.status = false order by qd.price_by_vnd desc", { type: QueryTypes.SELECT });
        for (let i = 0; i < items.length; i++) {
            axios.post(withdrawLink, querystring.stringify({
                id: `${(items[i] as any).iditem}`,
                num: `${(items[i] as any).quantity}`,
                vip: 'false',
                lang: 'en'
            }), {
                proxy: {
                    host: `${proxy.split(':')[0]}`,
                    port: parseInt(proxy.split(':')[1]),
                    auth: { username: 'dmogyuzp', password: 'lx8fr8go05bq' }
                },

                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Cookie': cookieEtopWithdrawItem[0].value
                }
            });

        }

    });

    return res.status(200).send('withdraw_success');
};