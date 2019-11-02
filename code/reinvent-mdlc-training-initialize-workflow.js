const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async(event, context, callback) => {
  console.log('Received event', JSON.stringify(event, null, 2));

  const initializeWorkflow = async(event) => {
    // get event parameters
    const modelName = event.WorkflowInput.ModelName;
    const trainingImage = event.WorkflowInput.TrainingImage;
    const s3RootBucket = event.S3RootBucket;
    const dataDate = DateUtil.getDateFromUtcString(event.WorkflowInput.DataDate);

    // generate training job name
    const runDate = new Date();
    const trainingJobName = `${modelName}-${DateUtil.formatDateTimeStringShort(runDate)}`;

    // generate training input folder
    const trainingInput = {
      S3Key: `input-data/${event.WorkflowInput.DataDate}/train`,
      S3Uri: `s3://${s3RootBucket}/input-data/${event.WorkflowInput.DataDate}/train`
    };

    // generate training validation folder
    const validationInput = {
      S3Key: `input-data/${event.WorkflowInput.DataDate}/validation`,
      S3Uri: `s3://${s3RootBucket}/input-data/${event.WorkflowInput.DataDate}/validation`
    };

    // generate training output folder
    const trainingOutput = {
      S3Key: `model/${event.WorkflowInput.DataDate}/${DateUtil.formatDateTimeStringShort(runDate)}`,
      S3Uri: `s3://${s3RootBucket}/model/${event.WorkflowInput.DataDate}/${DateUtil.formatDateTimeStringShort(runDate)}`
    }

    // generate training config
    const trainingConfig = {
      TrainingJobName: trainingJobName,
      TrainingInput: trainingInput,
      ValidationInput: validationInput,
      TrainingOutput: trainingOutput
    };

    // upload input request to S3
    const s3UploadParams = {
      Bucket: s3RootBucket,
      Key: 'workflow_request.json',
      Body: JSON.stringify(event, null, 2),
      ContentType: 'application/json'
    };
    await s3.putObject(s3UploadParams);

    // build return object
    const ret = {
      WorkflowRequest: event.WorkflowInput,
      S3RootBucket: s3RootBucket,
      DataDate: dataDate,
      RunDate: runDate,
      TrainingConfig: trainingConfig
    };

    return ret;
  };

  return initializeWorkflow(event).then((result) => {
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
