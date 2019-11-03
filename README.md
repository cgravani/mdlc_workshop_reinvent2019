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

8. Copy all of the code from ![here](/code/reinvent-mdlc-training-initialize-workflow.js) and paste it into the code editor (completely replace all of the default code that was generated in the index.js section of the code editor)
9. Click **Save**  in the top, right-hand corner of the screen.

## Activity 2: Create Step Functions to Manage the Workflows

**Steps:**

1. In the AWS Console, click **Services** in the top, left-hand corner of the screen
2. Type **Step** into the search field and hit Enter
3. Click **Get started**
4. Click **Create state machine**
5. Select **Author with code snippets**
6. Enter **ReInventMDLCBatchInferenceWorkflow** into the **Name** field
7. Paste the code from HERE into the **State machine definition** section (see screenshot below)

![Create State Machine](/images/create_state_machine.png)

8. This is where the fun begins! This is a builder session, which means that you will not be simply following steps on a web page for the entire session, but instead you will work with the instructor to build the solution. Now it's time to start figuring out how to define the state machine in its entirety and actually get it working! 
You can use the **ReInventMDLCTrainingWorkflow** state machine that we've already generated for you via CloudFormation as a reference, and the instructor will also guide you through how to get the state machine working...
