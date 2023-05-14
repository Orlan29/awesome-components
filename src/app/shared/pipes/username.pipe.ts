import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "username"
})
export class UsernamePipe implements PipeTransform {
  transform(value: {lastName: string, firstName: string}): string {
    if (!value) {
      return "";
    }
    return `${value.lastName.toUpperCase()} ${value.firstName}`
  }
}
