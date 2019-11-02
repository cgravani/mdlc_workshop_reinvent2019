# MDLC Workshop re:Invent 2019
A workshop to create an automated ML Model Development Life Cycle (MDLC) 

## Activity 1: Create a Lambda function to initialize the model training workflow

**Steps:**

1. In the AWS Console, click **Services** in the top, left-hand corner of the screen
2. Type **Lambda** into the search field and hit Enter
3. Select **Create Function**
4. Select **Author from Scratch**, enter **reinvent-mdlc-training-initialize-workflow** as the function name, and select **Node.js 8.10** as the runtime (see screenshot below)
5. At the bottom of the screen, click the arrow on the left-hand side of the text **Choose or create an execution role** 
6. Select **Use an existing role**
7. From the drop-down menu, select the role that contains **InitializeTraining** in the name 
![Create Function](/images/create_function_training_iam.png)

8. Select **Create function**
9. Scroll to the **Function code** section and ensure that the **Code entry type** is set to **Upload a file from Amazon S3** (see screenshot below)
10. In the **Amazon S3 link URL** input field, paste: s3://kk-public-ws-bucket/lambda-steps/reinvent-mdlc-training-initialize-workflow.zip
![Function Code](/images/function_code_training_s3.png)

11. Click **Save**  in the top, right-hand corner of the screen.

## Activity 2: Create Step Functions to Manage the Workflows

**Steps:**

1. In the AWS Console, click **Services** in the top, left-hand corner of the screen
2. Type **Step** into the search field and hit Enter
3. Click **Get started**
4. 
