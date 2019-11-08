# MDLC Workshop re:Invent 2019
A workshop to create an automated ML Model Development Life Cycle (MDLC) 

## Activity 1: Create a Lambda function to initialize the model training workflow

**Steps:**

1. In the AWS Console, click **Services** in the top, left-hand corner of the screen
2. Type **Lambda** into the search field and hit Enter
3. Select **Create Function**
4. Select **Author from Scratch**, enter **reinvent-mdlc-training-initialize-workflow** as the function name, and select **Node.js 8.10** as the runtime (see screenshot below)

![Create Function](/images/create_function_training_iam.png)

5. Click on the arrow next to **Choose or create an execution role**
6. Select **Choose an existing role**
7. In the drop-down menu that appears, select the role that contains **InitializeTraining** in its name
8. Select **Create function**
9. Scroll to the **Function code** section and ensure that the **Code entry type** is set to **Edit code inline** (see screenshot below)

![Function Code](/images/function_code_training.png)

10. Copy all of the code from ![here](/code/reinvent-mdlc-training-initialize-workflow.js) and paste it into the code editor (completely replace all of the default code that was generated in the index.js section of the code editor)
11. Click **Save**  in the top, right-hand corner of the screen.


## Activity 2: Create Step Functions to manage the workflows

### Activity 2.1: Create the training workflow state machine

**Steps:**

1. In the AWS Console, click **Services** in the top, left-hand corner of the screen
2. Type **Step** into the search field and hit Enter
3. Click **Get started**
4. Click **Create state machine**
5. Select **Author with code snippets**
6. Enter **reinvent-mdlc-training-workflow** into the **Name** field
7. Paste the code from ![here](/code/reinvent-mdlc-training-workflow.txt) into the **State machine definition** section (see screenshot below)

![Create State Machine](/images/create_state_machine.png)

8. This is where the fun begins! This is a builder session, which means that you will not be simply following steps on a web page for the entire session, but instead you will work with the instructor to build the solution. Now it's time to start figuring out how to define the state machine in its entirety and actually get it working! 
The instructor will answer questions and guide you through how to get the state machine working...
9. When you've finished making all of the required updates, click **Next** in the bottom, right-hand corner of the screen (you may need to scroll down to see it.)
10. In the next screen that appears, select **Choose an existing IAM Role**, and select the role that contains **Training** in its name
11. Click **Create state machine**

### Activity 2.2: Create the batch inference workflow state machine

**Steps:**

1. In the AWS Console, click **Services** in the top, left-hand corner of the screen
2. Type **Step** into the search field and hit Enter
3. Click **Get started**
4. Click **Create state machine**
5. Select **Author with code snippets**
6. Enter **reinvent-mdlc-batch-inference-workflow** into the **Name** field
7. Paste the code from ![here](/code/reinvent-mdlc-batch-inference-workflow.txt) into the **State machine definition** section (see screenshot below)

![Create State Machine](/images/create_state_machine.png)

8. This is where the fun begins! This is a builder session, which means that you will not be simply following steps on a web page for the entire session, but instead you will work with the instructor to build the solution. Now it's time to start figuring out how to define the state machine in its entirety and actually get it working! 
The instructor will answer questions and guide you through how to get the state machine working...
9. When you've finished making all of the required updates, click **Next** in the bottom, right-hand corner of the screen (you may need to scroll down to see it.)
10. In the next screen that appears, select **Choose an existing IAM Role**, and select the role that contains **BatchInference** in its name
11. Click **Create state machine**

## Activity 3: Let's test our workflows!

**First, let's run a training job...**

**Steps:**

1. In the AWS Step Functions console, click **State machines** in the top, right-hand corner of the screen.
2. Click on the **reinvent-mdlc-training-workflow** state machine 
3. Click **Start execution**
4. Paste the following json text into the input field (see screenshot below), and click **Start execution**. Note the version of the dataset that we are using for training, as denoted by the "DataDate" parameter:
```
{
  "ModelName": "ReInventTestModel",
  "DataDate": "2019-10-01"
}
```

![New Execution](/images/new_execution.png)

5. Now we can watch the workflow progress through each of the states. Be sure to to inspect the inputs and outputs of each state.


**Now, let's run an inference job...**

**Steps:**

1. In the AWS Step Functions console, click **State machines** in the top, right-hand corner of the screen.
2. Click on the **reinvent-mdlc-batch-inference-workflow** state machine 
3. Click **Start execution**
4. Paste the following into the input field, and click **Start execution**.  Note that we are using a different version of the dataset for inference, as denoted by the "DataDate" parameter:
```
{
  "ModelName": "ReInventTestModel",
  "DataDate": "2019-11-01"
}
```
5. Now we can watch the workflow progress through each of the states. Be sure to to inspect the inputs and outputs of each state.

*As we could see, running an inference job with a newer version of the dataset caused a retraining job to be triggered. This is how you can automate model retraining based on your model's performance!*
