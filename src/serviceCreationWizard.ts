import * as vscode from 'vscode';

export async function createService() {
    const serviceName = await promptForServiceName();
    if (!serviceName) {
        return;
    }

    const serviceVersion = await promptForServiceVersion();
    if (!serviceVersion) {
        return;
    }

    const dependencies = await promptForDependencies();
    const deploymentParams = await promptForDeploymentParameters();

    const serviceJson = createServiceJson(serviceName, serviceVersion, dependencies, deploymentParams);
    writeServiceJsonFile(serviceName, serviceJson);
}

async function promptForServiceName(): Promise<string | undefined> {
    return await vscode.window.showInputBox({
        prompt: 'Enter the service name',
        validateInput: (input: string) => {
            return input.trim() === '' ? 'Service name cannot be empty' : null;
        }
    });
}

async function promptForServiceVersion(): Promise<string | undefined> {
    return await vscode.window.showInputBox({
        prompt: 'Enter the service version',
        validateInput: (input: string) => {
            return input.trim() === '' ? 'Service version cannot be empty' : null;
        }
    });
}

async function promptForDependencies(): Promise<string[] | undefined> {
    const dependencies: string[] = [];

    while (true) {
        const currentDependency = await vscode.window.showInputBox({
            prompt: 'Enter a dependency (or leave empty to finish)',
        });

        if (!currentDependency) {
            break;
        }

        dependencies.push(currentDependency);
    }

    return dependencies;
}

async function promptForDeploymentParameters(): Promise<Record<string, string> | undefined> {
    const deploymentParams: Record<string, string> = {};
    while (true) {
        const paramName = await vscode.window.showInputBox({
            prompt: 'Enter deployment parameter name (or leave empty to finish)',
        });

        if (!paramName) {
            break;
        }

        const paramValue = await vscode.window.showInputBox({
            prompt: `Enter value for deployment parameter "${paramName}"`,
        });

        if (!paramValue) {
            break;
        }

        deploymentParams[paramName] = paramValue;
    }

    return deploymentParams;
}

function createServiceJson(
    serviceName: string,
    serviceVersion: string,
    dependencies: string[] | undefined,
    deploymentParams: Record<string, string> | undefined
): string {
    const service = {
        serviceName: serviceName,
        serviceVersion: serviceVersion,
        dependencies: dependencies ?? [],
        deploymentParameters: deploymentParams ?? {}
    };

    return JSON.stringify(service, null, 4);
}

async function writeServiceJsonFile(serviceName: string, serviceJson: string) {
    try {
        const wsFolders = vscode.workspace.workspaceFolders;

        if (!wsFolders || wsFolders.length === 0) {
            throw new Error('No workspace folder available');
        }

        const filePath = vscode.Uri.joinPath(wsFolders[0].uri, `${serviceName}_service.json`);
        await vscode.workspace.fs.writeFile(filePath, Buffer.from(serviceJson, 'utf-8'));

        vscode.window.showInformationMessage(`Open Horizon service configuration file has been created: ${filePath}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to create Open Horizon service configuration file: ${error}`);
    }
}