System.config({
    transpiler: 'typescript',
    paths: {
      // paths serve as alias
      // 'npm:': 'node_modules/',
      'npm:': '../lib/',
      "rxjs/*":  "../lib/rxjs/bundles/Rx.js"
    },
    // map tells the System loader where to look for things
    map: {
      typescript: '../lib/typescript/lib/typescript.js',

      // our app is within the app folder
      components: 'components',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      //ADVANCED '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      //ADVANCED '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',
      
      // other libraries
      //OPTIONAL 'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      components: {
        defaultExtension: 'ts'
      },
    }
  
  });