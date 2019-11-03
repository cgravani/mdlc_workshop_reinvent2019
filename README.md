# MDLC Workshop re:Invent 2019
A workshop to create an automated ML Model Development Life Cycle (MDLC) 

## Activity 1: Create a Lambda function to initialize the model training workflow

**Steps:**

1. In the AWS Console, click **Services** in the top, left-hand corner of the screen
2. Type **Lambda** into the search field and hit Enter
3. Select **Create Function**
4. Select **Author from Scratch**, enter **reinvent-mdlc-training-initialize-workflow** as the function name, and select **Node.js 8.10** as the runtime (see screenshot below)

![Create Function](/images/create_function_training_iam.png)

5. Select **Create function**
6. Scroll to the **Function code** section and ensure that the **Code entry type** is set to **Edit code inline** (see screenshot below)

![Function Code](/images/function_code_training.png)

8. Copy all of the code from the following link and paste it into the code editor (completely replace all of the default code that was generated in the index.js section of the code editor): ![Function Code](/code/reinvent-mdlc-training-initialize-workflow.js)
9. Click **Save**  in the top, right-hand corner of the screen.

## Activity 2: Create Step Functions to Manage the Workflows

**Steps:**

1. In the AWS Console, click **Services** in the top, left-hand corner of the screen
2. Type **Step** into the search field and hit Enter
3. Click **Get started**
4. Click **Create state machine**
