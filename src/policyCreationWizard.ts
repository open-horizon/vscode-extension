import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class PolicyCreationWizard {
  private step: number;
  private policyData: any;

  constructor() {
    this.step = 0;
    this.policyData = {};
  }

  async start() {
    await this.showStep1();
  }

  private async showStep1() {
    // Show user input box for step 1
    const serviceName = await vscode.window.showInputBox({
      prompt: 'Enter the service name for the policy',
      placeHolder: 'Service Name'
    });

    if (serviceName) {
      this.policyData.serviceName = serviceName;
      await this.showStep2();
    }
  }

  private async showStep2() {
    // Show user input box for step 2
    const serviceVersion = await vscode.window.showInputBox({
      prompt: 'Enter the service version for the policy',
      placeHolder: 'Service Version'
    });

    if (serviceVersion) {
      this.policyData.serviceVersion = serviceVersion;
      await this.showStep3();
    }
  }

  private async showStep3() {
    // Show user input box for step 3
    const serviceArch = await vscode.window.showInputBox({
      prompt: 'Enter the service architecture for the policy',
      placeHolder: 'Service Architecture'
    });

    if (serviceArch) {
      this.policyData.serviceArch = serviceArch;
      await this.showSummary();
    }
  }

  private async showSummary() {
    // Show the summary message and create the policy
    const summary = `Create Policy?\nService Name: ${this.policyData.serviceName}\nService Version: ${this.policyData.serviceVersion}\nService Architecture: ${this.policyData.serviceArch}`;
    const createPolicy = await vscode.window.showInformationMessage(summary, 'Create Policy');

    if (createPolicy) {
      this.createPolicy();
    }
  }

  private async createPolicy() {
    // Create the policy object
    const policy = {
      serviceName: this.policyData.serviceName,
      serviceVersion: this.policyData.serviceVersion,
      serviceArch: this.policyData.serviceArch,
    };
  
    // Show save dialog to select file location
    const options: vscode.SaveDialogOptions = {
      defaultUri: vscode.Uri.file('policy.json'),
      filters: {
        'JSON Files': ['json'],
      },
    };
  
    const fileUri = await vscode.window.showSaveDialog(options);
  
    if (fileUri) {
      // Write policy data to selected file
      const policyJson = JSON.stringify(policy, null, 2);
      fs.writeFile(fileUri.fsPath, policyJson, (error) => {
        if (error) {
          vscode.window.showErrorMessage('Error saving policy file: ' + error.message);
        } else {
          vscode.window.showInformationMessage('Policy saved successfully: ' + fileUri.fsPath);
        }
      });
    }
  }
}