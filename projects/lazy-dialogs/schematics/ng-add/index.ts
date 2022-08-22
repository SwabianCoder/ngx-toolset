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

    context.logger.info('Adding LazyDialogModule to the app...');
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

    applyToUpdateRecorder(
      recorder,
      addSymbolToNgModuleMetadata(
        sourceFile,
        appModulePath,
        'imports',
        'LazyDialogModule',
        '@ngx-toolset/lazy-dialogs',
        'LazyDialogModule.forRoot({})'
      )
    );

    tree.commitUpdate(recorder);

    return tree;
  };
}
