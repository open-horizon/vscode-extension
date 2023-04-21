# Open Horizon VS Code Extension

This is an extension for VS Code to aid in the creation and deployment of Open Horizon edge services, and the management of edge nodes.

## **Currently available features**

### **Policy creation wizard**
Similar to service creation. Allows user to switch, import, export policies that keep track of config and environmental variables.
### 1. Switch Policy

This feature allows you to switch to a different policy file. To use this feature, follow these steps:

1. Open the command palette by pressing `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac).
2. Type `Switch Policy` and select the `Open Horizon: Switch Policy` command.
3. A file picker dialog will open. Navigate to the JSON file representing the new policy and click "Open".
4. If the selected file is a valid policy, the extension will update the Open Horizon configuration to use the selected policy file, and a confirmation message will be displayed.

### 2. Import Policy

This feature enables you to import a policy file to the current workspace. To use this feature, follow these steps:

1. Open the command palette by pressing `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac).
2. Type `Import Policy` and select the `Open Horizon: Import Policy` command.
3. A file picker dialog will open. Navigate to the JSON file representing the policy you want to import and click "Open".
4. If the selected file is a valid policy, the policy file will be copied to the `.policies` folder in the current workspace, and a confirmation message will be displayed.

### 3. Export Policy

This feature allows you to export the currently active policy file to a different location. To use this feature, follow these steps:

1. Open the command palette by pressing `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac).
2. Type `Export Policy` and select the `Open Horizon: Export Policy` command.
3. A save file dialog will open. Choose the destination path and click "Save".
4. The current policy file will be copied to the chosen location, and a confirmation message will be displayed.

## Validating Policy Files

The extension verifies if a policy file is valid before switching, importing, or exporting. The current implementation checks if the content is a valid JSON. You can add more validation logic based on your requirements.

### **Service creation wizard**
A wizard that guides users through the process of creating a new Open Horizon service, including defining the service's metadata, dependencies, and deployment parameters.

## **Features to be added**

### **Service deployment and management**
Tools and commands that allow users to deploy and manage their Open Horizon services directly from within VS Code, including starting and stopping services, monitoring service status, and managing service logs.

### **Project templates**
Pre-defined project templates that help users get started quickly with creating Open Horizon services, including templates for different types of services and programming languages.

### **Service validation and testing**
Tools and commands that help users validate and test their Open Horizon services before deployment, including syntax checking, linting, and automated testing.

### **Service updates and versioning**
Tools and commands that help users manage updates and versioning of their Open Horizon services, including creating new versions, rolling back to previous versions, and managing service dependencies.

### **Service discovery**
A tool that allows users to discover and explore existing Open Horizon services and their metadata, including service descriptions, deployment locations, and dependencies.

### **Authentication and security**
Tools and commands that help users manage authentication and security for their Open Horizon services and projects, including managing API keys, configuring access control policies, and managing SSL certificates.
For example if there is an image subfolder under your extension project workspace.

## Requirements

Open Horizon must be installed. A guide for [installing Open Horizon can be found here.](https://open-horizon.github.io/quick-start/) 

## License

This project is licensed under the [Apache 2.0 License](https://opensource.org/license/apache-2-0/). By using this extension, you agree to the terms and conditions of the license.