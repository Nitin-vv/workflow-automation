import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import db from '../models';
import { MessageTag } from '../enums/messageEnums'
import { Op } from 'sequelize';
import { calculateSkip } from '../shared/common-functions';

dotenv.config();

const EMAIL = db.EMAIL

export const getEmailTemplates = async ( req: any, res: Response ) => {
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

        const { count, rows } = await EMAIL.findAndCountAll( options );

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




export const createEmailTemplates = async ( req: any, res: Response ) => {
    const { accountid, userid } = req.user;

    const { title, subject, body, status } = req.body;

    const payload = {
        userid: userid,
        accountid: accountid,
        title: title,
        subject: subject,
        body: body,
        status: status
    }
    try {
        if ( !userid || !accountid || !payload.title || !payload.subject || !payload.body ) {
            return res.status( 403 ).json( {
                error: true,
                message: 'All Field Are required'
            } )
        }
        const isExists = await EMAIL.findOne( {
            where: {
                userid: userid,
                accountid: accountid,
                title: payload.title
            },
        } )

        if ( isExists ) {
            return res.status( 403 ).json( {
                error: true,
                message: 'Template Already Exists'
            } )
        }

        const isCreated = await EMAIL.create( payload );

        if ( isCreated ) {
            let paylaod = {
                id: isCreated.id,
                title: isCreated.title,
                subject: isCreated.subject,
                body: isCreated.body,
                status: isCreated.status,
                updatedAt: isCreated.updatedAt,
                createdAt: isCreated.createdAt,
            }
            res.send( {
                status: true,
                message: 'Email Template created Successfully',
                data: paylaod,
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

export const updateEmailTemplates = async ( req: any, res: Response ) => {
    const { accountid, userid } = req.user;
    const { id, title, subject, body, status } = req.body;
    try {
        const isExists = await EMAIL.findOne( {
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
            const isUpdated = await EMAIL.update(
                {
                    title,
                    status,
                    subject,
                    body,
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
            const updatedUser = await EMAIL.findOne( {
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
                    subject: updatedUser.subject,
                    body: updatedUser.body,
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
            const isExists = await EMAIL.findOne( {
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
                const isUpdated = await EMAIL.update(
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
                const updatedUser = await EMAIL.findOne( {
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
                        subject: updatedUser.subject,
                        body: updatedUser.body,
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


export const deleteEmailTemplates = async ( req: any, res: Response ): Promise<void> => {
    let Ids = req.query.Ids;
    const { accountid, userid } = req.user;
    Ids = Ids.split( ',' ).map( Number );
    try {
        const isDeleted = await EMAIL.destroy( {
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
                message: 'Email Template deleted successfully',
                data: isDeleted,
            } );
        } else {
            res.status( 404 ).json( {
                status: false,
                statusCode: 404,
                message: 'Email Template not found',
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
