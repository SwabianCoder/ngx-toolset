import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import { addSymbolToNgModuleMetadata } from '../../../../schematics/angular/utility/ast-utils';
import * as ts from 'typescript';

export function ngAdd(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    addModuleAndInjectionTokens(tree, context);
    installDependencies(context);

    return tree;
  };
}

function addModuleAndInjectionTokens(
  tree: Tree,
  context: SchematicContext
): void {
  context.logger.info('Adding ApiTokenInterceptorModule to the app...');
  const appModulePath = '/src/app/app.module.ts';

  if (!tree.exists(appModulePath)) {
    throw new SchematicsException(`The file ${appModulePath} doesn't exist...`);
  }

  const recorder = tree.beginUpdate(appModulePath);
  const appModuleFileContent = tree.read(appModulePath);

  if (appModuleFileContent === null) {
    throw new SchematicsException(
      `The content of ${appModulePath} couldn't be read...`
    );
  }

  const sourceFile = ts.createSourceFile(
    appModulePath,
    appModuleFileContent.toString(),
    ts.ScriptTarget.ES2020
  );
  const importPath = '@ngx-toolset/api-token-interceptor';

  for (const symbol of [
    {
      metadataField: 'imports',
      symbolName: 'ApiTokenInterceptorModule',
      importText: 'ApiTokenInterceptorModule.forRoot()',
    },
    {
      metadataField: 'providers',
      symbolName: 'API_URL_REGEX',
      importText:
        '{ provide: API_URL_REGEX, useValue: /^https://sample-regex.com/ }',
    },
    {
      metadataField: 'providers',
      symbolName: 'BEARER_TOKEN_CALLBACK_FN',
      importText:
        "{ provide: BEARER_TOKEN_CALLBACK_FN, useValue: (): string => 'sampleToken', }",
    },
  ]) {
    applyToUpdateRecorder(
      recorder,
      addSymbolToNgModuleMetadata(
        sourceFile,
        appModulePath,
        symbol.metadataField,
        symbol.symbolName,
        importPath,
        symbol.importText
      )
    );
  }

  tree.commitUpdate(recorder);
}

function installDependencies(context: SchematicContext): void {
  context.logger.info('Installing dependencies...');
  context.addTask(new NodePackageInstallTask());
}
