import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from "@nestjs/common";

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const parsedDate = new Date(value);

    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException("Invalid date format");
    }
    return parsedDate;
  }
}
