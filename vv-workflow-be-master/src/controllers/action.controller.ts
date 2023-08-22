import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import db from '../models';
import { MessageTag } from '../enums/messageEnums'
import { calculateSkip } from '../shared/common-functions';

dotenv.config();

const Action = db.ACTION

export const getActions = async ( req: any, res: Response ) => {
    const { accountid } = req.user;
    let { page, per_page } = req.query;
    per_page = parseInt( per_page ) || 10;
    page = parseInt( page ) || 1;

    try {
        const options: any = {
            where: {
                accountid,
            },
            limit: per_page,
            offset: calculateSkip( page, per_page ),
        };

        const { count, rows } = await Action.findAndCountAll( options );

        const actions = rows.map( ( template: any ) => {
            const { userid, accountid, ...rest } = template.toJSON();
            return rest;
        } );

        const response = {
            status: true,
            statusCode: 200,
            data: actions || [],
            meta: {
                current_page: page,
                from: ( page - 1 ) * per_page + 1,
                last_page: Math.ceil( count / per_page ),
                path: req.originalUrl,
                per_page: per_page.toString(),
                to: Math.min( page * per_page, count ),
                total: count,
            },
        };

        res.send( response );
    } catch ( error ) {
        console.log( 'error', error );
        res.send( {
            statusCode: 500,
            message: MessageTag.Error,
            error: error,
        } );
    }
};
