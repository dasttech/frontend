import { ErrorHandler, NgModule } from "@angular/core";


export class HandleError implements ErrorHandler {
    handleError(error:any) {
      // do something with the exception
    }
  }
  
  @NgModule({
    providers: []
  })
  class MyModule {}