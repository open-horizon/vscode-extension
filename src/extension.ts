// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { createService } from './serviceCreationWizard';

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
            await createService();
        })
    );
    const switchPolicy = vscode.commands.registerCommand('extension.switchPolicy', () => {
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
    
      const importPolicy = vscode.commands.registerCommand('extension.importPolicy', () => {
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
    
      const exportPolicy = vscode.commands.registerCommand('extension.exportPolicy', () => {
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
      
        context.subscriptions.push(switchPolicy);
        context.subscriptions.push(importPolicy);
        context.subscriptions.push(exportPolicy);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function isValidPolicy(policyContent: string): boolean {
    try {
      const policyJson = JSON.parse(policyContent);
      // Add any custom validation logic for the policy here
      return true;
    } catch (e) {
      return false;
    }
}