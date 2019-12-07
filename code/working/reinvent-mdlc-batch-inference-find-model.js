const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = async(event, context, callback) => {
    console.log('Received event', JSON.stringify(event, null, 2));

    const findModel = async(event) => {
        // get event parameters
        const modelName = event.ModelName;

        // build item
        var params = {
            TableName: "MODEL_REGISTRY",
            KeyConditionExpression: 'MODEL_NAME = :ModelName',
            ProjectionExpression: 'SAGEMAKER_MODEL_NAME',
            ExpressionAttributeValues: {
                ':ModelName': modelName
            },
            ConsistentRead: true,
            ScanIndexForward: false,
            Limit: 1
        };

        // put item
        let data;
        try {
            data = await dynamodb.query(params).promise();
        } catch (error) {
            return {
                statusCode: 400,
                error: `Could not post: ${error.stack}`
            };
        }

        if (data.Items.length == 0) {
            throw "Unable to find model";
        }

        // build return object
        const ret = {
            SageMakerModelName: data.Items[0]['SAGEMAKER_MODEL_NAME']
        };

        return ret;
    };

    return findModel(event).then((result) => {
        callback(null, result);
    });
};

class DateUtil {
    static getDateFromUtcString(dateString) {
        return new Date(dateString);
    }

    static formatDateString(date) {
        return date.toISOString().split('T')[0];
    }

    static formatDateTimeString(date) {
        return date.toISOString();
    }

    static formatDateStringShort(date) {
        const year = date.getUTCFullYear().toString();
        const month = date.getUTCMonth() + 1;
        const dayOfMonth = date.getUTCDate();
        const monthFull = month < 10 ? '0' + month : month;
        const dayOfMonthFull = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
        return year + monthFull + dayOfMonthFull;
    }

    static formatDateTimeStringShort(date) {
        const year = date.getUTCFullYear().toString();
        const month = date.getUTCMonth() + 1;
        const dayOfMonth = date.getUTCDate();
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        const monthFull = month < 10 ? '0' + month : month;
        const dayOfMonthFull = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
        const hoursFull = hours < 10 ? '0' + hours : hours;
        const minutesFull = minutes < 10 ? '0' + minutes : minutes;
        const secondsFull = seconds < 10 ? '0' + seconds : seconds;

        return year + monthFull + dayOfMonthFull + 'T' + hoursFull + minutesFull + secondsFull;
    }
};
