import * as vscode from 'vscode';

export function isValidPolicy(policyContent: string): boolean {
  try {
    const policy = JSON.parse(policyContent);

    // Check for service reference
    if (!policy.service || !policy.service.name || !policy.service.version || !policy.service.arch) {
      vscode.window.showErrorMessage('Policy is invalid: Missing service reference');
      return false;
    }

    // Check for service properties (assumes properties are in a 'properties' object)
    if (!policy.properties) {
      vscode.window.showErrorMessage('Policy is invalid: Missing service properties');
      return false;
    }

    // Check for policy constraints (assumes constraints are in an array named 'constraints')
    if (!Array.isArray(policy.constraints)) {
      vscode.window.showErrorMessage('Policy is invalid: Missing or invalid policy constraints');
      return false;
    }

    // Check for user input (assumes user input is in an object named 'userInput')
    if (!policy.userInput || typeof policy.userInput !== 'object') {
      vscode.window.showErrorMessage('Policy is invalid: Missing or invalid user input');
      return false;
    }

    // Check for priority (assumes priority is in a field named 'priority')
    if (typeof policy.priority !== 'number' || policy.priority < 0) {
      vscode.window.showErrorMessage('Policy is invalid: Missing or invalid priority value');
      return false;
    }

    // Check for metadata (assumes metadata is in an object named 'metadata')
    if (!policy.metadata || typeof policy.metadata !== 'object') {
      vscode.window.showErrorMessage('Policy is invalid: Missing or invalid metadata');
      return false;
    }

    // If all checks passed, the policy is valid
    return true;
  } catch (error) {
    vscode.window.showErrorMessage('Policy is invalid: Unable to parse JSON');
    return false;
  }
}