import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import db from '../models';
import { MessageTag } from '../enums/messageEnums'
import { Op } from 'sequelize';
import { calculateSkip } from '../shared/common-functions';

dotenv.config();

const SMS = db.SMS

export const getSmsTemplates = async ( req: any, res: Response ) => {
    const { accountid, userid } = req.user;
    let { page, per_page, search, order_dir, order_by } = req.query;
    per_page = parseInt( per_page ) || 10;
    page = parseInt( page ) || 1;

    try {
        const options: any = {
            where: {
                userid,
                accountid,
            },
            limit: per_page,
            offset: calculateSkip( page, per_page ),
        };

        // Add search condition if 'search' query parameter is provided
        if ( search ) {
            options.where[ Op.or ] = [
                {
                    title: {
                        [ Op.like ]: `%${ search }%`,
                    },
                },
            ];
        }

        // Add sorting conditions if 'order_dir' and 'order_by' query parameters are provided
        if ( order_dir && order_by ) {
            const orderColumn = order_by ? order_by : 'createdAt'; // Change the column name based on your requirements
            const sortOrder = order_dir ? order_dir : 'DESC';
            options.order = [ [ orderColumn, sortOrder ] ];
        }

        const { count, rows } = await SMS.findAndCountAll( options );

        const templates = rows.map( ( template: any ) => {
            const { userid, accountid, ...rest } = template.toJSON();
            return rest;
        } );

        const response = {
            status: true,
            statusCode: 200,
            data: templates || [],
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



export const createSmsTemplates = async ( req: any, res: Response ) => {
    const { accountid, userid } = req.user;

    const { title, template, status } = req.body;

    const payload = {
        userid: userid,
        accountid: accountid,
        title: title,
        template: template,
        status: status
    }
    try {
        if ( !userid || !accountid || !payload.title || !payload.template ) {
            return res.status( 403 ).json( {
                error: true,
                message: 'All Field Are required'
            } )
        }
        const isExists = await SMS.findOne( {
            where: {
                userid: userid,
                accountid: accountid,
                title: payload.title
            },
        } )

        if ( isExists ) {
            return res.status( 403 ).json( {
                error: true,
                message: 'Property Already Exists'
            } )
        }

        const isCreated = await SMS.create( payload );

        if ( isCreated ) {
            res.send( {
                status: true,
                message: 'SMS Template created Successfully',
                data: isCreated,
                statusCode: 200,
            } );
        }
    } catch ( error ) {
        res.send( {
            message: MessageTag.Error,
            error: error,
            statusCode: 500
        } );
    }
};

export const updateSmsTemplates = async ( req: any, res: Response ) => {
    const { accountid, userid } = req.user;
    const { id, title, template, status } = req.body;
    try {
        const isExists = await SMS.findOne( {
            where: {
                userid: userid,
                accountid: accountid,
                id: id
            },
        } )
        if ( !isExists ) {
            res.send( {
                statusCode: 404,
                message: MessageTag.NoUser
            } );
        } else {
            const isUpdated = await SMS.update(
                {
                    title,
                    status,
                    template,
                    updatedAt: new Date(),
                },
                {
                    where: {
                        userid: userid,
                        accountid: accountid,
                        id: id
                    },
                    returning: true,
                },
            )
            const updatedUser = await SMS.findOne( {
                where: {
                    userid: userid,
                    accountid: accountid,
                    id: id
                },
            } )
            if ( isUpdated ) {
                let data = {
                    id: updatedUser.id,
                    title: updatedUser.title,
                    template: updatedUser.template,
                    status: updatedUser.status,
                    createdAt: updatedUser.createdAt,
                    updatedAt: updatedUser.updatedAt,
                }
                res.send( {
                    statusCode: 200,
                    message: 'User Updated Successfully',
                    data: data
                } );
            }
        }
    } catch ( error ) {
        res.send( {
            message: MessageTag.Error,
            error: error
        } );
    }
};

export const updateStatus = async ( req: any, res: Response ) => {
    const { accountid, userid } = req.user;

    const updateProperty = req.body;
    if ( updateProperty ) {
        const id = updateProperty.id;
        const status = updateProperty?.status;
        try {
            const isExists = await SMS.findOne( {
                where: {
                    userid: userid,
                    accountid: accountid,
                    id: id
                },
            } )
            if ( !isExists ) {
                res.send( {
                    statusCode: 404,
                    message: MessageTag.NoUser
                } );
            } else {
                const isUpdated = await SMS.update(
                    {
                        status,
                        updatedAt: new Date(),
                    },
                    {
                        where: {
                            userid: userid,
                            accountid: accountid,
                            id: id
                        },
                        returning: true,
                    },
                )
                const updatedUser = await SMS.findOne( {
                    where: {
                        userid: userid,
                        accountid: accountid,
                        id: id
                    },
                } )

                if ( isUpdated ) {
                    let data = {
                        id: updatedUser.id,
                        title: updatedUser.title,
                        template: updatedUser.template,
                        status: updatedUser.status,
                        createdAt: updatedUser.createdAt,
                        updatedAt: updatedUser.updatedAt,
                    }
                    res.send( {
                        statusCode: 200,
                        message: 'Status Updated Successfully',
                        data: data
                    } );
                }
            }
        } catch ( error ) {
            res.send( {
                message: error,
                error: error
            } );
        }
    }

};


export const deleteSmsTemplates = async ( req: any, res: Response ): Promise<void> => {
    let Ids = req.query.Ids;
    const { accountid, userid } = req.user;
    Ids = Ids.split( ',' ).map( Number );
    try {
        const isDeleted = await SMS.destroy( {
            where: {
                id: {
                    [ Op.in ]: Ids,
                },
                userid: userid,
                accountid: accountid
            },
        } );

        if ( isDeleted ) {
            res.status( 200 ).json( {
                status: true,
                statusCode: 200,
                message: 'Sms Template deleted successfully',
                data: isDeleted,
            } );
        } else {
            res.status( 404 ).json( {
                status: false,
                statusCode: 404,
                message: 'Sms Template not found',
            } );
        }
    } catch ( error ) {
        res.status( 500 ).json( {
            status: false,
            statusCode: 500,
            message: 'An error occurred',
        } );
    }
};
