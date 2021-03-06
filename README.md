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
6. Select **Use an existing role**
7. In the drop-down menu that appears, select the role that contains **InitializeTraining** in its name
8. Select **Create function**
9. Scroll to the **Function code** section and ensure that the **Code entry type** is set to **Edit code inline** (see screenshot below)

![Function Code](/images/function_code_training.png)

10. Copy all of the code from ![here](/code/reinvent-mdlc-training-initialize-workflow.js) and paste it into the code editor (completely replace all of the default code that was generated in the index.js section of the code editor)
11. Click **Save**  in the top, right-hand corner of the screen.
12. You will see the ARN (Amazon Resource Name) for your Lambda function above the **Save** button. This is the unique identifier for your Lambda function. Click the ![Copy symbol](/images/copy_symbol.PNG) symbol next to the ARN, and it will copy it to your clipboard. Copy this into a text editor because you will need it later.


## Activity 2: Create Step Functions to manage the workflows

### Activity 2.1: Create the training workflow state machine

**Steps:**

*First, we are going to define the training workflow state machine. Paste the code from ![here](/code/reinvent-mdlc-training-workflow.txt) into a text editor.
This is where the fun begins! This is a builder session, which means that you will not be simply following steps on a web page for the entire session, but instead you will work with the instructor to build the solution. Now it's time to start figuring out how to define the state machine in its entirety and actually get it working! 
The instructor will answer questions and guide you through how to get the state machine defined...
Note: We use a number of Lambda functions throughout the workflow, so you will need to figure out what they're doing and which ones fit into which steps in the process.
In the previous activity, you saw where you can find the ARN for a Lambda function. ARNs are what we use to tell the Step Functions state machine which resources (for example, Lambda functions) we want to use.*

1. When you believe that the state machine is correctly defined, in the AWS Console, click **Services** in the top, left-hand corner of the screen
2. Type **Step** into the search field and hit Enter
3. Click **Get started**
4. In some cases, you will then be presented with the following screen. If so, click on the link that is circled in green in the screenshot here.

![Create State Machine](/images/hello_world.PNG)

*If you were not presented with the screen above, click **Create state machine***

5. Select **Author with code snippets** (see screenshot below)
6. Enter **reinvent-mdlc-training-workflow** into the **Name** field
7. Paste the state machine definition code from your text editor the **State machine definition** section 

![Create State Machine](/images/create_state_machine_training.png)

8. Click **Next** in the bottom, right-hand corner of the screen (you may need to scroll down to see it.)
9. In the next screen that appears, select **Choose an existing IAM Role**, and select the role that contains **Training** in its name
10. Click **Create state machine**

### Activity 2.2: Create the batch inference workflow state machine

**Steps:**

*Next, we are going to define the batch inference workflow state machine. Paste the code from ![here](/code/reinvent-mdlc-batch-inference-workflow.txt) into a text editor.
This is where the fun begins! This is a builder session, which means that you will not be simply following steps on a web page for the entire session, but instead you will work with the instructor to build the solution. Now it's time to start figuring out how to define the state machine in its entirety and actually get it working! 
The instructor will answer questions and guide you through how to get the state machine defined...
Note: We use a number of Lambda functions throughout the workflow, so you will need to figure out what they're doing and which ones fit into which steps in the process.
In the previous activity, you saw where you can find the ARN for a Lambda function. ARNs are what we use to tell the Step Functions state machine which resources (for example, Lambda functions) we want to use.*

1. When you believe that the state machine is correctly defined, in the AWS Step Functions Console, click **Create state machine**
2. Select **Author with code snippets**
3. Enter **reinvent-mdlc-batch-inference-workflow** into the **Name** field
4. Paste the state machine definition code from your text editor the **State machine definition** section (see screenshot below)

![Create State Machine](/images/create_state_machine_batch.png)

5. Click **Next** in the bottom, right-hand corner of the screen (you may need to scroll down to see it.)
6. In the next screen that appears, select **Choose an existing IAM Role**, and select the role that contains **BatchInference** in its name
7. Click **Create state machine**

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

## Full Working Source Code
After you completes the workshop, you can view the full original CloudFormation template, and Lambda Function source code [here](/code/working/).
