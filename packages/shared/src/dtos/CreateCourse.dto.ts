//@ts-nocheck

export class CreateCourseDto {
    code: string;
    name: string;
    description: string;
    ownerId?: number;
}