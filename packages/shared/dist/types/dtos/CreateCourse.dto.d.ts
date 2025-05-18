export declare class CreateCourseDto {
    name: string;
    description: string;
    owner?: number;
    participants?: {
        id: number;
    }[];
}
