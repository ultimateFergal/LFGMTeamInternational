export interface IEmployee {
    $key?: string
    name: string;
    dateOfBirth?: Date;
    country: string;
    userName: string;
    hireDate?: Date;
    status?: boolean;
    area: string; //'services' | 'kitchen' | null;
    jobTitle: string;
    tipRate: number;
}
