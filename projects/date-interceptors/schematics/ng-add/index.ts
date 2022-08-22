import {
  Rule,
  SchematicContext,
  SchematicsException,
  Tree,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import * as ts from 'typescript';
import { addSymbolToNgModuleMetadata } from '../utility/ast-utils';

export function ngAdd(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Installing dependencies...');
    context.addTask(new NodePackageInstallTask());

    context.logger.info('Adding DateInterceptorsModule to the app...');
    const appModulePath = './src/app/app.module.ts';

    if (!tree.exists(appModulePath)) {
      throw new SchematicsException(
        `The file ${appModulePath} doesn't exist...`
      );
    }

    const recorder = tree.beginUpdate(appModulePath);
    const appModuleFileContent = tree.read(appModulePath);

    if (appModuleFileContent === null) {
      throw new SchematicsException(
        `The content of ${appModulePath} couldn't be read...`
      );
    }

    const appModuleFileText = appModuleFileContent.toString('utf-8');
    const sourceFile = ts.createSourceFile(
      appModulePath,
      appModuleFileText,
      ts.ScriptTarget.Latest,
      true
    );
    const importPath = '@ngx-toolset/date-interceptors';

    for (const symbol of [
      {
        metadataField: 'imports',
        symbolName: 'DateInterceptorsModule',
        importText: 'DateInterceptorsModule.forRoot()',
      },
      {
        metadataField: 'providers',
        symbolName: 'API_URL_REGEX',
        importText: '{ provide: API_URL_REGEX, useValue: /^/ },',
      },
      {
        metadataField: 'providers',
        symbolName: 'API_DATE_FORMAT',
        importText: "{ provide: API_DATE_FORMAT, useValue: '' },",
      },
      {
        metadataField: 'providers',
        symbolName: 'DATE_STRING_REGEX',
        importText: "{ provide: DATE_STRING_REGEX, useValue: '' },",
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

    return tree;
  };
}
