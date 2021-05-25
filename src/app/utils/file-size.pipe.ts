import { Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'FileSize'
})
export class FileSizePipe implements PipeTransform {

  gigaByteSize = 1024*1024*1024;
  megaByteSize = 1024*1024;
  kiloByteSize = 1024;

  transform(size: number, unit: string = 'B'): any {

    if(unit == 'auto') {
      if(size / this.gigaByteSize >= 1) {
        unit = 'GB';
      } else if(size / this.megaByteSize >= 1) {
        unit = 'MB';
      } else if(size / this.kiloByteSize >= 1) {
        unit = 'KB';
      }
    }

    switch (unit) {
      case 'KB': {
        return (size / this.kiloByteSize).toFixed(2) + ' KB';
      }
      case 'MB': {
        return (size / this.megaByteSize).toFixed(2) + ' MB';
      }
      case 'GB': {
        return (size / this.gigaByteSize).toFixed(2) + ' MB';
      }
      default:
      case 'B': {
        return size + ' B';
      }
    }
  }
}
