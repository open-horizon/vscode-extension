// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { createService } from './serviceCreationWizard';
import { PolicyCreationWizard } from './policyCreationWizard';
import { isValidPolicy } from './policyValidator';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "openhorizon" is now active!');

	context.subscriptions.push(
        vscode.commands.registerCommand('openHorizon.createService', async () => {
            await createService();
        })
    );
  context.subscriptions.push(
      vscode.commands.registerCommand('openHorizon.createPolicy', async () => {
        const wizard = new PolicyCreationWizard();
        await wizard.start();
      })
  );
  const switchPolicy = vscode.commands.registerCommand('openHorizon.switchPolicy', () => {
      vscode.window.showOpenDialog({ filters: { 'Policy Files': ['json'] } }).then(fileUri => {
        if (fileUri) {
          const policyPath = fileUri[0].fsPath;
          const policyContent = fs.readFileSync(policyPath, 'utf8');
          if (isValidPolicy(policyContent)) {
            // Switch policy
            vscode.workspace.getConfiguration('openHorizon').update('currentPolicy', policyPath, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage(`Switched to policy: ${policyPath}`);
          } else {
            vscode.window.showErrorMessage('Invalid policy file. Please choose a valid policy file.');
          }
        }
      });
    });
  
    const importPolicy = vscode.commands.registerCommand('openHorizon.importPolicy', () => {
      vscode.window.showOpenDialog({ filters: { 'Policy Files': ['json'] } }).then(fileUri => {
        if (fileUri) {
          const policyPath = fileUri[0].fsPath;
          const policyContent = fs.readFileSync(policyPath, 'utf8');
          if (isValidPolicy(policyContent)) {
              // Import policy
              if (vscode.workspace.workspaceFolders) {
                  const policiesFolderPath = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, '.policies');
                  if (!fs.existsSync(policiesFolderPath)) {
                      fs.mkdirSync(policiesFolderPath);
                  }
                  fs.copyFileSync(policyPath, path.join(policiesFolderPath, path.basename(policyPath)));
                  vscode.window.showInformationMessage(`Imported policy: ${policyPath}`);
              } else {
                  vscode.window.showErrorMessage('No workspace is open. Please open a workspace before importing a policy.');
              }
          } else {
              vscode.window.showErrorMessage('Invalid policy file. Please choose a valid policy file.');
          }
        }
      });
    });
  
    const exportPolicy = vscode.commands.registerCommand('openHorizon.exportPolicy', () => {
      const currentPolicyPath = vscode.workspace.getConfiguration('openHorizon').get<string>('currentPolicy');
      if (currentPolicyPath) {
        vscode.window.showSaveDialog({ filters: { 'Policy Files': ['json'] } }).then(fileUri => {
          if (fileUri) {
              fs.copyFileSync(currentPolicyPath, fileUri.fsPath);
              vscode.window.showInformationMessage(`Exported policy to: ${fileUri.fsPath}`);
            }
          });
        } else {
          vscode.window.showErrorMessage('No current policy is set. Please switch to a policy before exporting.');
        }
      });
      let disposable = vscode.commands.registerCommand('extension.runPlaceholder', () => {
        const placeholderLogic = new PlaceholderLogic();
        placeholderLogic.execute();
      });

      context.subscriptions.push(disposable);
      context.subscriptions.push(switchPolicy);
      context.subscriptions.push(importPolicy);
      context.subscriptions.push(exportPolicy);
}

class PlaceholderLogic {
  private data: Array<string> = [];

  constructor() {
      this.fillData();
  }

  fillData(): void {
      for (let i = 0; i < 10; i++) {
          this.data.push(`Item ${i}`);
      }
  }

  execute(): void {
      const result = this.processData();
      vscode.window.showInformationMessage(`Processed Data: ${result.join(', ')}`);
  }

  processData(): Array<string> {
      const processedData: Array<string> = [];

      this.data.forEach((item) => {
          const newItem = item.split('').reverse().join('');
          processedData.push(newItem);
      });

      return processedData;
  }
}

// This method is called when your extension is deactivated
export function deactivate() {}