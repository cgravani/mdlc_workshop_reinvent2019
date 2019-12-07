import boto3
import os

import numpy as np
import pandas as pd

from sklearn.metrics import roc_auc_score


s3_client = boto3.client('s3')

def lambda_handler(event, context):

    ## load the dataset date and s3 input path
    # dataset_date = event['DatasetDate']
    # run_date = event['RunDate']
    preduction_path = event['PredictionInput']
    target_path = event['TargetInput']

    ## read the target and inference result
    target = pd.read_csv(target_path, header=None, names=['target'])
    prediction = pd.read_csv(preduction_path, header=None, names=['prediction'])

    ## compute the monitoring result
    monitoring_result = roc_auc_score(target.values, prediction.values)

    # print('By {}, for the dataset date {}, the AUC is {}'.format(run_date, dataset_date, monitoring_result))

    return {'ModelPerformance': monitoring_result}
